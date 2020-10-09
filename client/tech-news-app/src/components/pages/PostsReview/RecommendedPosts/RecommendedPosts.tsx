import React from 'react'
import Spinner from '../../../core/Spinner'
import {NavLink} from 'react-router-dom'
import {Post, PostInitial} from '../../../../models/PostModel'
import {setPostData} from '../../../../redux/actions/postActions'
import {Dispatch} from 'redux'
import {useDispatch} from 'react-redux'

interface Props {
    post: Post
}

/**
 * Рекомендуемый пост
 */
const PostItem: React.FC<Props> = ({post}: Props) => {
    const dispatch: Dispatch = useDispatch()

    const linkPropInit = () => ({pathname: `/redirect-to/post`, redirectUrl: `/posts/post/${post.id}`})

    return (
        <div className="col-sm-4 mb-3 d-flex justify-content-center">
            <div className="recommend-post">
                <div className="post-rec mb-3">
                    <img className="center-block" alt="Card"
                         // src={`https://drive.google.com/uc?export=view&id=${post.photoId}`}/>
                         src={post.photoId}/>
                </div>
                <div className="text-center">
                    <NavLink to={linkPropInit()} onClick={() => dispatch(setPostData(PostInitial))}>
                        {post.title}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}


/**
 * Рекомендуемые посты
 */
const RecommendedPosts: React.FC<{ posts: Array<Post> }> = ({posts}: { posts: Array<Post> }) => {
    return (
        <>
            <hr className="mt-3"/>
            <h2 className="mb-5">Вам может быть интересно</h2>
            {
                posts.length > 0
                    ? <div className="row">
                        {
                            posts.map(post => <PostItem key={post.id}
                                                        post={post}/>)
                        }
                    </div>
                    : <Spinner/>
            }
        </>
    )
}

export default RecommendedPosts
