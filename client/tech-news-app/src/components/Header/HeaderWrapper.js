import React from 'react';
import {connect} from "react-redux";
import {getAllPosts, setPostPageAction} from "../../redux/PostsReducer";
import Header from "./Header";
import {chooseSectionAction, setIsAuthAction} from "../../redux/AuthReducer";
import Common from "../../common/Common";
import {getCurrentUserData, setCurrentUserDataAction} from "../../redux/ProfileReducer";

class HeaderWrapper extends React.Component {

    setPosts = (sectionId) => {
        this.props.getAllPosts(sectionId, 1);
    };

    componentDidMount() {
        let user = Common.decodeJWTToken();

        if (user && user.sub && !this.props.currentUserData) {
            this.props.getCurrentUserData(user.sub);
            this.props.setIsAuth(true);
        }
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
        sectionId: state.authData.sectionId,
        isAuth: state.authData.isAuth,
        currentUserData: state.profileData.currentUserData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        changeSection: sectionId => dispatch(chooseSectionAction(sectionId)),
        setPostPage: pageNumber => dispatch(setPostPageAction(pageNumber)),
        getAllPosts: (sectionId, postPage) => dispatch(getAllPosts(sectionId, postPage)),
        setIsAuth: isAuth => dispatch(setIsAuthAction(isAuth)),
        setCurrentUserData: userData => dispatch(setCurrentUserDataAction(userData)),
        getCurrentUserData: userId => dispatch(getCurrentUserData(userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper);