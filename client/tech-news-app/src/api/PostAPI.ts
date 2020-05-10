import {getSectionName} from "../common/Const";
import {request} from "./BaseRequest";
import {PostRequest} from "../models/RequestsModel";
import {Post} from "../models/PostModel";
import {PostsResponse} from "../models/ResponseModel";

class PostAPI {
    getPosts = (sectionId: number, postPage: number): Promise<PostsResponse> => request({
        url: `posts/${getSectionName(sectionId)}/${postPage}`
    })

    getRecommendedPosts = (categoryId: number, postId: number): Promise<Array<Post>> => request({
        url: `posts/${categoryId}/recommended?id=${postId}`
    })

    getPostData = (sectionId: number, postId: number): Promise<Post> => request({
        url: `posts/post/${postId}`
    })

    deletePostById = (postId: number): Promise<boolean> => request({
        url: `posts/delete-post?id=${postId}`
    })

    ratePost = (postId: number, rate: number): Promise<boolean> => request({
        url: `posts/rate-post?id=${postId}`,
        method: 'POST',
        body: JSON.stringify({
            rate: rate
        })
    })

    searchPosts = (search_query: string): Promise<Array<Post>> => request({
        url: `posts/search?search_query=${search_query}`
    })

    onCreateNewPost = (postDataRequest: PostRequest, photoBody: File): Promise<boolean> => {
        const formData = new FormData()

        formData.append('post', new Blob([JSON.stringify(postDataRequest)], {
            type: "application/json"
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

    onUpdatePostData = (postId: number, postDataRequest: PostRequest, photoBody: File): Promise<boolean> => {
        const formData = new FormData()
        formData.append('post', new Blob([JSON.stringify(postDataRequest)], {
            type: "application/json"
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
