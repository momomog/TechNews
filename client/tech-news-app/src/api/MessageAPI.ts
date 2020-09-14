import {Message} from '../models/MessageModel'
import {request} from './BaseRequest'
import {User} from '../models/UserModel'

class MessageAPI {
    /**
     * Диалоги сообщения
     */
    getDialogMessages = (dialogUserId: number): Promise<Array<Message>> => request({
        url: `messages/dialog?userId=${dialogUserId}`
    })

    /**
     * Пометка сообщений диалога как прочитанные
     */
    markMessagesToRead = (dialogUserId: number): Promise<Array<Message>> => request({
        url: `messages/dialog/read/?userId=${dialogUserId}`
    })

    /**
     * Список диалогов
     */
    getDialogUsers = (): Promise<Array<User>> => request({
        url: `dialogs`
    })

    /**
     * Создание нового диалога
     */
    createDialog = (dialogUserId: number): Promise<boolean> => request({
        url: `dialogs/create?userId=${dialogUserId}`
    })
}

export default new MessageAPI()