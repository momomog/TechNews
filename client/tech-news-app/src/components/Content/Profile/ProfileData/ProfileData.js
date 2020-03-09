import Common from "../../../../common/Common";
import React from "react";
import UserInfoLine from "./UserInfoLine";

export function ProfileData(props) {
    const user = props.user;

    return (
        <div>
            <div className="col-sm-1"/>
            <div className="clearfix mb-2"/>

            <div className="col-sm-4"/>
            <div className="col-sm-5 col-xs-6 section-title mt-2 ml-5">Основная информация</div>
            <div className="col-sm-3"/>
            <div className="clearfix section mb-1"/>

            <UserInfoLine name={'Дата регистрации'}
                          value={Common.dateParser(user.createAt)}/>

            <UserInfoLine name={'Email'}
                          value={user.email}/>

            <UserInfoLine name={'Дата рождения'}
                          value={user.profileData.birthDate && Common.dateParser(user.profileData.birthDate) + ', ' + Common.getUserAge(user.profileData.birthDate)}/>

            <UserInfoLine name={'Страна'}
                          value={user.profileData.country && user.profileData.country}/>

            <UserInfoLine name={'Город'}
                          value={user.profileData.city && user.profileData.city}/>

            <div className="col-sm-4"/>
            <div className="col-sm-5 col-xs-6 section-title mt-2 ml-5">Статистика пользователя</div>
            <div className="col-sm-3"/>
            <div className="clearfix section mb-1"/>

            <UserInfoLine name={'Репутация'}
                          value={12}/>

            <UserInfoLine name={'Количество комментариев'}
                          value={user.commentsCount.toString()}/>
        </div>
    )
}