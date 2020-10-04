import {User} from '../../../models/UserModel'
import {DialogUser, Message} from '../../../models/MessageModel'
import {WS_BASE_URL} from '../../../api/BaseRequest'

import store from '../../../redux/reduxStore'

let webService: WebSocket

export function getWebService() {
    return webService
}

// Подключение к WS
export function connectToMsgWS (user: User,
                               addDialogMessage: (message: Message) => void,
                               setWritingUsers: (payload: Message) => void,
                               getDialogUsers: () => void,
                               setDialogUsersData: (payload: Message, userId: number) => void) {
    webService = new WebSocket(`${WS_BASE_URL}/chat/${user.username}`)
    webService.onmessage = event => onWSMessage(event, user, addDialogMessage, setWritingUsers, getDialogUsers, setDialogUsersData)
}

// Отправка данных в WS
export function sendPayloadToMsgWS (msgData, messageText: string, isWriting?: boolean, isRead?: boolean) {
    const currentUser: User = store.getState().userData.userData
    const dialogUser: User = store.getState().messagesData.dialogUser
    let json

    // Отправка статуса о наборе текста
    if (isWriting !== undefined) {
        json = JSON.stringify({
            mainUserId: currentUser.id,
            mainUserUsername: currentUser.username,
            dialogUserId: dialogUser.id,
            dialogUserUsername: dialogUser.username,
            isWriting: isWriting
        })
    } else {
        // Отправка сообщения
        // При наличии msgData отправление с сохранением в БД, иначе послание сообщения с целью понять открыт ли диалог с пользователем
        json = JSON.stringify({
            mainUserId: msgData ? msgData.mainUserId : currentUser.id,
            mainUserFirstName: msgData ? msgData.mainUserFirstName : currentUser.firstName,
            mainUserUsername: msgData ? msgData.mainUserUsername : currentUser.username,
            mainUserPhotoId: msgData ? msgData.mainUserPhotoId : currentUser.profileData.photoId,
            dialogUserId: msgData ? msgData.dialogUserId : dialogUser.id,
            dialogUserFirstName: msgData ? msgData.dialogUserFirstName : dialogUser.firstName,
            dialogUserUsername: msgData ? msgData.dialogUserUsername : dialogUser.username,
            dialogUserPhotoId: msgData ? msgData.dialogUserPhotoId : dialogUser.profileData.photoId,
            text: messageText,
            isRead: isRead
        })
    }
    webService.send(json)
}

// Обработчик события отправки данных
function onWSMessage(event,
                     user: User,
                     addDialogMessage: (message: Message) => void,
                     setWritingUsers: (payload: Message) => void,
                     getDialogUsers: () => void,
                     setDialogUsersData: (payload: Message, userId: number) => void) {
    const msg: Message = JSON.parse(event.data)

    // сет пользователей, печатающих сообщение текущему пользователю
    if (msg.isWriting !== undefined) {
        setWritingUsers(msg)
    } else if (msg.text) {
        const dialogUser: User = store.getState().messagesData.dialogUser
        const usersList: Array<DialogUser> = store.getState().messagesData.usersList

        checkMsgUserInUsersList(usersList, msg, dialogUser, getDialogUsers, setDialogUsersData)

        if (user.id === msg.dialogUserId)
            saveMsgToDB(msg, dialogUser)

        if (dialogUser.id === msg.mainUserId || dialogUser.id === msg.dialogUserId) {
            msg.id = Math.random()
            msg.new = true
            msg.isRead = true
            addDialogMessage(msg)
        }
        playMsgSound()
    }
}


// --- Вспомогательные функции --- //


// Если сообщение от человека, которого нет в списке диалогов, то обновление списка диалогов
// Иначе пуш нового сообщения в диалог с пользователем
function checkMsgUserInUsersList(usersList: Array<DialogUser>,
                                 message: Message,
                                 dialogUser: User,
                                 getDialogUsers: () => void,
                                 setDialogUsersData: (payload: Message, userId: number) => void) {
    let isInclude = false
    usersList.forEach(item => {
        if (item.user.id === message.mainUserId) {
            isInclude = true
            if (item.user.id !== dialogUser.id)
                setDialogUsersData(message, item.user.id)
            return
        }
    })

    if (!isInclude)
        getDialogUsers()
}

// сохранение сообщения в БД
function saveMsgToDB(msg: Message, dialogUser: User) {
    const msgData = {
        mainUserId: msg.mainUserId,
        mainUserUsername: msg.mainUserUsername,
        mainUserFirstName: msg.mainUserFirstName,
        mainUserPhotoId: msg.mainUserPhotoId,
        dialogUserId: msg.dialogUserId,
        dialogUserFirstName: msg.dialogUserFirstName,
        dialogUserUsername: msg.dialogUserUsername,
        dialogUserPhotoId: msg.dialogUserPhotoId
    }
    const isRead = msg.mainUserId === dialogUser.id
    sendPayloadToMsgWS(msgData, msg.text, undefined, isRead)
}

// Воспроизведение звука сообщения
function playMsgSound() {
    if (window.location.pathname !== '/messages')
        new Audio('../../../static/incoming_message.mp3').play()
}
