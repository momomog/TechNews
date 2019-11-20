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
                             postPage={this.props.postPage}
                             postsCount={this.props.postsCount}
                             sectionId={this.props.sectionId}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        postPage: state.postsData.postPage,
        postsCount: state.postsData.postsCount,
        sectionId: state.authData.sectionId
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setPostPageAndGetPosts: (sectionId, postPage) => dispatch(setPostPageAndGetPosts(sectionId, postPage))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PagesNavigationWrapper);