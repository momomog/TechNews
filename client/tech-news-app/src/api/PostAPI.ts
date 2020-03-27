import {getSectionName} from "../common/Const";
import {API_BASE_URL, request} from "./BaseRequest";
import AuthService from "../common/AuthService";
import {PostRequest} from "../models/RequestsModel";
import {Post} from "../models/PostModel";
import {PostsResponse} from "../models/ResponseModel";

class PostAPI {
    getPosts(sectionId: number, postPage: number): Promise<PostsResponse> {
        return request({
            url: `${API_BASE_URL}/posts/${getSectionName(sectionId)}/${postPage}`,
            method: 'GET'
        })
    }

    getRecommendedPosts(categoryId: number, postId: number): Promise<Array<Post>> {
        return request({
            url: `${API_BASE_URL}/posts/${categoryId}/recommended?id=${postId}`,
            method: 'GET'
        })
    }

    getPostData(sectionId: number, postId: number): Promise<Post> {
        return request({
            url: `${API_BASE_URL}/posts/post/${postId}`,
            method: 'GET'
        })
    }

    deletePostById(postId: number): Promise<boolean> {
        return request({
            url: `${API_BASE_URL}/posts/delete-post?id=${postId}`,
            method: 'GET'
        })
    }

    ratePost(postId: number, rate: number): Promise<boolean> {
        return request({
            url: `${API_BASE_URL}/posts/rate-post?id=${postId}`,
            method: 'POST',
            body: JSON.stringify({
                rate: rate
            })
        })
    }

    searchPosts(search_query: string): Promise<Array<Post>> {
        debugger
        return request({
            url: `${API_BASE_URL}/posts/search?search_query=${search_query}`,
            method: 'GET'
        })
    }

    onCreateNewPost(postDataRequest: PostRequest, photoBody: File): Promise<boolean> {
        const formData = new FormData();

        formData.append('post', new Blob([JSON.stringify(postDataRequest)], {
            type: "application/json"
        }))

        if (photoBody)
            formData.append('photo', photoBody)
        else
            formData.append('photo', new Blob())

        const headers = new Headers({});

        if (AuthService.getToken())
            headers.append('Authorization', 'Bearer ' + AuthService.getToken())

        return request({
            url: `${API_BASE_URL}/posts/new-post`,
            method: 'POST',
            headers: headers,
            body: formData
        })
    }

    onUpdatePostData(postId: number, postDataRequest: PostRequest, photoBody: File): Promise<boolean> {
        const formData = new FormData();
        formData.append('post', new Blob([JSON.stringify(postDataRequest)], {
            type: "application/json"
        }))

        if (photoBody)
            formData.append('photo', photoBody)
        else
            formData.append('photo', new Blob())

        const headers = new Headers({});

        if (AuthService.getToken())
            headers.append('Authorization', 'Bearer ' + AuthService.getToken())

        return request({
            url: `${API_BASE_URL}/posts/post/update?id=${postId}`,
            method: 'POST',
            headers: headers,
            body: formData
        })
    }
}

export default new PostAPI()
