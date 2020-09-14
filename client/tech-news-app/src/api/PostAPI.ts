import {request} from './BaseRequest'
import {PostRequest} from '../models/RequestsModel'
import {Post} from '../models/PostModel'
import {PostsResponse} from '../models/ResponseModel'

class PostAPI {
    /**
     * Список постов
     */
    getPosts = (sectionName: string, postPage: number): Promise<PostsResponse> => request({
        url: `posts/${sectionName}/${postPage}`
    })

    /**
     * Список рекомендованных постов
     */
    getRecommendedPosts = (categoryId: number, postId: number): Promise<Array<Post>> => request({
        url: `posts/${categoryId}/recommended?id=${postId}`
    })

    /**
     * Данные конкретного поста
     */
    getPostById = (postId: number): Promise<Post> => request({
        url: `posts/post/${postId}`
    })

    /**
     * Удаление поста
     */
    deletePostById = (postId: number): Promise<boolean> => request({
        url: `posts/delete-post?id=${postId}`
    })

    /**
     * Оценка поста
     */
    ratePost = (postId: number, rate: number): Promise<boolean> => request({
        url: `posts/rate-post?id=${postId}`,
        method: 'POST',
        body: JSON.stringify({rate})
    })

    /**
     * Поиск постов по ключевому слову
     */
    searchPosts = (search_query: string): Promise<Array<Post>> => request({
        url: `posts/search?search_query=${search_query}`
    })

    /**
     * Создание нового поста
     */
    createNewPost = (postDataRequest: PostRequest, photoBody: File): Promise<boolean> => {
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
     */
    updatePostData = (postId: number, postDataRequest: PostRequest, photoBody: File): Promise<boolean> => {
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

    /**
     * "Заимствование" постов
     */
    createNewPostFromOuterSrc = (postDataRequest): Promise<boolean> => {
        return request({
            url: `posts/new-post-outer-src`,
            method: 'POST',
            body: JSON.stringify(postDataRequest)
        })
    }
}

export default new PostAPI()
