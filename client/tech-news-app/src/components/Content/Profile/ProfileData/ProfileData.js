import Common from "../../../../common/Common";
import React from "react";

export function ProfileData(props) {
    const user = props.user;

    return (
        <div>
            <div className="col-sm-1"/>
            <div className="clearfix mb-2"/>


            <div className="col-sm-4"/>
            <div className="col-sm-5 col-xs-6 tital section-title mt-2 ml-5">Основная информация</div>
            <div className="col-sm-3"/>
            <div className="clearfix section mb-1"/>


            <div className="col-sm-3"/>
            <div className="col-sm-3 col-xs-6 tital">Дата регистрации:</div>
            <div className="col-sm-3">
                {
                    Common.dateParser(user.createAt)
                }
            </div>
            <div className="col-sm-3"/>
            <div className="clearfix"/>
            <div className="bot-border"/>


            <div className="col-sm-3"/>
            <div className="col-sm-3 col-xs-6 tital">Email:</div>
            <div className="col-sm-3">
                {
                    user.email
                }
            </div>
            <div className="col-sm-3"/>
            <div className="clearfix"/>
            <div className="bot-border"/>


            <div className="col-sm-3"/>
            <div className="col-sm-3 col-xs-6 tital ">Дата рождения:</div>
            <div className="col-sm-3">
                {
                    user.profileData.birthDate
                        ? Common.dateParser(user.profileData.birthDate) + ', ' + Common.getUserAge(user.profileData.birthDate)
                        : <i>Не указано</i>
                }
            </div>
            <div className="col-sm-3"/>
            <div className="clearfix"/>
            <div className="bot-border"/>

            <div className="col-sm-3"/>
            <div className="col-sm-3 col-xs-6 tital ">Страна, город:</div>
            <div className="col-sm-3">
                {
                    user.profileData.country
                        ? user.profileData.country + ', '
                        : <i>Не указано, </i>
                }

                {
                    user.profileData.city
                        ? user.profileData.city
                        : <i>не указано</i>
                }
            </div>
            <div className="col-sm-3"/>
            <div className="clearfix mb-4"/>

                <div className="col-sm-4"/>
                <div className="col-sm-5 col-xs-6 tital section-title mt-2 ml-5">Статистика пользователя</div>
                <div className="col-sm-3"/>
                <div className="clearfix section mb-1"/>


                <div className="col-sm-3"/>
                <div className="col-sm-3 col-xs-6 tital">Репутация:</div>
                <div className="col-sm-3">
                        {
                                12
                        }
                </div>
                <div className="col-sm-3"/>
                <div className="clearfix"/>
                <div className="bot-border"/>

                <div className="col-sm-3"/>
                <div className="col-sm-3 col-xs-6 tital">Количество комментариев:</div>
                <div className="col-sm-3">
                        {
                                user.commentsCount
                        }
                </div>
                <div className="col-sm-3"/>
                <div className="clearfix"/>
                <div className="bot-border"/>
        </div>
    )
}