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
import {AppThemeContext, ThemeContext} from '../../../context/ThemeContext'

interface Props {
    post: Post
    postRating: (postId: number, rate: number) => void
}

/**
 * Просмотр содержимого поста
 */
const PostReview: React.FC<Props> = ({post, postRating}: Props) => {
    const {isLight}: AppThemeContext = useContext(ThemeContext)
    const cardClasses: Array<string> = ['center-block', 'post-review-wrapper', isLight ? 'background-light' : 'background-dark']

    return (
        <div className="scale-up-center">

            {
                AuthService.isAdmin() && <PostAdminPanelWrapper postId={post.id}/>
            }

            <div className="row">
                <div className={cardClasses.join(' ')}>

                    <Hyphenated language={ru}>
                        <h2 className="mt-0 text-justify">
                            {post.title}
                        </h2>
                    </Hyphenated>

                    <NavLink to={`/profile/${post.author}`}
                             className="comment-author-link"
                             style={{color: 'black'}}>
                        @{post.author}
                    </NavLink>
                    <span className="post-date">
                         Дата: {post.date}
                     </span>

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
