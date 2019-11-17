import React from "react";
import Comment from "./Comment/Comment";

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
            <div className="my-4">
                <h5 className="card-header">Оставьте комментарий:</h5>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <textarea className="form-control" rows="3"
                                      placeholder="Введите текст комментария..."
                                      onChange={changeInputCommentText}
                                      onKeyPress={ event => {
                                          if (event.key === 'Enter') {
                                              event.preventDefault();
                                              addNewCommentary();
                                          }}}
                                      value={props.commentText}/>
                        </div>
                        <button type="submit" className="btn btn-primary"
                                disabled={!props.commentText}
                                onClick={addNewCommentary}>
                            Отправить
                        </button>
                    </form>
                </div>
            </div>

            {
                props.comments.length > 0
                    ? props.comments.map((comment) => {
                        return <Comment comment={comment}/>
                    })
                    : ''
            }
        </div>
    )
}

export default Comments;


// пример вложенного комментария
// <div className="media mb-4">
//     <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
//     <div className="media-body">
//         <h5 className="mt-0">Commenter Name</h5>
//         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
//         sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra
//         turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
//         felis in faucibus.
//         <div className="media mt-4">
//             <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
//             <div className="media-body">
//                 <h5 className="mt-0">Commenter Name</h5>
//                 Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
//                 sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra
//                 turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
//                 felis in faucibus.
//             </div>
//         </div>
//
//         <div className="media mt-4">
//             <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
//             <div className="media-body">
//                 <h5 className="mt-0">Commenter Name</h5>
//                 Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
//                 sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra
//                 turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
//                 felis in faucibus.
//             </div>
//         </div>
//     </div>
// </div>