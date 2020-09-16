import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import PagesNavigation from './PagesNavigation'
import {getPosts} from '../../../../redux/actions/postActions'
import {RootState} from '../../../../redux/reducers/rootReducer'


/**
 * Пагинатор. Оболочка
 */
const PagesNavigationWrapper: React.FC = () => {
    const dispatch = useDispatch()
    const {postPage, postsCount, sectionId} = useSelector((state: RootState) => state.postsData)

    const setPosts = (sectionId: number, postPage: number) => dispatch(getPosts(sectionId, postPage, true))

    return <PagesNavigation setPosts={setPosts}
                            postPage={postPage}
                            postsCount={postsCount}
                            sectionId={sectionId}/>
}

export default PagesNavigationWrapper