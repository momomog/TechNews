import React, {useState} from 'react';
import RecommendedPosts from "./RecommendedPosts";
import PostAPI from "../../../../api/PostAPI";

const RecommendedPostsWrapper = ({categoryId, postId, isVisible}) => {
    const [posts, setPosts] = useState(undefined)

    if (categoryId && isVisible && !posts) {
        PostAPI.getRecommendedPosts(categoryId, postId).then(response => {
            setPosts(response)
        })
    }

    return isVisible && <RecommendedPosts posts={posts}/>
}

export default RecommendedPostsWrapper