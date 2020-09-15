import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import PostAPI from '../../../api/PostAPI'
import {Post} from '../../../models/PostModel'
import Spinner from '../../core/Spinner'
import PostSearch from './PostSearch'

/**
 * Поиск по сайту. Оболочка
 */
const PostSearchWrapper: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [posts, setSearchPosts] = useState<Array<Post>>([])

    const query = new URLSearchParams(useLocation().search)
    const search_query = query.get('search_query')

    if (search_query && search_query !== searchText)
        setSearchText(search_query)

    useEffect(() => {
        setIsLoading(true)

        PostAPI.searchPosts(searchText)
            .then((response: Array<Post>) => {
                setSearchPosts(response)
                setIsLoading(false)
            })
            .catch(() => setIsLoading(false))
    }, [searchText])

    return (
        <>
            {
                isLoading
                    ? <Spinner/>
                    : posts.length > 0
                    ? <PostSearch posts={posts}
                                  searchText={searchText}/>
                    : <h3 className="empty-search-res">Не найдено записей, удовлетворяющих запросу "{searchText}"</h3>
            }
        </>
    )
}

export default PostSearchWrapper