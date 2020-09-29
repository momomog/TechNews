import React, {useContext, useMemo} from 'react'
import {NavLink} from 'react-router-dom'
import Hyphenated from 'react-hyphen'
import ru from 'hyphenated-ru'
import {Post, PostInitial} from '../../../models/PostModel'
import {AppThemeContext, ThemeContext} from '../../../context/ThemeContext'
import {setPostData} from "../../../redux/actions/postActions";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";

interface Props {
    post: Post
}

/**
 * Пост
 */
const PostItem: React.FC<Props> = ({post}) => {
    const {isLight}: AppThemeContext = useContext(ThemeContext)
    const cardClasses: Array<string> = ['row', 'well', 'post', 'center-block', isLight ? 'background-light' : 'background-dark']
    const dispatch: Dispatch = useDispatch()

    const postClick = () => {
        dispatch(setPostData(PostInitial))
        window.scroll(0, 0)
    }

    // Средняя оценка поста
    const averageRate = useMemo(() => {
        if (post.rates.length)
            return post.rates.reduce((acc, rate) => acc + rate, 0) / post.rates.length
        return 0
    }, [post])

    return (
        <div className={cardClasses.join(' ')}>

            <div className="col-sm-3 w-100 d-flex justify-content-center">
                <NavLink to={`/posts/post/${post.id}`}>
                    <img alt="post"
                         onClick={postClick}
                         className="post-picture"
                        // src={post.photoId && `${GOOGLE_EXPORT_VIEW}${post.photoId}`}/>
                         src={post.photoId}/>
                </NavLink>
            </div>

            <div className="col-sm-9">
                <div className="media-body">
                    <Hyphenated language={ru}>
                        <div className="post-title mb-0">
                            <NavLink to={`/posts/post/${post.id}`}>
                                <p className="text-justify" onClick={postClick}>
                                    {post.title}
                                </p>
                            </NavLink>
                        </div>
                        <p className="text-right text-justify">
                            @{post.author}
                        </p>
                        <p className="mh-50 text-justify">
                            {post.preDescription}
                        </p>
                    </Hyphenated>
                    <>
                        <ul className="list-inline list-unstyled">
                            <li>
                            <span>
                                <i className="glyphicon glyphicon-calendar">&ensp;</i>
                                {post.date}
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
                                        return index < averageRate
                                            ? <span className="glyphicon glyphicon-star" key={index}/>
                                            : <span className="glyphicon glyphicon-star-empty" key={index}/>
                                    })
                                }

                            </li>
                        </ul>
                    </>

                </div>
            </div>
        </div>
    )
}

export default PostItem