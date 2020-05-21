import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import PostsList from './PostsList'
import {getSectionId, SECTION_ALL_POSTS} from '../../../common/Const'
import {useRouteMatch} from 'react-router-dom'
import {Post, SetPostIdAction} from '../../../models/PostModel'
import {Dispatch} from 'redux'
import {RootState} from '../../../redux/reduxStore'
import Spinner from '../../core/Spinner'
import {getPosts, setPostIdAction} from '../../../redux/actions/postActions'

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

        if (!postList.length)
            params.sectionName ? getPosts(getSectionId(sectionName), postPage) : getPosts(SECTION_ALL_POSTS)
    }, [params, getPosts, postPage, postList])


    const onSetPostId = (postNumber: number) => setPostId(postNumber)

    return postList.length
        ? <PostsList posts={postList}
                     setPostId={onSetPostId}/>
        : <Spinner/>

}

const mapStateToProps = (state: RootState) => {
    return {
        postList: state.postsData.postList,
        postPage: state.postsData.postPage,
        sectionId: state.postsData.sectionId
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setPostId: (id: number) => dispatch(setPostIdAction(id)),
        getPosts: (sectionId: number, postPage?: number) => dispatch(getPosts(sectionId, postPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsListWrapper)