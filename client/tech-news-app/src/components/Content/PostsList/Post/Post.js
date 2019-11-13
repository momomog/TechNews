import React from 'react';
import {NavLink} from "react-router-dom";

function Post(props) {

    function setCurrentPostId() {
        props.setCurrentPostId(props.post.id)
    }

    return (
        <div className="well post center-block ">
            <div className="media">
                <NavLink className="pull-left" to="/post">
                    <img className="media-object post-picture" alt="post picture"
                         src={props.post.photoURL} onClick={setCurrentPostId}/>
                </NavLink>
                <div className="media-body">
                    <h4 className="media-heading" onClick={setCurrentPostId}>
                        <NavLink to="/post" className="post-title">
                            {props.post.title}
                        </NavLink>
                    </h4>
                    <p className="text-right">
                        {props.post.author}
                    </p>
                    <p>
                        {props.post.description}
                    </p>
                    <ul className="list-inline list-unstyled">
                        <li>
                            <span>
                                <i className="glyphicon glyphicon-calendar">&ensp;</i>
                                {props.post.publicationTime}
                            </span>
                        </li>
                        <li>|</li>
                        <span>
                            <i className="glyphicon glyphicon-comment">&ensp;</i>
                            {props.post.commentsCount}
                        </span>
                        <li>|</li>
                        <li>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star-empty"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Post;