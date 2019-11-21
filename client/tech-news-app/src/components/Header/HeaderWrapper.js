import React from 'react';
import {connect} from "react-redux";
import {getAllPosts, setPostPageAction} from "../../redux/PostsReducer";
import Header from "./Header";
import {
    chooseSectionAction,
    getUserData,
    setIsAuthAction,
    setUserDataAction
} from "../../redux/AuthReducer";
import Common from "../../common/Common";

class HeaderWrapper extends React.Component {

    setPosts = (sectionId) => {
        this.props.getAllPosts(sectionId, 1);
    };

    componentDidMount() {
        let user = Common.decodeJWTToken();

        if (user && user.sub && !this.props.userData) {
            this.props.getUserData(user.sub);
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
        userData: state.authData.userData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        changeSection: sectionId => dispatch(chooseSectionAction(sectionId)),
        setPostPage: pageNumber => dispatch(setPostPageAction(pageNumber)),
        getAllPosts: (sectionId, postPage) => dispatch(getAllPosts(sectionId, postPage)),
        setIsAuth: isAuth => dispatch(setIsAuthAction(isAuth)),
        setUserData: userData => dispatch(setUserDataAction(userData)),
        getUserData: userId => dispatch(getUserData(userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper);