import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import PostsList from './PostsList'
import {getSectionId, SECTION_ALL_POSTS} from '../../../common/Const'
import {useRouteMatch} from 'react-router-dom'
import {Post} from '../../../models/PostModel'
import {Dispatch} from 'redux'
import Spinner from '../../core/Spinner'
import {getPosts} from '../../../redux/actions/postActions'
import {RootState} from '../../../redux/reducers/rootReducer'

interface Props {
    postList: Array<Post>
    postPage: number
    sectionId: number
    getPosts: (sectionId: number, postPage?: number) => void
}

/**
 * Список постов. Оболочка
 * @param postPage
 * @param postList
 * @param getPosts
 */
const PostsListWrapper: React.FC<Props> = ({postPage, postList, getPosts}) => {
    const {params}: any = useRouteMatch()

    useEffect(() => {
        const sectionName = params.sectionName

        if (!postList.length)
            params.sectionName ? getPosts(getSectionId(sectionName), postPage) : getPosts(SECTION_ALL_POSTS)
    }, [params, getPosts, postPage, postList])

    return postList.length
        ? <PostsList posts={postList}/>
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
        getPosts: (sectionId: number, postPage?: number) => dispatch(getPosts(sectionId, postPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsListWrapper)