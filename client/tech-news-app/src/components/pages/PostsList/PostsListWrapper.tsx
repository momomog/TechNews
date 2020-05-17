import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import PostsList from './PostsList'
import {getPosts, setPostIdAction} from '../../../redux/PostsReducer'
import {getSectionId, SECTION_ALL_POSTS} from '../../../common/Const'
import {useRouteMatch} from 'react-router-dom'
import {Post, SetPostIdAction} from '../../../models/PostModel'
import {Dispatch} from 'redux'
import {RootState} from '../../../redux/ReduxStore'
import Spinner from '../../core/Spinner'

interface Props {
    postList: Array<Post>
    postPage: number
    sectionId: number
    setPostId: (id: number) => SetPostIdAction
    getPosts: (sectionId: number, postPage?: number) => void
}

/**
 * Список постов. Оболочка
 * @param postPage
 * @param postList
 * @param setPostId
 * @param getPosts
 */
const PostsListWrapper: React.FC<Props> = ({postPage, postList, setPostId, getPosts}) => {
    const {params}: any = useRouteMatch()

    useEffect(() => {
        const sectionName = params.sectionName

        if (!sectionName)
            getPosts(SECTION_ALL_POSTS)
        else if (sectionName && !postList.length)
            getPosts(getSectionId(sectionName), postPage)
    }, [params, getPosts, postPage, postList])


    const onSetPostId = (postNumber: number) => setPostId(postNumber)

    return postList.length
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

export default connect(mapStateToProps, mapDispatchToProps)(PostsListWrapper)