import React from 'react';
import {connect} from "react-redux";
import PostsList from "./PostsList";
import {setCurrentPostIdAction} from "../../../redux/PostsReducer";


class PostsListWrapper extends React.Component {

    setCurrentPostId = (postNumber) => {
        this.props.setCurrentPostId(postNumber);
    };

    render() {
        return <PostsList posts={this.props.postsList}
                          setCurrentPostId={this.setCurrentPostId}/>
    }
}

let mapStateToProps = (state) => {
    return {
        postsList: state.postsData.postsList
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setCurrentPostId: id => dispatch(setCurrentPostIdAction(id)),
        // getPosts: postPage => dispatch(getPosts(postPage))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsListWrapper);