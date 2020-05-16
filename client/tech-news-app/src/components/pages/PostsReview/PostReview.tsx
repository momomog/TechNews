import React from 'react';
import Parser from 'html-react-parser';
import Common from "../../../common/Common";
import CommentsWrapper from "./Comments/CommentsWrapper";
import PostAdminPanelWrapper from "./PostAdminPanel/PostAdminPanelWrapper";
import {NavLink} from "react-router-dom";
import AuthService from "../../../common/AuthService";
import TrackVisibility from "react-on-screen";
import RecommendedPostsWrapper from "./RecommendedPosts/RecommendedPostsWrapper";
import ru from "hyphenated-ru";
import Hyphenated from "react-hyphen";
import {Post} from "../../../models/PostModel";
import {User} from "../../../models/UserModel";
import PostRating from "./PostRating/PostRating";

interface Props {
    post: Post
    user: User
    postRating: (postId: number, rate: number) => void
}

/**
 * Просмотр содержимого поста
 * @param post
 * @param postRating
 * @param user
 */
const PostReview: React.FC<Props> = ({post, postRating, user}) => {

    return (
        <div>
            {
                AuthService.isAdmin() && <PostAdminPanelWrapper postId={post.id}/>
            }

            <div >
                <div className="row">
                    <div className="center-block post-review-wrapper">

                        <Hyphenated language={ru}>
                            <h2 className="mt-0 text-justify">
                                {post.title}
                            </h2>
                        </Hyphenated>

                        <div className="row">
                            <span className="col-lg-8 post-author">
                                <NavLink to={`/profile/${post.author}`} className="comment-author-link"
                                         style={{color: "black"}}>
                                @{post.author}
                            </NavLink>

                            </span>
                            <span className="col-lg-4 text-right text-secondary">
                                Опубликовано: {Common.dateParser(post.date)}
                            </span>
                        </div>
                        <hr/>
                        <div className="col-lg-12 mb-2">
                            <img className="card-img-top post-review-pic center-block" alt="Card"
                                 src={post.photoId && `https://drive.google.com/uc?export=view&id=${post.photoId}`}/>
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
                                    'Редактировано пользователем @' + post.editAuthor + ' ' +
                                    Common.dateTimeParser(post.editDate)
                                }
                            </div>
                        }

                        <PostRating user={user}
                                    post={post}
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
        </div>
    )
}

export default PostReview