import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import PagesNavigation from './PagesNavigation'
import {getPosts} from '../../../../redux/actions/postActions'
import {postsDataSelector} from "../../../../redux/selectors/selectors";


/**
 * Пагинатор. Оболочка
 */
const PagesNavigationWrapper: React.FC = () => {
    const dispatch = useDispatch()
    const {postPage, postsCount, sectionId} = useSelector(postsDataSelector)

    const setPosts = (sectionId: number, postPage: number) => dispatch(getPosts(sectionId, postPage, true))

    return <PagesNavigation setPosts={setPosts}
                            postPage={postPage}
                            postsCount={postsCount}
                            sectionId={sectionId}/>
}

export default PagesNavigationWrapper