import React from 'react'
import {connect} from 'react-redux'
import Header from './Header'
import {SetIsAuthAction, User} from '../../models/UserModel'
import {Dispatch} from 'redux'
import {ChangeSectionAction, SetPostPageAction} from '../../models/PostModel'
import {changeSection, getPosts, setPostPageAction} from '../../redux/actions/postActions'
import {setIsAuthAction, setUserDataAction} from '../../redux/actions/userActions'

interface Props {
    changeSection: (sectionId: number) => ChangeSectionAction,
    setPostPage: (pageNumber: number) => SetPostPageAction,
    setIsAuth: (isAuth: boolean) => SetIsAuthAction,
    setCurrentUserData: (userData: User) => void,
    getPosts: (sectionId: number) => void
}

/**
 * Шапка сайта.Оболочка
 * @param props
 */
const HeaderWrapper: React.FC<Props> = (props) => {

    const setPosts = (sectionId: number) => props.getPosts(sectionId)

    return <Header setPosts={setPosts}
                   {...props}/>
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        changeSection: (sectionId: number) => dispatch(changeSection(sectionId)),
        setPostPage: (pageNumber: number) => dispatch(setPostPageAction(pageNumber)),
        setCurrentUserData: (userData: User) => dispatch(setUserDataAction(userData)),
        setIsAuth: (isAuth: boolean) => dispatch(setIsAuthAction(isAuth)),
        getPosts: (sectionId: number) => dispatch(getPosts(sectionId))
    }
}

export default connect(null, mapDispatchToProps)(HeaderWrapper)