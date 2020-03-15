import React from "react";

export function UserInfoLine(props) {
    return (
        <div>
            <div className="col-sm-3"/>
            <div className="col-sm-3 col-xs-6 title">{props.name}:</div>
            <div className="col-sm-3">
                {
                    props.value
                        ? props.value
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