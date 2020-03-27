import React from 'react';
import {connect} from 'react-redux';
import PostReview from "./PostReview";
import {withRouter} from "react-router-dom";
import {Dispatch} from "redux";
import {getPostData} from "../../../redux/PostsReducer";
import PostAPI from "../../../api/PostAPI";
import {Post} from "../../../models/PostModel";
import {User} from "../../../models/UserModel";
import {RouteComponentProps} from "react-router";
import {RootState} from "../../../redux/ReduxStore";
import Spinner from "../../core/Spinner";

interface Props {
    postData: Post
    sectionId: number
    currentUserData: User
    getPostData: (sectionId: number, postId: number) => void
}

class PostReviewWrapper extends React.Component<RouteComponentProps<any> & Props> {

    componentDidMount() {
        this.props.getPostData(this.props.sectionId, this.props.match.params.postId)
    }

    postRating = (postId: number, rate: number) => {
        PostAPI.ratePost(postId, rate)
    }

    render() {
        return this.props.postData.id
            ? <PostReview post={this.props.postData}
                          user={this.props.currentUserData}
                          postRating={this.postRating}/>
            : <Spinner/>
    }
}

let mapStateToProps = (state: RootState) => {
    return {
        postData: state.postsData.postData,
        sectionId: state.postsData.sectionId,
        currentUserData: state.userData.currentUserData
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getPostData: (sectionId: number, postId: number) => dispatch(getPostData(sectionId, postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostReviewWrapper))