import React, {useState} from 'react'
import {send} from './MessageWebService'
import {User} from '../../../models/UserModel'
import {Picker} from 'emoji-mart'
import sendIcon from '../../../static/send-icon.png'
import smileIcon from '../../../static/smile-icon.png'

interface Props {
    user: User
    dialogUser: User
    writingUsers: Array<number>
    scrollToBottomMessage: () => void
}

let timeout

export const MessageInput: React.FC<Props> = ({user, writingUsers, dialogUser, scrollToBottomMessage}) => {
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

    const writeMessage = e => {
        setMessageText(e.target.value)
        if (!timeout) {
            send(user, dialogUser, '', true)
            timeout = setTimeout(() => {
                send(user, dialogUser, '', false)
                timeout = null
            }, 3000)
        }
    }

    return (
        <div>
            {
                writingUsers.includes(dialogUser.id) &&
                <div className="writing-message">{`${dialogUser.firstName} печатает сообщение...`}</div>
            }

            <div className="row">
                <div className="col-md-11 pl-0 pr-0">
                <textarea className="form-control message-text-area"
                          rows={1}
                          onChange={e => writeMessage(e)}
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