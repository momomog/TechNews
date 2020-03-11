import React from 'react';
import {NavLink} from "react-router-dom";
import {getSectionName} from "../../../../common/Const";
import Common from "../../../../common/Common";

function Post(props) {
    const post = props.post;

    function setPostId() {
        props.setPostId(props.post.id);
        window.scroll(0, 0);
    }

    function postRate() {
        let rating = 0;

        if (post.rates && post.rates.length > 0) {
            post.rates.map(rate => rating += rate);

            return rating / post.rates.length;
        }

        return rating;
    }

    return (
        <div className="row well post center-block">

            <div className="col-sm-3">
                <NavLink to={`/posts/${getSectionName(props.sectionId)}/post/${post.id}`}>
                    <img alt="post"
                         onClick={setPostId}
                         src={post.photoId && `https://drive.google.com/uc?export=view&id=${post.photoId}`}/>
                </NavLink>
            </div>

            <div className="col-sm-9">
                <div className="media-body">
                    <div className="post-title" onClick={setPostId}>
                        <NavLink to={`/posts/${getSectionName(props.sectionId)}/post/${post.id}`}>
                            {post.title}
                        </NavLink>
                    </div>
                    <p className="text-right">
                        by @{post.author}
                    </p>
                    <p className="mh-50">
                        {post.preDescription}
                    </p>

                    <div>
                        <ul className="list-inline list-unstyled">
                            <li>
                            <span>
                                <i className="glyphicon glyphicon-calendar">&ensp;</i>
                                {Common.dateParser(post.date)}
                            </span>
                            </li>
                            <li>|</li>
                            <span>
                            <i className="glyphicon glyphicon-comment">&ensp;</i>
                                {post.commentsCount}
                        </span>
                            <li>|</li>
                            <li>

                                {
                                    Array.from({length: 5}).map((rate, index) => {
                                        if (index < postRate())
                                            return <span className="glyphicon glyphicon-star" key={index}/>
                                        else
                                            return <span className="glyphicon glyphicon-star-empty" key={index}/>
                                    })
                                }

                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Post;