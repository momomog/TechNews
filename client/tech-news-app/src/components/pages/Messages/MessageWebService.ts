import {User} from '../../../models/UserModel'
import {Message} from '../../../models/messageModel'
import {WS_BASE_URL} from '../../../api/BaseRequest'

let webService: WebSocket

export const getWebService = () => {
    return webService
}

export const connect = (username: string,
                        addDialogMessage: (message: Message) => void,
                        setWritingUsers: (payload: Message) => void) => {
    webService = new WebSocket(`${WS_BASE_URL}/chat/${username}`)
    webService.onmessage = event => {
        const msg: Message = JSON.parse(event.data)
        if (msg.isWriting !== undefined) {
            setWritingUsers(msg)
        } else if (msg.text) {
            msg.id = Math.random()
            msg.new = true
            addDialogMessage(msg)
        }
    }
}

export const send = (currentUser: User, dialogUser: User, messageText: string, isWriting?: boolean) => {
    let json
    if (isWriting) {
        json = JSON.stringify({
            oneUserId: currentUser.id,
            oneUserUsername: currentUser.username,
            twoUserId: dialogUser.id,
            twoUserUsername: dialogUser.username,
            isWriting: isWriting
        })
    } else {
        json = JSON.stringify({
            oneUserId: currentUser.id,
            oneUserFirstName: currentUser.firstName,
            oneUserUsername: currentUser.username,
            oneUserPhotoId: currentUser.profileData.photoId,
            twoUserId: dialogUser.id,
            twoUserFirstName: dialogUser.firstName,
            twoUserUsername: dialogUser.username,
            twoUserPhotoId: dialogUser.profileData.photoId,
            text: messageText,
            isWriting
        })
    }
    webService.send(json)
}