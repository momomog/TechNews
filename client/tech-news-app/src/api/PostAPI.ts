import {request} from './BaseRequest'
import {PostRequest} from '../models/RequestsModel'
import {Post} from '../models/PostModel'
import {PostsResponse} from '../models/ResponseModel'

class PostAPI {
    /**
     * Список постов
     * @param sectionName
     * @param postPage
     */
    getPosts = (sectionName: string, postPage: number): Promise<PostsResponse> => request({
        url: `posts/${sectionName}/${postPage}`
    })

    /**
     * Список рекомндованных постов
     * @param categoryId
     * @param postId
     */
    getRecommendedPosts = (categoryId: number, postId: number): Promise<Array<Post>> => request({
        url: `posts/${categoryId}/recommended?id=${postId}`
    })

    /**
     * Данные конкретного поста
     * @param sectionId
     * @param postId
     */
    getPostData = (sectionId: number, postId: number): Promise<Post> => request({
        url: `posts/post/${postId}`
    })

    /**
     * Удаление поста
     * @param postId
     */
    deletePostById = (postId: number): Promise<boolean> => request({
        url: `posts/delete-post?id=${postId}`
    })

    /**
     * Оценка поста
     * @param postId
     * @param rate
     */
    ratePost = (postId: number, rate: number): Promise<boolean> => request({
        url: `posts/rate-post?id=${postId}`,
        method: 'POST',
        body: JSON.stringify({
            rate: rate
        })
    })

    /**
     * Поиск постов по ключевому слову
     * @param search_query
     */
    searchPosts = (search_query: string): Promise<Array<Post>> => request({
        url: `posts/search?search_query=${search_query}`
    })

    /**
     * Создание нового поста
     * @param postDataRequest
     * @param photoBody
     */
    onCreateNewPost = (postDataRequest: PostRequest, photoBody: File): Promise<boolean> => {
        const formData = new FormData()

        formData.append('post', new Blob([JSON.stringify(postDataRequest)], {
            type: 'application/json'
        }))

        if (photoBody)
            formData.append('photo', photoBody)
        else
            formData.append('photo', new Blob())

        return request({
            url: `posts/new-post`,
            method: 'POST',
            headers: new Headers({}),
            body: formData
        })
    }

    /**
     * Обновление содержимого поста
     * @param postId
     * @param postDataRequest
     * @param photoBody
     */
    onUpdatePostData = (postId: number, postDataRequest: PostRequest, photoBody: File): Promise<boolean> => {
        const formData = new FormData()
        formData.append('post', new Blob([JSON.stringify(postDataRequest)], {
            type: 'application/json'
        }))

        if (photoBody)
            formData.append('photo', photoBody)
        else
            formData.append('photo', new Blob())

        return request({
            url: `posts/post/update?id=${postId}`,
            method: 'POST',
            headers: new Headers({}),
            body: formData
        })
    }
}

export default new PostAPI()
