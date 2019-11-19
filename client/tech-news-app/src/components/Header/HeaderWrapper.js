import React from 'react';
import {connect} from "react-redux";
import {getAllPosts, setPostPageAction} from "../../redux/PostsReducer";
import Header from "./Header";
import {chooseSectionAction, setIsAuthAction, setUserDataAction} from "../../redux/HeaderReducer";

class HeaderWrapper extends React.Component {

    setPosts = (sectionId) => {
        this.props.getAllPosts(sectionId, 1);
    };

    render() {
        return (<Header setPosts={this.setPosts}
                        sectionId={this.props.sectionId}
                        changeSection={this.props.changeSection}
                        setPostPage={this.props.setPostPage}
                        isAuth={this.props.isAuth}
                        userData={this.props.userData}
                        setIsAuth={this.props.setIsAuth}
                        setUserData={this.props.setUserData}/>)
    }
}

let mapStateToProps = (state) => {
    return {
        sectionId: state.headerData.sectionId,
        isAuth: state.headerData.isAuth,
        userData: state.headerData.userData
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        changeSection: sectionId => dispatch(chooseSectionAction(sectionId)),
        setPostPage: pageNumber => dispatch(setPostPageAction(pageNumber)),
        getAllPosts: (sectionId, postPage) => dispatch(getAllPosts(sectionId, postPage)),
        setIsAuth: isAuth => dispatch(setIsAuthAction(isAuth)),
        setUserData: userData => dispatch(setUserDataAction(userData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper);