import Common from '../../../../common/Common'
import React from 'react'
import UserInfoLine from './UserInfoLine'
import {User} from '../../../../models/UserModel'

interface Props {
    user: User
}

/**
 * Профиль. Компонент отображения данных
 */
const ProfileData: React.FC<Props> = ({user}) => {

    return (
        <>
            <div className="col-sm-1"/>
            <div className="clearfix mb-2"/>

            <div className="col-sm-4"/>
            <div className="col-sm-5 col-xs-12 section-title mt-2 ml-5">Основная информация</div>
            <div className="col-sm-3"/>
            <div className="clearfix section mb-1"/>

            <UserInfoLine name={'Дата регистрации'}
                          isNeedBorder
                          value={user.createAt}/>

            <UserInfoLine name={'Email'}
                          isNeedBorder
                          value={user.email}/>

            <UserInfoLine name={'Дата рождения'}
                          isNeedBorder
                          value={`${user.profileData.birthDate}, ${Common.getUserAge(user.profileData.birthDate)}`}/>

            <UserInfoLine name={'Страна'}
                          isNeedBorder
                          value={user.profileData.country && user.profileData.country}/>

            <UserInfoLine name={'Город'}
                          isNeedBorder={false}
                          value={user.profileData.city && user.profileData.city}/>

            <div className="col-sm-4 mt-1"/>
            <div className="col-sm-5 col-xs-12 section-title mt-2 ml-5">Статистика пользователя</div>
            <div className="col-sm-3"/>
            <div className="clearfix section mb-1"/>

            <UserInfoLine name={'Репутация'}
                          isNeedBorder
                          value={'**не реализовано**'}/>

            <UserInfoLine name={'Количество комментариев'}
                          isNeedBorder={false}
                          value={user.commentsCount.toString()}/>
        </>
    )
}

export default ProfileData