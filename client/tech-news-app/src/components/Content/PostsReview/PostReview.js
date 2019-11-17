import React from 'react';
import Parser from 'html-react-parser';
import Common from "../../../common/Common";
import CommentsWrapper from "./Comments/CommentsWrapper";

function PostReview(props) {

    return (
        <div>
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
                                 src={props.post.imageUrl}
                                 alt="Card image"/>
                            <hr/>
                        </div>

                        <div>
                            {
                                props.post.fullDescription ? Parser(props.post.fullDescription) : ''
                            }
                        </div>

                        <hr/>

                        <CommentsWrapper/>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostReview;