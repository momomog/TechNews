import React from 'react';
import Parser from 'html-react-parser';
import Common from "../../../common/Common";
import CommentsWrapper from "./Comments/CommentsWrapper";
import PostAdminPanelWrapper from "../AdminPanel/PostAdminPanel/PostAdminPanelWrapper";
import * as BaseRequest from "../../../api/BaseRequest";

function PostReview(props) {

    return (
        <div>
            {
                Common.isUserAdmin() ? <PostAdminPanelWrapper postId={props.post.id}/> : ''
            }

            <div className="container">
                <div className="row">
                    <div className="col-lg-10 center-block">
                        <h2 className="mt-4">{props.post.title}</h2>
                        <div className="row">
                            <span className="col-lg-8 post-author">
                                {props.post.author}
                            </span>
                            <span className="col-lg-4 text-right text-secondary">
                                Опубликовано: {Common.dateParser(props.post.date)}
                            </span>
                        </div>
                        <hr/>
                        <div className="col-lg-12 mb-2">
                            <img className="card-img-top post-review-pic center-block"
                                 src={BaseRequest.API_BASE_URL + '/posts/post/photo?id=' + props.post.id}
                                 alt="Card image"/>
                            <hr/>
                        </div>

                        <div className="post-description">
                            {
                                props.post.fullDescription ? Parser(props.post.fullDescription) : ''
                            }
                        </div>

                        <hr className="mb-2"/>
                        {
                            props.post.editDate
                                ? <div className="text-secondary mb-4">
                                    {
                                        'Редактировано пользователем @' + props.post.editAuthor + ' ' +
                                        Common.dateTimeParser(props.post.editDate)
                                    }
                                </div>
                                : ''
                        }

                        <div className="row disabled">
                            <div className="rating ml-4">
                                <span className="mr-2 post-author-comment"> Оцените пост!</span>
                                <input type="radio" id="star5" name="rating" value="5"/>
                                <label htmlFor="star5" title="Отлично">5 stars</label>

                                <input type="radio" id="star4" name="rating" value="4"/>
                                <label htmlFor="star4" title="Хорошо">4 stars</label>

                                <input type="radio" id="star3" name="rating" value="3"/>
                                <label htmlFor="star3" title="Средне">3 stars</label>

                                <input type="radio" id="star2" name="rating" value="2"/>
                                <label htmlFor="star2" title="Плохо">2 stars</label>

                                <input type="radio" id="star1" name="rating" value="1"/>
                                <label htmlFor="star1" title="Ужасно">1 star</label>
                            </div>
                        </div>

                        <CommentsWrapper/>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostReview;