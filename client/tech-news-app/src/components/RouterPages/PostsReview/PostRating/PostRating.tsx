import React, {useState} from "react";
import AuthService from "../../../../common/AuthService";
import {Post} from "../../../../models/PostModel";
import {User} from "../../../../models/UserModel";

interface Props {
    post: Post
    user: User
    postRating: (postId: number, rate: number) => void
}

/**
 * Оценка поста
 * @param post
 * @param postRating
 * @param user
 */
const PostRating: React.FC<Props> = ({post, postRating, user}) => {
    const [isRating, setIsRating] = useState(false)
    const [rating, setRating] = useState(0)

    const onRating = e => {
        setIsRating(true)
        setRating(Number(e.target.value))

        postRating(post.id, Number(e.target.value))
    }

    const isRatedByUser = () => {
        const ratedUsers = post.ratedUsers;
        let isRated = false;

        if (ratedUsers.length) {
            ratedUsers.forEach(rate => {
                if (rate === user.id)
                    isRated = true;
            })
        }

        return isRated
    }

    return (
        <div className="row disabled">
            <div className="ml-4">
                {
                    isRating
                        ? <span className="post-author-comment">Спасибо! Ваша оценка данного поста: {
                            Array.from({length: 5}).map((item, index) => {
                                if (index + 1 <= rating)
                                    return <span className="post-star">★</span>;
                                return <span className="post-star-empty">★</span>
                            })
                        } </span>
                        : isRatedByUser()
                        ? <div className="text-secondary">Вы уже оценили данный пост</div>
                        : AuthService.isAuth()
                            ? <div className="rating">
                                <span className="mr-2 post-author-comment"> Оцените пост!</span>
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
                            </div>
                            : <div/>
                }
            </div>
        </div>
    )
}

export default PostRating