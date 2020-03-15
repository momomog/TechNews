import React from 'react';
import {connect} from "react-redux";
import {chooseSectionAction, getAllPosts, setPostPageAction} from "../../redux/PostsReducer";
import Header from "./Header";
import {setCurrentUserDataAction, setIsAuthAction} from "../../redux/UserReducer";

class HeaderWrapper extends React.Component {

    setPosts = sectionId => {
        this.props.getAllPosts(sectionId)
    }

    render() {
        return (
            <Header setPosts={this.setPosts}
                    {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        sectionId: state.postsData.sectionId,
        isAuth: state.userData.isAuth,
        currentUserData: state.userData.currentUserData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        changeSection: sectionId => dispatch(chooseSectionAction(sectionId)),
        setPostPage: pageNumber => dispatch(setPostPageAction(pageNumber)),
        setCurrentUserData: userData => dispatch(setCurrentUserDataAction(userData)),
        setIsAuth: isAuth => dispatch(setIsAuthAction(isAuth)),
        getAllPosts: sectionId => dispatch(getAllPosts(sectionId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper)