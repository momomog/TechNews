import React from 'react';
import Parser from 'html-react-parser';
import Common from "../../../common/Common";
import CommentsWrapper from "./Comments/CommentsWrapper";
import PostAdminPanelWrapper from "../AdminPanel/PostAdminPanel/PostAdminPanelWrapper";
import {NavLink} from "react-router-dom";
import AuthService from "../../../common/AuthService";

class PostReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRating: false,
            rating: null
        }
    }

    onRating = e => {
        this.setState({
            isRating: true,
            rating: e.target.value
        })

        this.props.postRating(e.target.value)
    }

    isRatedByUser = () => {
        if (this.props.post.ratedUsers) {
            const ratedUsers = this.props.post.ratedUsers;
            let isRated = false;

            if (ratedUsers.length > 0) {
                ratedUsers.map(rate => {
                    if (rate === this.props.user.id)
                        isRated = true;
                })
            }

            return isRated;
        }
    }

    render() {
        const post = this.props.post;

        return (
            <div>
                {
                    AuthService.isAdmin() && <PostAdminPanelWrapper postId={post.id}/>
                }

                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 center-block">
                            <h2 className="mt-4">{post.title}</h2>

                            <div className="row">
                            <span className="col-lg-8 post-author">
                                <NavLink to={'/profile/' + post.author} className="comment-author-link"
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

                            <div className="post-desc">
                                {
                                    post.fullDescription && Parser(post.fullDescription)
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

                            <div className="row disabled">
                                <div className="ml-4">
                                    {
                                        this.state.isRating
                                            ? <span className="post-author-comment">Спасибо! Ваша оценка данного поста: {
                                                Array.from({length: 5}).map( (item, index) => {
                                                    if (index + 1 <= this.state.rating)
                                                        return <span className="post-star">★</span>;
                                                    return <span className="post-star-empty">★</span>
                                                })
                                            } </span>
                                            : this.isRatedByUser()
                                                ? <div className="text-secondary">Вы уже оценили данный пост</div>
                                                : <div className="rating">
                                                    <span className="mr-2 post-author-comment"> Оцените пост!</span>
                                                    <input type="radio" id="star5" name="rating" value="5"
                                                           onClick={this.onRating}/>
                                                    <label htmlFor="star5" title="Отлично">5 stars</label>

                                                    <input type="radio" id="star4" name="rating" value="4"
                                                           onClick={this.onRating}/>
                                                    <label htmlFor="star4" title="Хорошо">4 stars</label>

                                                    <input type="radio" id="star3" name="rating" value="3"
                                                           onClick={this.onRating}/>
                                                    <label htmlFor="star3" title="Средне">3 stars</label>

                                                    <input type="radio" id="star2" name="rating" value="2"
                                                           onClick={this.onRating}/>
                                                    <label htmlFor="star2" title="Плохо">2 stars</label>

                                                    <input type="radio" id="star1" name="rating" value="1"
                                                           onClick={this.onRating}/>
                                                    <label htmlFor="star1" title="Ужасно">1 star</label>
                                                </div>
                                    }
                                </div>
                            </div>

                            <CommentsWrapper/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostReview