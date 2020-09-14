import React from 'react'

interface Props {
    name: string
    value: any
    isNeedBorder: boolean
}

/**
 * Профиль. Компонент отображения данных
 */
const UserInfoLine: React.FC<Props> = ({name, value, isNeedBorder}) => {
    return (
        <>
            <div className="col-sm-3"/>
            <div className="col-sm-3 col-xs-6 title">{name}:</div>
            <div className="col-sm-3">
                {
                    value
                        ? value
                        : <i>Не указано</i>
                }
            </div>
            <div className="col-sm-3"/>
            <div className="clearfix"/>

            {
                isNeedBorder && <div className="bot-border"/>
            }

        </>
    )
}

export default UserInfoLine