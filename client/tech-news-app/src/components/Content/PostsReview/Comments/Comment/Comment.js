import React from "react";

import Common from "../../../../../common/Common";
import {NavLink} from "react-router-dom";

function Comment(props) {

    function like() {
            props.likeCommentary(props.comment.id);
    }

    return (
        <div>
            <div className="media card-body">
                <NavLink to={'/profile/' + props.comment.authorName}>
                    <img className="d-flex mr-3 rounded-circle comment-author-photo"
                         src={'http://localhost:8080/api/user/photo?id=' + props.comment.authorId} alt=""/>
                </NavLink>
                <div className="media-body">
                    <div className="row">
                        <span className="col-lg-8 post-author-comment font-italic">
                            <NavLink to={'/profile/' + props.comment.authorName} className="comment-author-link">
                                @{props.comment.authorName}
                            </NavLink>
                        </span>
                        <span className="col-lg-4 text-right text-secondary">
                            {Common.dateTimeParser(props.comment.date)}
                        </span>
                    </div>
                    <div className="mt-1 mb-3" align="justify">
                        {props.comment.commentText}
                    </div>
                    <div className="row">
                        <span className="col-lg-1">
                            <a href="#" className="text-secondary reg">Ответить</a>
                        </span>
                        <span className="col-lg-2">
                            <i id='like'  className="fa fa-heart comment-icon mr-2" onClick={like}/>
                            <span className="comment-count">{props.comment.likes.length}</span>
                        </span>
                    </div>
                </div>
            </div>

            {
                props.comment.id === props.lastCommentId ? '' : <div className="border-bottom"/>
            }

        </div>
    )
}

export default Comment;