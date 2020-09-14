import React from 'react'
import {connect} from 'react-redux'

import PagesNavigation from './PagesNavigation'
import {Dispatch} from 'redux'
import {getPosts} from '../../../../redux/actions/postActions'
import {RootState} from '../../../../redux/reducers/rootReducer'

interface Props {
    postPage: number
    postsCount: number
    sectionId: number
    getPosts: (sectionId: number, postPage: number, setPage: boolean) => void
}

/**
 * Пагинатор. Оболочка
 */
const PagesNavigationWrapper: React.FC<Props> = ({postPage, postsCount, sectionId, getPosts}) => {
    const setPosts = (sectionId: number, postPage: number) => getPosts(sectionId, postPage, true)

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
        getPosts: (sectionId, postPage, setPage) => dispatch(getPosts(sectionId, postPage, setPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PagesNavigationWrapper)