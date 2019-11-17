import React from 'react';
import {connect} from "react-redux";
import {getAllPosts, setCurrentPostPageAction} from "../../redux/PostsReducer";
import Header from "./Header";
import {chooseSectionAction} from "../../redux/HeaderReducer";

class HeaderWrapper extends React.Component {

    setPosts = (sectionId) => {
        this.props.getAllPosts(sectionId, 1);
    };

    render() {
        return (<Header setPosts={this.setPosts}
                        currentSectionId={this.props.currentSectionId}
                        // isAuth={this.props.isAuth}
                        changeSection={this.props.changeSection}
                        // setAuthActive={this.props.setAuthActive}
                        setCurrentPostPage={this.props.setCurrentPostPage}
        />)
    }
}

let mapStateToProps = (state) => {
    return {
        currentSectionId: state.headerData.currentSectionId,
        // isAuth: state.authData.isAuth,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        changeSection: sectionId => dispatch(chooseSectionAction(sectionId)),
        // setAuthActive: isActive => dispatch(setAuthStatusAction(isActive)),
        setCurrentPostPage: pageNumber => dispatch(setCurrentPostPageAction(pageNumber)),
        getAllPosts: (sectionId, postPage) => dispatch(getAllPosts(sectionId, postPage))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper);