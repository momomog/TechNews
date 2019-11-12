import React from 'react';
import {NavLink} from "react-router-dom";

import '../../../../styles/Posts.css'

function Post(props) {

    function plusComment() {
        alert("dfg1")
    }

    return (
        <div className="well post">
            <div className="media">
                <NavLink className="pull-left" to="/post">
                    <img className="media-object post-picture" alt="post picture"
                         src={props.post.photoURL}/>
                </NavLink>
                <div className="media-body">
                    <h4 className="media-heading">
                        <NavLink to="/post" className="post-title">
                            {props.post.title}
                        </NavLink>
                    </h4>
                    <p className="text-right">{props.post.author}</p>
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
                            <i className="glyphicon glyphicon-comment" onClick={plusComment}>&ensp;</i>
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
                        <li>|</li>
                        <li>
                            <span><i className="fa fa-facebook-square"></i> </span>
                            <span><i className="fa fa-twitter-square"></i> </span>
                            <span><i className="fa fa-google-plus-square"></i> </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Post;