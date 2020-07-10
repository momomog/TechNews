import {Message} from '../models/MessageModel'
import {request} from './BaseRequest'
import {User} from '../models/UserModel'

class MessageAPI {
    /**
     * Диалоги сообщения
     * @param dialogUserId
     */
    getDialogMessages = (dialogUserId: number): Promise<Array<Message>> => request({
        url: `messages/dialog?userId=${dialogUserId}`
    })

    /**
     * Пометка сообщений диалога как прочитанные
     * @param dialogUserId
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
     * @param dialogUserId
     */
    createDialog = (dialogUserId: number): Promise<boolean> => request({
        url: `dialogs/create?userId=${dialogUserId}`
    })
}

export default new MessageAPI()