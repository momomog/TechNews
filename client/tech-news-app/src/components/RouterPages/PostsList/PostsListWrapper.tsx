import React from 'react';
import {connect} from "react-redux";
import PostsList from "./PostsList";
import {getPosts, setPostIdAction} from "../../../redux/PostsReducer";
import {getSectionId, SECTION_ALL_POSTS} from "../../../common/Const";
import {withRouter} from "react-router-dom";
import {Post, SetPostIdAction} from "../../../models/PostModel";
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import {RootState} from "../../../redux/ReduxStore";
import Spinner from "../../core/Spinner";

interface Props {
    postList: Array<Post>
    postPage: number
    sectionId: number
    setPostId: (id: number) => SetPostIdAction
    getPosts: (sectionId: number, postPage?: number) => void
}

class PostsListWrapper extends React.Component<RouteComponentProps<any> & Props> {

    componentDidMount() {

        const sectionName = this.props.match.params.sectionName

        if (!sectionName)
            this.props.getPosts(SECTION_ALL_POSTS)
        else if (sectionName && this.props.postList.length === 0)
            this.props.getPosts(getSectionId(sectionName), this.props.postPage)
    }

    setPostId = (postNumber: number) => this.props.setPostId(postNumber)

    render() {
        return this.props.postList.length > 0
            ? <PostsList posts={this.props.postList}
                         setPostId={this.setPostId}/>
            : <Spinner/>
    }
}

let mapStateToProps = (state: RootState) => {
    return {
        postList: state.postsData.postList,
        postPage: state.postsData.postPage,
        sectionId: state.postsData.sectionId
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setPostId: (id: number) => dispatch(setPostIdAction(id)),
        getPosts: (sectionId: number, postPage?: number) => dispatch(getPosts(sectionId, postPage))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsListWrapper))