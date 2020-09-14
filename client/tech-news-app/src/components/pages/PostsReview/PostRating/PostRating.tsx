import React, {useContext, useState} from 'react'
import AuthService from '../../../../common/AuthService'
import {Post} from '../../../../models/PostModel'
import {AuthContext} from '../../../../context/AuthContext'

interface Props {
    post: Post
    postRating: (postId: number, rate: number) => void
}

/**
 * Оценка поста
 * @param post
 * @param postRating
 */
const PostRating: React.FC<Props> = ({post, postRating}) => {
    const {user} = useContext(AuthContext)
    const [isRating, setIsRating] = useState(false)
    const [rating, setRating] = useState(0)

    const onRating = e => {
        setIsRating(true)
        setRating(Number(e.target.value))
        postRating(post.id, Number(e.target.value))
    }

    const isRatedByUser = () => {
        const ratedUsers = post.ratedUsers
        let isRated = false

        if (ratedUsers.length) {
            ratedUsers.forEach(rate => {
                if (rate === user.id)
                    isRated = true
            })
        }
        return isRated
    }

    return (
        <div className="row disabled">
            <>
                {
                    isRating
                        ? <span className="post-author-comment">Спасибо! Ваша оценка данного поста: {
                            Array.from({length: 5}).map((item, index) => {
                                if (index + 1 <= rating)
                                    return <span className="post-star" key={index}>★</span>
                                return <span className="post-star-empty" key={index}>★</span>
                            })
                        } </span>
                        : isRatedByUser()
                        ? <div className="text-secondary">Вы уже оценили данный пост</div>
                        : AuthService.isAuth()
                            ? <>
                                <span className="mr-2 mt-5 post-star-text">Оцените пост!</span>
                                <span className="rating">
                                    <input type="radio" id="star5" name="rating" value="5"
                                           onClick={onRating}/>
                                    <label htmlFor="star5" title="Отлично">5 stars</label>

                                    <input type="radio" id="star4" name="rating" value="4"
                                           onClick={onRating}/>
                                    <label htmlFor="star4" title="Хорошо">4 stars</label>

                                    <input type="radio" id="star3" name="rating" value="3"
                                           onClick={onRating}/>
                                    <label htmlFor="star3" title="Средне">3 stars</label>

                                    <input type="radio" id="star2" name="rating" value="2"
                                           onClick={onRating}/>
                                    <label htmlFor="star2" title="Плохо">2 stars</label>

                                    <input type="radio" id="star1" name="rating" value="1"
                                           onClick={onRating}/>
                                    <label htmlFor="star1" title="Ужасно">1 star</label>
                                </span>
                            </>
                            : null
                }
            </>
        </div>
    )
}

export default PostRating