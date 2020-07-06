import {User} from '../../../models/UserModel'
import {Message} from '../../../models/MessageModel'
import {WS_BASE_URL} from '../../../api/BaseRequest'
// @ts-ignore
import incomingMessageSound from '../../../static/incoming_message.mp3'

let webService: WebSocket

export const getWebService = () => {
    return webService
}

export const connectToMsgWS = (username: string,
                               addDialogMessage: (message: Message) => void,
                               setWritingUsers: (payload: Message) => void) => {
    webService = new WebSocket(`${WS_BASE_URL}/chat/${username}`)
    webService.onmessage = event => onWSMessage(event, addDialogMessage, setWritingUsers)
}

export const sendPayloadToMsgWS = (currentUser: User, dialogUser: User, messageText: string, isWriting?: boolean) => {
    let json
    if (isWriting !== undefined) {
        json = JSON.stringify({
            mainUserId: currentUser.id,
            mainUserUsername: currentUser.username,
            dialogUserId: dialogUser.id,
            dialogUserUsername: dialogUser.username,
            isWriting: isWriting
        })
    } else {
        json = JSON.stringify({
            mainUserId: currentUser.id,
            mainUserFirstName: currentUser.firstName,
            mainUserUsername: currentUser.username,
            mainUserPhotoId: currentUser.profileData.photoId,
            dialogUserId: dialogUser.id,
            dialogUserFirstName: dialogUser.firstName,
            dialogUserUsername: dialogUser.username,
            dialogUserPhotoId: dialogUser.profileData.photoId,
            text: messageText
        })
    }
    webService.send(json)
}

const onWSMessage = (event, addDialogMessage, setWritingUsers) => {
    const msg: Message = JSON.parse(event.data)
    if (msg.isWriting !== undefined) {
        setWritingUsers(msg)
    } else if (msg.text) {
        msg.id = Math.random()
        msg.new = true
        addDialogMessage(msg)

        if (window.location.pathname !== '/messages')
            new Audio(incomingMessageSound).play()
    }
}