import Common from "../../../../common/Common";
import React from "react";
import UserInfoLine from "./UserInfoLine";
import {User} from "../../../../models/UserModel";

interface Props {
    user: User
}

/**
 *
 * @param user
 * Профиль. Компонент отображения данных
 */
const ProfileData: React.FC<Props> = ({user}) => {

    return (
        <div>
            <div className="col-sm-1"/>
            <div className="clearfix mb-2"/>

            <div className="col-sm-4"/>
            <div className="col-sm-5 col-xs-12 section-title mt-2 ml-5">Основная информация</div>
            <div className="col-sm-3"/>
            <div className="clearfix section mb-1"/>

            <UserInfoLine name={'Дата регистрации'}
                          value={Common.dateParser(user.createAt)}/>

            <UserInfoLine name={'Email'}
                          value={user.email}/>

            <UserInfoLine name={'Дата рождения'}
                          value={user.profileData.birthDate && `${Common.dateParser(user.profileData.birthDate)}, ${Common.getUserAge(user.profileData.birthDate)}`}/>

            <UserInfoLine name={'Страна'}
                          value={user.profileData.country && user.profileData.country}/>

            <UserInfoLine name={'Город'}
                          value={user.profileData.city && user.profileData.city}/>

            <div className="col-sm-4"/>
            <div className="col-sm-5 col-xs-12 section-title mt-2 ml-5">Статистика пользователя</div>
            <div className="col-sm-3"/>
            <div className="clearfix section mb-1"/>

            <UserInfoLine name={'Репутация'}
                          value={'**не реализовано**'}/>

            <UserInfoLine name={'Количество комментариев'}
                          value={user.commentsCount.toString()}/>
        </div>
    )
}

export default ProfileData