import React, {useEffect} from 'react';
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

/**
 *
 * @param postPage
 * @param postList
 * @param setPostId
 * @param getPosts
 * @param match
 * Список постов. Оболочка
 */
const PostsListWrapper: React.FC<RouteComponentProps<any> & Props> = ({postPage, postList, setPostId, getPosts, match}) => {

    useEffect(() => {
        const sectionName = match.params.sectionName

        if (!sectionName)
            getPosts(SECTION_ALL_POSTS)
        else if (sectionName && postList.length === 0)
            getPosts(getSectionId(sectionName), postPage)
    }, [])


    const onSetPostId = (postNumber: number) => setPostId(postNumber)

    return postList.length > 0
        ? <PostsList posts={postList}
                     setPostId={onSetPostId}/>
        : <Spinner/>

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