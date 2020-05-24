import React, {useContext, useState} from 'react'
import {Comment, CommentRequest} from '../../../../models/CommentModel'
import Common from '../../../../common/Common'
import CommentItem from './Comment'
import {AuthContext} from '../../../../context/authContext/AuthContext'

interface Props {
    comments: Array<Comment>
    commentsCount: number
    likeCommentary: (commentId: number) => void
    deleteCommentary: (commentId: number) => void
    updateCommentary: (commentId: number, commentText: string) => void
    addNewCommentary: (request: CommentRequest) => void
}

/**
 * Список комментариев
 * @param props
 */
const Comments: React.FC<Props> = (props) => {
    const {isAuth} = useContext(AuthContext)
    const [commentText, setCommentText] = useState('')

    const addNewCommentary = () => {
        if (commentText.trim()) {
            props.addNewCommentary({commentText})
            setCommentText('')
        }
    }

    return (
        <div className="mb-5">
            {
                isAuth
                    ? <div className="my-4">
                        <h4 className="card-header">Оставьте свой комментарий:</h4>
                        <div className="comment-input">
                            <div className="form-group">
                                    <textarea className="form-control text-area" rows={3}
                                              placeholder="Введите текст комментария..."
                                              onChange={e => setCommentText(e.target.value)}
                                              value={commentText}
                                              onKeyPress={e => {
                                                  if (e.key === 'Enter') {
                                                      e.preventDefault()
                                                      addNewCommentary()
                                                  }
                                              }}/>
                            </div>
                            <button className="btn btn-primary"
                                    disabled={!commentText.trim()}
                                    onClick={addNewCommentary}>
                                Отправить
                            </button>
                        </div>
                    </div>

                    : <div className="my-4 mb-5">
                        <h4 className="card-header">Войдите на сайт для возможности оставлять комментарии!</h4>
                    </div>
            }

            <h4 className="card-header mb-4">
                {`${props.commentsCount} ${Common.getCommentaryCountText(props.commentsCount)}`}
            </h4>

            {
                props.comments.length > 0
                    ? props.comments.map(comment => {
                        return <CommentItem comment={comment}
                                            firstCommentId={props.comments[0].id}
                                            likeCommentary={props.likeCommentary}
                                            updateCommentary={props.updateCommentary}
                                            addCommentary={props.addNewCommentary}
                                            deleteCommentary={props.deleteCommentary}
                                            key={comment.id}/>
                    })
                    : <div className="ml-4">Ваш комментарий будет первым...</div>
            }

        </div>
    )
}

export default Comments