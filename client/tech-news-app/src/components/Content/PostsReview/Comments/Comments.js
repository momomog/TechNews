import React, {useState} from "react";
import Comment from "./Comment/Comment";
import Common from "../../../../common/Common";

function Comments(props) {
    const [commentText, setCommentText] = useState('');

    function addNewCommentary() {
        if (commentText.trim()) {
            props.addNewCommentary({commentText});
        }

        setCommentText(null)
    }

    return (
        <div>
            {
                props.isAuth
                    ? <div className="my-4">
                        <h5 className="card-header">Оставьте свой комментарий:</h5>
                        <div className="comment-input">
                            <div className="form-group">
                                    <textarea className="form-control text-area" rows="3"
                                              placeholder="Введите текст комментария..."
                                              onChange={e => setCommentText(e.target.value)}
                                              value={commentText}
                                              onKeyPress={e => {
                                                  if (e.key === 'Enter') {
                                                      e.preventDefault();
                                                      addNewCommentary();
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

            <h5 className="card-header mb-4">
                {`${props.commentsCount} ${Common.getCommentaryCountText(props.commentsCount)}`}
            </h5>

            <div className="coms-wrapper">
                {
                    props.comments.length > 0
                        ? props.comments.map(comment => {
                            return <Comment comment={comment}
                                            lastCommentId={props.comments[props.comments.length - 1].id}
                                            isAuth={props.isAuth}
                                            currentUserData={props.currentUserData}
                                            likeCommentary={props.likeCommentary}
                                            updateCommentary={props.updateCommentary}
                                            addCommentary={props.addNewCommentary}
                                            deleteCommentary={props.deleteCommentary}
                                            key={comment.id}/>
                        })
                        : <div className="ml-4">Ваш комментарий будет первым...</div>
                }
            </div>
        </div>
    )
}

export default Comments;