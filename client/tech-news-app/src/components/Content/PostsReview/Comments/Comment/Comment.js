import React from "react";

import Common from "../../../../../common/Common";

function Comment(props) {

    function like() {
            props.likeCommentary(props.comment.id);
    }

    return (
        <div>
            <div className="media card-body">
                <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
                <div className="media-body">
                    <div className="row">
                        <span className="col-lg-8 post-author-comment font-italic">
                            @{props.comment.authorName}
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