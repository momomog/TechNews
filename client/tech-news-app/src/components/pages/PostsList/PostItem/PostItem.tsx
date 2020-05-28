import React from 'react'
import {NavLink} from 'react-router-dom'
import Hyphenated from 'react-hyphen'
import ru from 'hyphenated-ru'
import Common from '../../../../common/Common'
import {Post} from '../../../../models/PostModel'
import {GOOGLE_EXPORT_VIEW} from '../../../../common/Const'

interface Props {
    post: Post
    clearPostData?: () => void
}

/**
 * Пост
 * @param post
 * @param clearPostData
 */
const PostItem: React.FC<Props> = ({post, clearPostData}) => {
    const postRate = () => {
        let rating = 0

        if (post.rates.length > 0) {
            post.rates.map(rate => rating += rate)

            return rating / post.rates.length
        }

        return rating
    }

    const postClick = () => {
        if (typeof clearPostData === 'function')
            clearPostData()
        window.scroll(0,0)
    }

    return (
        <div className="row well post center-block">

            <div className="col-sm-3 w-100 d-flex justify-content-center">
                <NavLink to={`/posts/post/${post.id}`}>
                    <img alt="post"
                         onClick={postClick}
                         className="post-picture"
                         src={post.photoId && `${GOOGLE_EXPORT_VIEW}${post.photoId}`}/>
                </NavLink>
            </div>

            <div className="col-sm-9">
                <div className="media-body">
                    <Hyphenated language={ru}>
                        <div className="post-title">
                            <NavLink to={`/posts/post/${post.id}`}>
                                <p className="text-justify" onClick={postClick}>
                                    {post.title}
                                </p>
                            </NavLink>
                        </div>
                        <p className="text-right text-justify">
                            by @{post.author}
                        </p>
                        <p className="mh-50 text-justify">
                            {post.preDescription}
                        </p>
                    </Hyphenated>
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

export default PostItem