import React, {useEffect, useRef, useState} from 'react'
import {sendPayloadToMsgWS} from '../MessageWebService'
import {User} from '../../../../models/UserModel'
import {Picker} from 'emoji-mart'
import sendIcon from '../../../../static/send-icon.png'
import smileIcon from '../../../../static/smile-icon.png'

interface Props {
    dialogUser: User
    writingUsers: Array<number>
    scrollToBottomMessage: () => void
}

/*
 * Тестовое поле ввода сообщения
 */
export const MessageInput: React.FC<Props> = ({writingUsers, dialogUser, scrollToBottomMessage}: Props) => {
    const [messageText, setMessageText] = useState<string>('')
    const [showPicker, setShowPicker] = useState<boolean>(false)
    // Таймер отправки статуса набора сообщения (раз в 2 секунды)
    const timeout = useRef<number>(0)

    useEffect(() => {
        return () => clearTimeout(timeout.current)
    }, [dialogUser])

    const sendMessage = () => {
        if (messageText.trim()) {
            sendPayloadToMsgWS(null, messageText)
            scrollToBottomMessage()
            sendPayloadToMsgWS(null, '', false)
            setMessageText('')
            setShowPicker(false)
        }
    }

    const inputKeyListener = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            sendMessage()
        } else if (e.key === 'Tab') {
            e.preventDefault()
            setShowPicker(!showPicker)
        }
    }

    const writeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageText(e.target.value)
        if (!timeout.current) {
            sendPayloadToMsgWS(null, '', true)
            timeout.current = window.setTimeout(() => {
                sendPayloadToMsgWS(null, '', false)
                timeout.current = 0
            }, 2000)
        }
    }

    return (
        <>
            {
                writingUsers.includes(dialogUser.id) &&
                <div className="writing-message">{`${dialogUser.firstName} печатает сообщение...`}</div>
            }

            <div className="row">
                <div className="col-md-11 pl-0 pr-0">
                <textarea className="form-control message-text-area"
                          rows={1}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => writeMessage(e)}
                          placeholder="Введите текст сообщения..."
                          value={messageText}
                          onKeyDown={(e: React.KeyboardEvent) => inputKeyListener(e)}/>
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
        </>
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
