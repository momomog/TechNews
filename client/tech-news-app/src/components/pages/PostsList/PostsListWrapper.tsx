import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PostsList from './PostsList'
import {getSectionId, SECTION_ALL_POSTS} from '../../../common/Const'
import {useRouteMatch} from 'react-router-dom'
import Spinner from '../../core/Spinner'
import {getPosts} from '../../../redux/actions/postActions'
import {RootState} from '../../../redux/reducers/rootReducer'


/**
 * Список постов. Оболочка
 */
const PostsListWrapper: React.FC = () => {
    const {params}: any = useRouteMatch()
    const dispatch = useDispatch()
    const {postList, isLoading, postPage} = useSelector((state: RootState) => state.postsData)

    useEffect(() => {
        const sectionName = params.sectionName

        if (!postList.length)
            dispatch(sectionName ? getPosts(getSectionId(sectionName), postPage) : dispatch(getPosts(SECTION_ALL_POSTS)))
    }, [params.sectionName, postPage, postList])


    return postList.length > 0 && !isLoading
        ? <PostsList posts={postList}/>
        : <Spinner/>

}

export default PostsListWrapper