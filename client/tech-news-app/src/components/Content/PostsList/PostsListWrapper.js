import React from 'react';
import {connect} from "react-redux";
import PostsList from "./PostsList";
import {getAllPosts, setPostIdAction} from "../../../redux/PostsReducer";
import {SECTION_ALL_POSTS} from "../../../common/Const";


class PostsListWrapper extends React.Component {

    componentDidMount() {
        this.props.postPage
        ? this.props.getAllPosts(this.props.sectionId, this.props.postPage)
        : this.props.getAllPosts(SECTION_ALL_POSTS, 1);
    }

    setPostId = (postNumber) => {
        this.props.setPostId(postNumber);
    };

    render() {
        return <PostsList posts={this.props.postList}
                          sectionId={this.props.sectionId}
                          setPostId={this.setPostId}/>
    }
}

let mapStateToProps = (state) => {
    return {
        postList: state.postsData.postList,
        postPage: state.postsData.postPage,
        sectionId: state.authData.sectionId
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setPostId: id => dispatch(setPostIdAction(id)),
        getAllPosts: (sectionId, postPage) => dispatch(getAllPosts(sectionId, postPage))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsListWrapper);