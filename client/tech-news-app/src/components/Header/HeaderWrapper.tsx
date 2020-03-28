import React from 'react';
import {connect} from "react-redux";
import {chooseSectionAction, getPosts, setPostPageAction} from "../../redux/PostsReducer";
import Header from "./Header";
import {setCurrentUserDataAction, setIsAuthAction} from "../../redux/UserReducer";
import {RootState} from "../../redux/ReduxStore";
import {SetIsAuthAction, User} from "../../models/UserModel";
import {Dispatch} from "redux";
import {ChangeSectionAction, SetPostPageAction} from "../../models/PostModel";

interface Props {
    sectionId: number,
    isAuth: boolean,
    currentUserData: User,
    changeSection: (sectionId: number) => ChangeSectionAction,
    setPostPage: (pageNumber: number) => SetPostPageAction,
    setIsAuth: (isAuth: boolean) => SetIsAuthAction,
    setCurrentUserData: (userData: User) => any,
    getPosts: (sectionId: number) => any
}

/**
 *
 * @param props
 * Оболочка шапки сайта
 */
const HeaderWrapper: React.FC<Props> = (props) => {

    const setPosts = (sectionId: number) => props.getPosts(sectionId)

    return <Header setPosts={setPosts}
                   {...props}/>
}

let mapStateToProps = (state: RootState) => {
    return {
        sectionId: state.postsData.sectionId,
        isAuth: state.userData.isAuth,
        currentUserData: state.userData.currentUserData
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        changeSection: (sectionId: number) => dispatch(chooseSectionAction(sectionId)),
        setPostPage: (pageNumber: number) => dispatch(setPostPageAction(pageNumber)),
        setCurrentUserData: (userData: User) => dispatch(setCurrentUserDataAction(userData)),
        setIsAuth: (isAuth: boolean) => dispatch(setIsAuthAction(isAuth)),
        getPosts: (sectionId: number) => dispatch(getPosts(sectionId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper)