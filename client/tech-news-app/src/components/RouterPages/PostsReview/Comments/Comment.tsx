import React, {useState} from "react";

import Common from "../../../../common/Common";
import {NavLink} from "react-router-dom";
import Popup from "reactjs-popup";
import AuthService from "../../../../common/AuthService";
import {User} from "../../../../models/UserModel";
import {Comment} from "../../../../models/CommentModel";
import {CommentRequest} from "./CommentsWrapper";

interface Props {
    comment: Comment
    firstCommentId?: number
    isAuth: boolean
    currentUserData: User
    likeCommentary: (commentId: number) => void
    deleteCommentary: (commentId: number) => void
    updateCommentary: (commentId: number, commentText: string) => void
    addCommentary: (request: CommentRequest) => void
}

/**
 *
 * @param comment
 * @param firstCommentId
 * @param isAuth
 * @param currentUserData
 * @param likeCommentary
 * @param deleteCommentary
 * @param updateCommentary
 * @param addCommentary
 * компонент Комментарий
 */
const CommentItem: React.FC<Props> = ({
                                          comment, firstCommentId, isAuth, currentUserData,
                                          likeCommentary, deleteCommentary, updateCommentary, addCommentary
                                      }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [isAnswerMode, setIsAnswerMode] = useState<boolean>(false)
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)
    const [commentId, setCommentId] = useState<number>(0)
    const [commentAnswerParentId, setCommentAnswerParentId] = useState<number>(0)
    const [commentEditText, setCommentEditText] = useState<string>('')
    const [commentAnswerText, setCommentAnswerText] = useState<string>('')
    const [commentAnswerParentAuthorName, setCommentAnswerParentAuthorName] = useState<string>('')

    const onLike = () => {
        if (isAuth && !comment.isDeleted)
            likeCommentary(comment.id)
    }

    const onDeleteCommentary = () => {
        deleteCommentary(comment.id)
        setCommentEditText('')
    }

    const onUpdateCommentary = () => {
        updateCommentary(comment.id, commentEditText)
        setIsEditMode(false)
    }

    const onAddCommentary = () => {
        if (commentAnswerText.trim()) {
            addCommentary({
                commentText: commentAnswerText,
                parentCommentId: commentAnswerParentId,
                parentCommentAuthorName: commentAnswerParentAuthorName
            })

            setIsAnswerMode(false)
            setCommentAnswerText('')
        }
    }

    const onClickEditCommentary = () => {
        setIsEditMode(true)
        setIsAnswerMode(false)
        setCommentId(comment.id)
        setCommentEditText(comment.commentText)
    }

    const onClickAnswerCommentary = () => {
        setIsEditMode(false)
        setIsAnswerMode(true)
        setCommentAnswerParentId(comment.id)
        setCommentAnswerParentAuthorName(comment.authorName)
    }


    return (
        <div>
            {
                firstCommentId !== comment.id && !comment.parentCommentId && <div className="border-bottom"/>
            }

            <div className="media card-body mt-0">
                <NavLink to={'/profile/' + comment.authorName}>
                    <img className="d-flex mr-3 rounded-circle comment-author-photo"
                         src={comment.authorPhotoId
                         && `https://drive.google.com/uc?export=view&id=${comment.authorPhotoId}`}
                    />
                </NavLink>
                <div className="media-body">
                    <div className="row">
                        <span className="col-lg-8 post-author-comment font-italic">
                            <NavLink to={'/profile/' + comment.authorName} className="comment-author-link">
                                @{comment.authorName}
                            </NavLink>
                        </span>
                        <span className="col-lg-4 text-right text-secondary">
                            {Common.dateTimeParser(comment.date)}
                        </span>
                    </div>

                    {
                        isEditMode && commentId === comment.id
                            ? <div>
                                    <textarea className="form-control text-area mt-2" rows={3}
                                              onChange={e => setCommentEditText(e.target.value)}
                                              value={commentEditText}
                                              onKeyUp={(e) => {
                                                  // @ts-ignore
                                                  e.target.style.height = "1px";
                                                  // @ts-ignore
                                                  e.target.style.height = (20 + e.target.scrollHeight) + "px";
                                              }}
                                              onKeyPress={event => {
                                                  if (event.key === 'Enter') {
                                                      event.preventDefault();
                                                      onUpdateCommentary();
                                                  }
                                              }}
                                    />
                                <span>
                                        <a className="text-secondary comment-action" onClick={onUpdateCommentary}>
                                            Сохранить
                                        </a>
                                        <a className="text-secondary comment-action ml-4"
                                           onClick={() => setIsEditMode(false)}>
                                            Отменить
                                        </a>
                                    </span>
                            </div>
                            : <div>
                                <div className="mt-1 mb-3 text-justify">
                                    {
                                        comment.isDeleted
                                            ? <i>{comment.commentText}</i>
                                            : comment.parentCommentAuthorName
                                            ? <div>
                                                <span
                                                    className="font-weight-bold ml-1">{comment.parentCommentAuthorName}</span>
                                                <span>, {comment.commentText}</span>
                                            </div>
                                            : comment.commentText
                                    }
                                </div>
                                <div className="row">
                                        <span className="col-lg-12">
                                        <i id='like' className="fa fa-heart comment-icon mr-2 ml-1" onClick={onLike}/>
                                        <span className="comment-count">{comment.likes.length}</span>

                                            {
                                                isAuth && <span>
                                                         <a onClick={onClickAnswerCommentary}
                                                            className="text-secondary comment-action ml-4">
                                                             Ответить
                                                         </a>
                                                      </span>
                                            }

                                            {
                                                (isAuth && comment.authorId === (currentUserData && currentUserData.id) || AuthService.isAdmin()) && !comment.isDeleted
                                                && <span className="ml-3">
                                                         <a onClick={onClickEditCommentary}
                                                            className="text-secondary comment-action">
                                                             Редактировать
                                                         </a>
                                                   </span>
                                            }

                                            {
                                                (isAuth && comment.authorId === (currentUserData && currentUserData.id) || AuthService.isAdmin()) && !comment.isDeleted
                                                && <span className="ml-3">
                                                          <Popup trigger={<a className="text-secondary comment-action">Удалить</a>}
                                                                 position="top center"
                                                                 open={isOpenPopup}
                                                                 onOpen={() => setIsOpenPopup(true)}
                                                                 arrowStyle={{
                                                                     backgroundColor: "transparent",
                                                                     border: "none"
                                                                 }}
                                                                 contentStyle={{
                                                                     backgroundColor: "#f4f4f4",
                                                                     border: "none",
                                                                     borderRadius: "5px"
                                                                 }}>
                                                          <div>
                                                              <div className="text-center text-dark">Вы уверены?</div>
                                                              <a onClick={onDeleteCommentary}
                                                                 className="text-secondary comment-action ml-5">Удалить</a>
                                                              <a onClick={() => setIsOpenPopup(false)}
                                                                 className="text-secondary comment-action ml-4">
                                                                  Отменить
                                                              </a>
                                                          </div>
                                                          </Popup>
                                                      </span>
                                            }

                                            {
                                                isAnswerMode && commentAnswerParentId === comment.id
                                                && <div className="mb-3">
                                                       <textarea className="form-control text-area mt-2 answer-area"
                                                                 rows={3}
                                                                 onChange={e => setCommentAnswerText(e.target.value)}
                                                                 value={commentAnswerText}
                                                                 defaultValue={commentAnswerText}
                                                                 onKeyUp={e => {
                                                                     // @ts-ignore
                                                                     e.target.style.height = "1px";
                                                                     // @ts-ignore
                                                                     e.target.style.height = (20 + e.target.scrollHeight) + "px";
                                                                 }}
                                                       />
                                                    <div className="mt-2">
                                                          <span>
                                                              <a onClick={onAddCommentary}
                                                                 className="text-secondary comment-action ml-4 answer-area">Отправить</a>
                                                          </span>
                                                        <span>
                                                              <a onClick={() => setIsAnswerMode(false)}
                                                                 className="text-secondary comment-action ml-4">
                                                                  Отменить
                                                              </a>
                                                          </span>
                                                    </div>
                                                </div>
                                            }

                                        </span>
                                </div>
                            </div>
                    }

                </div>
            </div>

            {
                comment.replyComments.length > 0
                && comment.replyComments.map(commentItem => {
                    return <div className="ml-5" key={commentItem.id}>
                        <CommentItem comment={commentItem}
                                     isAuth={isAuth}
                                     currentUserData={currentUserData}
                                     likeCommentary={likeCommentary}
                                     updateCommentary={updateCommentary}
                                     addCommentary={addCommentary}
                                     deleteCommentary={deleteCommentary}/>
                    </div>
                })
            }

        </div>
    )

}

export default CommentItem