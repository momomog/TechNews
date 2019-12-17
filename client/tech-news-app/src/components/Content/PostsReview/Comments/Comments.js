import React from "react";
import Comment from "./Comment/Comment";
import Common from "../../../../common/Common";

function Comments(props) {

    function changeInputCommentText(e) {
        props.changeCommentText(e.target.value);
    }

    function addNewCommentary() {
        if (props.commentText.trim()) {
            props.addNewCommentary();
        }
    }

    return (
        <div>
            {
                props.isAuth
                    ? <div className="my-4">
                        <h5 className="card-header">Оставьте свой комментарий:</h5>
                        <div className="card-body comment-input">
                            <form>
                                <div className="form-group">
                                    <textarea className="form-control text-area" rows="3"
                                              placeholder="Введите текст комментария..."
                                              onChange={changeInputCommentText}
                                              value={props.commentText}
                                              onKeyPress={event => {
                                                  if (event.key === 'Enter') {
                                                      event.preventDefault();
                                                      addNewCommentary();
                                                  }
                                              }}/>
                                </div>
                                <button type="submit" className="btn btn-primary"
                                        disabled={!props.commentText} onClick={addNewCommentary}>
                                    Отправить
                                </button>
                            </form>
                        </div>
                    </div>

                    : <div className="my-4 mb-5">
                         <h4 className="card-header">Войдите на сайт для возможности оставлять комментарии!</h4>
                      </div>
            }

            <h5 className="card-header mb-4">{props.commentsCount + ' ' + Common.getCommentaryCountText(props.comments.length)}</h5>
            {
                props.comments.length > 0
                    ? props.comments.map((comment) => {
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
    )
}

export default Comments;