import React from 'react';
import {connect} from "react-redux";

import PagesNavigation from "./PagesNavigation";
import {setPostPageAndGetPosts} from "../../../../redux/PostsReducer";

class PagesNavigationWrapper extends React.Component {
    setPosts = (sectionId, postPage) => {
        this.props.setPostPageAndGetPosts(sectionId, postPage);
    };

    render() {
        return (
            <PagesNavigation setPosts={this.setPosts}
                             currentPostPage={this.props.currentPostPage}
                             postsCount={this.props.postsCount}
                             currentSectionId={this.props.currentSectionId}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currentPostPage: state.postsData.currentPostPage,
        postsCount: state.postsData.postsCount,
        currentSectionId: state.headerData.currentSectionId
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setPostPageAndGetPosts: (sectionId, postPage) => dispatch(setPostPageAndGetPosts(sectionId, postPage))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PagesNavigationWrapper);