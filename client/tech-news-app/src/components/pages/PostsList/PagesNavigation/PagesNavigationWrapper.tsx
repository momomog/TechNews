import React from 'react'
import {connect} from 'react-redux'

import PagesNavigation from './PagesNavigation'
import {setPostPageAndGetPosts} from '../../../../redux/PostsReducer'
import {RootState} from '../../../../redux/ReduxStore'
import {Dispatch} from 'redux'

interface Props {
    postPage: number
    postsCount: number
    sectionId: number
    setPostPageAndGetPosts: (sectionId: number, postPage: number) => void
}

/**
 *
 * @param postPage
 * @param postsCount
 * @param sectionId
 * @param setPostPageAndGetPosts
 * Пагинатор. Оболочка
 */
const PagesNavigationWrapper: React.FC<Props> = ({postPage, postsCount, sectionId, setPostPageAndGetPosts}) => {
    const setPosts = (sectionId: number, postPage: number) => setPostPageAndGetPosts(sectionId, postPage)

    return <PagesNavigation setPosts={setPosts}
                            postPage={postPage}
                            postsCount={postsCount}
                            sectionId={sectionId}/>
}

const mapStateToProps = (state: RootState) => {
    return {
        postPage: state.postsData.postPage,
        postsCount: state.postsData.postsCount,
        sectionId: state.postsData.sectionId
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setPostPageAndGetPosts: (sectionId, postPage) => dispatch(setPostPageAndGetPosts(sectionId, postPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PagesNavigationWrapper)