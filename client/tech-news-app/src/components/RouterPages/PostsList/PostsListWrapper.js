import React from 'react';
import {connect} from "react-redux";
import PostsList from "./PostsList";
import {getAllPosts, setPostIdAction} from "../../../redux/PostsReducer";
import {getSectionId, SECTION_ALL_POSTS, sections} from "../../../common/Const";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";


class PostsListWrapper extends React.Component {
    state = {
        isWrongPath: false
    }

    componentDidMount() {
        const sectionName = this.props.match.params.sectionName

        if (!sectionName) {
            this.props.getAllPosts(SECTION_ALL_POSTS)
        } else if (sectionName && sections.indexOf(sectionName) !== -1) {
            if (this.props.postList && this.props.postList.length === 0) {
                this.props.getAllPosts(getSectionId(sectionName), this.props.postPage)
            }
        } else
            this.setState({isWrongPath: true})
    }

    setPostId = postNumber => {
        this.props.setPostId(postNumber);
    }

    render() {
        if (!this.state.isWrongPath)
            return <PostsList posts={this.props.postList}
                              setPostId={this.setPostId}/>
        return <Redirect to="/not-found"/>
    }
}

let mapStateToProps = state => {
    return {
        postList: state.postsData.postList,
        postPage: state.postsData.postPage,
        sectionId: state.postsData.sectionId
    }
}

let mapDispatchToProps = dispatch => {
    return {
        setPostId: id => dispatch(setPostIdAction(id)),
        getAllPosts: (sectionId, postPage) => dispatch(getAllPosts(sectionId, postPage))
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(PostsListWrapper)