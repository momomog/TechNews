import React, {useContext} from 'react'
import Parser from 'html-react-parser'
import CommentsWrapper from './Comments/CommentsWrapper'
import PostAdminPanelWrapper from './PostAdminPanel/PostAdminPanelWrapper'
import {NavLink} from 'react-router-dom'
import AuthService from '../../../common/AuthService'
import TrackVisibility from 'react-on-screen'
import RecommendedPostsWrapper from './RecommendedPosts/RecommendedPostsWrapper'
import ru from 'hyphenated-ru'
import Hyphenated from 'react-hyphen'
import {Post} from '../../../models/PostModel'
import PostRating from './PostRating/PostRating'
import {ThemeContext} from '../../../context/ThemeContext'

interface Props {
    post: Post
    postRating: (postId: number, rate: number) => void
}

/**
 * Просмотр содержимого поста
 * @param post
 * @param postRating
 */
const PostReview: React.FC<Props> = ({post, postRating}) => {
    const {isLight} = useContext(ThemeContext)
    const cardClasses = ['center-block', 'post-review-wrapper', isLight ? 'background-light' : 'background-dark']

    return (
        <div className="scale-up-center">

            {
                AuthService.isAdmin() && <PostAdminPanelWrapper postId={post.id}/>
            }

            <div className="row">
                <div className={cardClasses.join(' ')}>

                    <Hyphenated language={ru}>
                        <h1 className="mt-0 text-justify">
                            {post.title}
                        </h1>
                    </Hyphenated>

                    <div className="row">
                            <span className="col-lg-8 post-author pl-0">
                                <NavLink to={`/profile/${post.author}`} className="comment-author-link text-secondary"
                                         style={{color: 'black'}}>
                                @{post.author}
                            </NavLink>

                            </span>
                        <span className="col-lg-4 text-right text-secondary">
                                Опубликовано: {post.date}
                            </span>
                    </div>
                    <hr/>
                    <div className="col-lg-12 mb-2">
                        <img className="card-img-top post-review-pic center-block" alt="Card"
                            // src={post.photoId && `https://drive.google.com/uc?export=view&id=${post.photoId}`}/>
                             src={post.photoId}/>
                        <hr/>
                    </div>

                    <div className="post-desc text-justify">

                        {
                            post.fullDescription &&
                            <Hyphenated language={ru}>{Parser(post.fullDescription)}</Hyphenated>
                        }

                    </div>

                    <hr className="mb-2"/>
                    {
                        post.editDate
                        && <div className="text-secondary mb-4">
                            {
                                `Редактировано пользователем @${post.editAuthor} ${post.editDate}`
                            }
                        </div>
                    }

                    <PostRating post={post}
                                postRating={postRating}/>

                    <CommentsWrapper/>

                    <TrackVisibility once partialVisibility>

                        {
                            <RecommendedPostsWrapper categoryId={post.categoryId}
                                                     postId={post.id}/>
                        }

                    </TrackVisibility>

                </div>
            </div>
        </div>
    )
}

export default PostReview