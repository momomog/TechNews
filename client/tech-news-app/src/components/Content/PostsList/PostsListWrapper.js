import React from 'react';
import {connect} from "react-redux";
import PostsList from "./PostsList";
import {getAllPosts, setCurrentPostIdAction} from "../../../redux/PostsReducer";
import {SECTION_ALL_POSTS} from "../../../common/Const";


class PostsListWrapper extends React.Component {

    // запрос постов с сервера
    componentDidMount() {
        this.props.currentPostsPage
        ? this.props.getAllPosts(this.props.currentPostsPage)
        : this.props.getAllPosts(SECTION_ALL_POSTS, 1);
    }

    setCurrentPostId = (postNumber) => {
        this.props.setCurrentPostId(postNumber);
    };

    render() {
        return <PostsList posts={this.props.postList}
                          currentSectionId={this.props.currentSectionId}
                          setCurrentPostId={this.setCurrentPostId}/>
    }
}

let mapStateToProps = (state) => {
    return {
        postList: state.postsData.postList,
        currentPostsPage: state.postsData.currentPostsPage,
        currentSectionId: state.headerData.currentSectionId
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setCurrentPostId: id => dispatch(setCurrentPostIdAction(id)),
        getAllPosts: (sectionId, postPage) => dispatch(getAllPosts(sectionId, postPage))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsListWrapper);