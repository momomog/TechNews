import React from 'react';
import {connect} from "react-redux";
import {getAllPosts, setPostPageAction} from "../../redux/PostsReducer";
import Header from "./Header";
import {chooseSectionAction} from "../../redux/HeaderReducer";

class HeaderWrapper extends React.Component {

    setPosts = (sectionId) => {
        this.props.getAllPosts(sectionId, 1);
    };

    render() {
        return (<Header setPosts={this.setPosts}
                        sectionId={this.props.sectionId}
                        // isAuth={this.props.isAuth}
                        changeSection={this.props.changeSection}
                        // setAuthActive={this.props.setAuthActive}
                        setPostPage={this.props.setPostPage}
        />)
    }
}

let mapStateToProps = (state) => {
    return {
        sectionId: state.headerData.sectionId,
        // isAuth: state.authData.isAuth,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        changeSection: sectionId => dispatch(chooseSectionAction(sectionId)),
        // setAuthActive: isActive => dispatch(setAuthStatusAction(isActive)),
        setPostPage: pageNumber => dispatch(setPostPageAction(pageNumber)),
        getAllPosts: (sectionId, postPage) => dispatch(getAllPosts(sectionId, postPage))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper);