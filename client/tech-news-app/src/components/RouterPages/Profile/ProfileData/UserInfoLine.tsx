import React from "react";

interface Props {
    name: string
    value: any
}

/**
 *
 * @param name
 * @param value
 * Профиль. Компонент отображения данных
 */
const UserInfoLine: React.FC<Props> = ({name, value}) => {
    return (
        <div>
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
            <div className="bot-border"/>
        </div>
    )
}

export default UserInfoLine