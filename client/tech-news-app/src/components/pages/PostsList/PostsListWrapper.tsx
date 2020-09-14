import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import PostsList from './PostsList'
import {getSectionId, SECTION_ALL_POSTS} from '../../../common/Const'
import {useRouteMatch} from 'react-router-dom'
import {Post, PostInitial} from '../../../models/PostModel'
import {Dispatch} from 'redux'
import Spinner from '../../core/Spinner'
import {getPosts, setPostData} from '../../../redux/actions/postActions'
import {RootState} from '../../../redux/reducers/rootReducer'

interface Props {
    postList: Array<Post>
    postPage: number
    sectionId: number
    isLoading: boolean
    clearPostData: () => void
    getPosts: (sectionId: number, postPage?: number) => void
}

/**
 * Список постов. Оболочка
 */
const PostsListWrapper: React.FC<Props> = ({postPage, isLoading, postList, getPosts, clearPostData}) => {
    const {params}: any = useRouteMatch()

    useEffect(() => {
        const sectionName = params.sectionName

        if (!postList.length)
            sectionName ? getPosts(getSectionId(sectionName), postPage) : getPosts(SECTION_ALL_POSTS)
    }, [params.sectionName, postPage, postList])

    return postList.length > 0 && !isLoading
        ? <PostsList posts={postList}
                     clearPostData={clearPostData}/>
        : <Spinner/>

}

const mapStateToProps = (state: RootState) => {
    return {
        postList: state.postsData.postList,
        postPage: state.postsData.postPage,
        isLoading: state.postsData.isLoading,
        sectionId: state.postsData.sectionId
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        clearPostData: () => {dispatch(setPostData(PostInitial))},
        getPosts: (sectionId: number, postPage?: number) => dispatch(getPosts(sectionId, postPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsListWrapper)