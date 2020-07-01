import React, {useState} from 'react'
import {send} from './MessageWebService'
import {User} from '../../../models/UserModel'
import {Picker} from 'emoji-mart'
import sendIcon from '../../../static/send-icon.png'
import smileIcon from '../../../static/smile-icon.png'

interface Props {
    user: User
    dialogUser: User
    scrollToBottomMessage: () => void
}

export const MessageInput: React.FC<Props> = ({user, dialogUser, scrollToBottomMessage}) => {
    const [messageText, setMessageText] = useState<string>('')
    const [showPicker, setShowPicker] = useState<boolean>(false)

    const sendMessage = () => {
        if (messageText.trim()) {
            send(user, dialogUser, messageText)
            scrollToBottomMessage()
            setMessageText('')
            setShowPicker(false)
        }
    }

    return (
        <div className="row">
            <div className="col-md-11 pl-0 pr-0">
                <textarea className="form-control message-text-area"
                          rows={1}
                          onChange={e => setMessageText(e.target.value)}
                          placeholder="Введите текст сообщения..."
                          value={messageText}
                          onKeyPress={event => {
                              if (event.key === 'Enter') {
                                  event.preventDefault()
                                  sendMessage()
                              }
                          }}/>
            </div>
            <div className="col-md-1 pl-3">
                <img src={sendIcon}
                     className="send-msg-icon" alt="send-Icon"
                     onClick={sendMessage}/>
                <img src={smileIcon}
                     className="smile-icon" alt="send-Icon"
                     onClick={() => setShowPicker(!showPicker)}/>
                {
                    showPicker && <Picker set='apple'
                                          i18n={getPickerLocalize()}
                                          perLine={7}
                                          showPreview={false}
                                          onSelect={e => setMessageText(`${messageText} ${e.native} `)}
                                          style={{position: 'absolute', bottom: '35px', right: '53px'}}/>
                }

            </div>
        </div>
    )
}

function getPickerLocalize() {
    return {
        search: 'Поиск',
        categories: {
            recent: 'Недавние',
            search: 'Результаты поиска',
            people: 'Люди',
            nature: 'Животные и природа',
            foods: 'Еда',
            activity: 'Спорт',
            places: 'Путешествия',
            objects: 'Предметы',
            symbols: 'Символы',
            flags: 'Флаги',
            custom: 'Custom'
        }
    }
}