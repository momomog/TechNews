import React from "react";

import Common from "../../../../../common/Common";
import {NavLink} from "react-router-dom";
import {API_BASE_URL} from "../../../../../api/BaseRequest";
import Popup from "reactjs-popup";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            isAnswerMode: false,
            commentId: '',
            commentEditText: '',
            commentAnswerParentId: '',
            commentAnswerText: ''
        };
    }

    like = () => {
        this.props.likeCommentary(this.props.comment.id);
    };

    deleteCommentary = () => {
        this.props.deleteCommentary(this.props.comment.id);
    };

    updateCommentary = () => {
        this.props.updateCommentary(this.props.comment.id, this.state.commentEditText);
        this.setState({isEditMode: false})
    };

    changeInputCommentText = (e) => {
        this.setState({commentEditText: e.target.value});
    };


    onClickEditCommentary = (e) => {
        this.setState({
            isEditMode: true,
            commentId: this.props.comment.id,
            commentEditText: this.props.comment.commentText
        });
    };

    onClickAnswerCommentary = (e) => {
        this.setState({
            isAnswerMode: true,
            commentAnswerParentId: this.props.comment.id,
            commentEditText: this.props.comment.authorName + ', '
        });
    };

    render() {
        const {id, authorName, authorId, date, commentText, likes, replyComments} = this.props.comment;

        return (
            <div>
                <div className="media card-body">
                    <NavLink to={'/profile/' + authorName}>
                        <img className="d-flex mr-3 rounded-circle comment-author-photo"
                             src={API_BASE_URL + `/user/photo?id=${authorId}`} alt=""/>
                    </NavLink>
                    <div className="media-body">
                        <div className="row">
                        <span className="col-lg-8 post-author-comment font-italic">
                            <NavLink to={'/profile/' + authorName} className="comment-author-link">
                                @{authorName}
                            </NavLink>
                        </span>
                            <span className="col-lg-4 text-right text-secondary">
                            {Common.dateTimeParser(date)}
                        </span>
                        </div>

                        {
                            this.state.isEditMode && this.state.commentId === id
                            ? <div>
                                    <textarea className="form-control text-area mt-2" rows="3"
                                              onChange={this.changeInputCommentText}
                                              onKeyUp={(e) => {
                                                  e.target.style.height = "1px";
                                                  e.target.style.height = (20 + e.target.scrollHeight) + "px";
                                              }}
                                              value={this.state.commentEditText}
                                              onKeyPress={event => {
                                                  if (event.key === 'Enter') {
                                                      event.preventDefault();
                                                      this.updateCommentary();
                                                  }
                                              }}
                                    />
                                    <span>
                                        <a className="text-secondary reg" onClick={this.updateCommentary}>Сохранить</a>
                                        <a className="text-secondary reg ml-4" onClick={() => {this.setState({isEditMode: false})}}>Отменить</a>
                                    </span>
                              </div>
                            : <div>
                                  <div className="mt-1 mb-3" align="justify">
                                      {commentText}
                                  </div>
                                    <div className="row">
                                        <span className="col-lg-7">
                                        <i id='like' className="fa fa-heart comment-icon mr-2 ml-1"
                                           onClick={this.like}/>
                                        <span className="comment-count">{likes.length}</span>

                                            {
                                                this.props.isAuth
                                                    ? <span>
                                                        <a onClick={this.onClickAnswerCommentary} className="text-secondary reg ml-4">Ответить</a>
                                                    </span>
                                                    : ''
                                            }

                                            {
                                                this.props.isAuth && authorId === this.props.currentUserData.id || Common.isUserAdmin()
                                                    ? <span className="ml-3">
                                                        <a onClick={this.onClickEditCommentary} className="text-secondary reg">Редактировать</a>
                                                    </span>
                                                    : ''
                                            }

                                            {
                                                this.props.isAuth && authorId === this.props.currentUserData.id || Common.isUserAdmin()
                                                    ? <span className="ml-3">
                                                    <Popup trigger={<a className="text-secondary reg">Удалить</a>}
                                                           position="top center"
                                                           open={this.state.isOpenPopup}
                                                           onOpen={() => {this.setState({isOpenPopup: true})}}
                                                           arrowStyle={{backgroundColor: "transparent", border: "none"}}
                                                           contentStyle={{backgroundColor: "#f4f4f4", border: "none", borderRadius: "5px"}}>
                                                        <div>
                                                            <div className="text-center text-dark">Вы уверены?</div>
                                                            <a onClick={this.deleteCommentary} className="text-secondary reg ml-5">Удалить</a>
                                                            <a onClick={() => {this.setState({isOpenPopup: false})}} className="text-secondary reg ml-4">Отменить</a>
                                                        </div>
                                                    </Popup>

                                                      </span>
                                                    : ''
                                            }

                                        </span>
                                    </div>
                                </div>
                        }




                    </div>
                </div>

                {
                    id === this.props.lastCommentId ? '' : <div className="border-bottom"/>
                }

                {
                    replyComments && replyComments.length > 0 ?
                        replyComments.map((comment) => {
                            debugger;
                        return <div className="ml-5">
                            <Comment comment={comment}
                                // lastCommentId={props.comments[props.comments.length - 1].id}
                                     isAuth={this.props.isAuth}
                                     currentUserData={this.props.currentUserData}
                                     likeCommentary={this.props.likeCommentary}
                                     updateCommentary={this.props.updateCommentary}
                                     deleteCommentary={this.props.deleteCommentary}
                                     key={comment.id} />
                        </div>
                    })
                    : ''
                }

            </div>
        )
    }


}

export default Comment;