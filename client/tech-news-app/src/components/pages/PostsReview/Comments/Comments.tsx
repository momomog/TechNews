import React, {useContext, useState} from 'react'
import {Comment, CommentRequest} from '../../../../models/CommentModel'
import Common from '../../../../common/Common'
import CommentItem from './Comment'
import {AppAuthContext, AuthContext} from '../../../../context/AuthContext'
import {AppThemeContext, ThemeContext} from '../../../../context/ThemeContext'
import {CommentActions as Actions} from './CommentsWrapper'

interface Props {
    comments: Array<Comment>
    commentsCount: number
    commentAction: (action: Actions,
                    actionIndefiniteForm: string,
                    commentId: number,
                    updateCommentText?: string,
                    commentText?: CommentRequest,
                    newCommentBody?: CommentRequest) => void
}

/**
 * Список комментариев
 */
const Comments: React.FC<Props> = ({comments, commentsCount, commentAction}: Props) => {
    const {isAuth}: AppAuthContext = useContext(AuthContext)
    const [commentText, setCommentText] = useState<string>('')
    const {isLight}: AppThemeContext = useContext(ThemeContext)
    const textAreaClasses: Array<string> = ['form-control', 'text-area', isLight ? 'background-light' : 'navbar-dark-background']

    const addNewCommentary = () => {
        if (commentText.trim()) {
            commentAction(Actions.ADD_NEW, 'добавить', 0, '', {commentText})
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
                                    <textarea className={textAreaClasses.join(' ')} rows={3}
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

                    : <h4 className="card-header mb-1">Войдите на сайт для возможности оставлять комментарии!</h4>
            }

            <h4 className="card-header mb-4">
                {`${commentsCount} ${Common.getCommentaryCountText(commentsCount)}`}
            </h4>

            {
                comments.length > 0
                    ? comments.map(comment => {
                        return <CommentItem comment={comment}
                                            firstCommentId={comments[0].id}
                                            commentAction={commentAction}
                                            key={comment.id}/>
                    })
                    : <div className="ml-4">Ваш комментарий будет первым...</div>
            }

        </div>
    )
}

export default Comments
