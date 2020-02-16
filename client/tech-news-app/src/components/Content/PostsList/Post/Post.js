import React from 'react';
import {NavLink} from "react-router-dom";
import {getSectionName} from "../../../../common/Const";
import Common from "../../../../common/Common";

function Post(props) {

    function setPostId() {
        props.setPostId(props.post.id);
        window.scroll(0,0);
    }

    function createPostLink() {
        return '/posts/' + getSectionName(props.sectionId) + '/post/' + props.post.id;
    }

    return (
        <div className="well post center-block ">
            <div className="media">
                <NavLink to={createPostLink()} className="pull-left">
                    <img className="media-object post-picture" alt="post picture"
                         src={'https://drive.google.com/uc?export=view&id=' + props.post.photoId} onClick={setPostId}/>
                </NavLink>
                <div className="media-body">
                    <h4 className="media-heading" onClick={setPostId}>
                        <NavLink to={createPostLink()} className="post-title">
                            {props.post.title}
                        </NavLink>
                    </h4>
                    <p className="text-right">
                        by @{props.post.author}
                    </p>
                    <p>
                        {props.post.preDescription}
                    </p>
                    <ul className="list-inline list-unstyled">
                        <li>
                            <span>
                                <i className="glyphicon glyphicon-calendar">&ensp;</i>
                                {Common.dateParser(props.post.date)}
                            </span>
                        </li>
                        <li>|</li>
                        <span>
                            <i className="glyphicon glyphicon-comment">&ensp;</i>
                            {props.post.commentsCount}
                        </span>
                        <li>|</li>
                        <li>
                            <span className="glyphicon glyphicon-star"/>
                            <span className="glyphicon glyphicon-star"/>
                            <span className="glyphicon glyphicon-star"/>
                            <span className="glyphicon glyphicon-star"/>
                            <span className="glyphicon glyphicon-star-empty"/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Post;