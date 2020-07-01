import {User} from '../../../models/UserModel'
import {Message} from '../../../models/messageModel'
import {WS_BASE_URL} from '../../../api/BaseRequest'

let webService: WebSocket

export const getWebService = () => {
    return webService
}

export const connect = (username: string, addDialogMessage: (message: Message) => void) => {
    webService = new WebSocket(`${WS_BASE_URL}/chat/${username}`)
    webService.onmessage = event => {
        const msg = JSON.parse(event.data)
        msg.id = Math.random()
        addDialogMessage(msg)
    }
}

export const send = (currentUser: User, dialogUser: User, messageText: string) => {
    const json = JSON.stringify({
        oneUserId: currentUser.id,
        oneUserFirstName: currentUser.firstName,
        oneUserUsername: currentUser.username,
        oneUserPhotoId: currentUser.profileData.photoId,
        twoUserId: dialogUser.id,
        twoUserFirstName: dialogUser.firstName,
        twoUserUsername: dialogUser.username,
        twoUserPhotoId: dialogUser.profileData.photoId,
        text: messageText
    })
    webService.send(json)
}