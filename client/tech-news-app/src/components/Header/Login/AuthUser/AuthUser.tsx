import React from 'react'
import {NavLink} from 'react-router-dom'
import AuthService from '../../../../common/AuthService'
import {User, UserInitial} from '../../../../models/UserModel'
import {Dispatch} from 'redux'
import {useDispatch} from 'react-redux'
import {setIsAuth, setUserData} from '../../../../redux/actions/userActions'

interface Props {
    isAuth: boolean
    user: User
}

/**
 * Авторизованный пользователь
 */
const AuthUser: React.FC<Props> = ({user, isAuth}: Props) => {
    const dispatch: Dispatch = useDispatch()

    const onLogout = () => {
        AuthService.removeToken()
        dispatch(setIsAuth(false))
        dispatch(setUserData(UserInitial))
    }

    return (
        <div className="dropdown">
            {
                isAuth
                && <>
                    <button className="btn btn-primary-outline dropdown-toggle user-action-button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                        {user.firstName}&nbsp;
                        <img alt="user_pic" src={user.profileData.photoId
                        && `https://drive.google.com/uc?export=view&id=${user.profileData.photoId}`}/>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <NavLink className="dropdown-item" to="/profile" exact>Профиль</NavLink>
                        <NavLink className="dropdown-item" to="/profile/me/edit" exact>Редактировать</NavLink>
                        <NavLink className="dropdown-item" to="/messages" exact>Сообщения</NavLink>
                        <div className="dropdown-divider"/>

                        {
                            AuthService.isAdmin()
                            && <>
                                <NavLink className="dropdown-item" to="/admin-panel" exact>
                                    Панель администрирования
                                </NavLink>
                                <div className="dropdown-divider"/>
                            </>
                        }

                        <span onClick={onLogout}>
                            <NavLink className="dropdown-item" to="/" exact>
                                Выйти
                            </NavLink>
                        </span>
                    </div>
                </>
            }
        </div>
    )
}

export default AuthUser
