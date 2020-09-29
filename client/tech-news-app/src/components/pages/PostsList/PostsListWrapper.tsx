import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PostsList from './PostsList'
import {getSectionId, SECTION_ALL_POSTS} from '../../../common/Const'
import {match, useRouteMatch} from 'react-router-dom'
import Spinner from '../../core/Spinner'
import {getPosts} from '../../../redux/actions/postActions'
import {postsDataSelector} from "../../../redux/selectors/selectors";
import {Dispatch} from "redux";
import {PostState} from "../../../models/PostModel";


/**
 * Список постов. Оболочка
 */
const PostsListWrapper: React.FC = () => {
    const {params}: match<{ sectionName: string }> = useRouteMatch()
    const dispatch: Dispatch = useDispatch()
    const {postList, isLoading, postPage}: PostState = useSelector(postsDataSelector)

    useEffect(() => {
        const sectionName = params.sectionName

        if (!postList.length)
            dispatch(sectionName
                ? getPosts(getSectionId(sectionName), postPage)
                : getPosts(SECTION_ALL_POSTS))
    }, [params.sectionName, postPage, postList])


    return postList.length > 0 && !isLoading
        ? <PostsList posts={postList}/>
        : <Spinner/>

}

export default PostsListWrapper