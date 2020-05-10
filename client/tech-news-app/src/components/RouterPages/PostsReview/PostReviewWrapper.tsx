import React, {useEffect} from 'react';
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
    userData: User
    getPostData: (sectionId: number, postId: number) => void
}

/**
 *
 * @param postData
 * @param sectionId
 * @param userData
 * @param getPostData
 * @param match
 * Просмотр содержимого поста. Оболочка
 */
const PostReviewWrapper: React.FC<RouteComponentProps<any> & Props> = ({postData, sectionId, userData, getPostData, match}) => {

    useEffect(() => {
        getPostData(sectionId, match.params.postId)
    }, [])

    const postRating = (postId: number, rate: number) => PostAPI.ratePost(postId, rate)

    return postData.id
        ? <PostReview post={postData}
                      user={userData}
                      postRating={postRating}/>
        : <Spinner/>
}

let mapStateToProps = (state: RootState) => {
    return {
        postData: state.postsData.postData,
        sectionId: state.postsData.sectionId,
        userData: state.userData.userData
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getPostData: (sectionId: number, postId: number) => dispatch(getPostData(sectionId, postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostReviewWrapper))