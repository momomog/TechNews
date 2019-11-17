import React from "react";

import Common from "../../../../../common/Common";

function Comment(props) {
    return (
        <div>
            <div className="media mb-4 border-bottom">
                <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
                <div className="media-body">
                    <div className="row">
                        <span className="col-lg-8 post-author-comment font-italic">
                            {props.comment.author}
                        </span>
                        <span className="col-lg-4 text-right text-secondary">
                            {Common.dateTimeParser(props.comment.date)}
                        </span>
                    </div>
                    <div className="mt-1 mb-3">
                        {props.comment.commentText}
                    </div>
                    <div className="row">
                        <span className="col-lg-1">
                            <a href="#">Ответить</a>
                        </span>
                        <span className="col-lg-2">
                            <i className="fa fa-thumbs-up comment-icon mr-2"></i>
                            0
                            <i className="fa fa-thumbs-down comment-icon ml-2"></i>
                        </span>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default Comment;