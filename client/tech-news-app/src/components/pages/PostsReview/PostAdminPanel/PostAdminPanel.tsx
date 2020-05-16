import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {NavLink} from "react-router-dom";

interface Props {
    postId: number
    onDeletePost: () => void
}

/**
 *
 * @param postId
 * @param onDeletePost
 * Панель управления постом
 */
const PostAdminPanel: React.FC<Props> = ({postId, onDeletePost}) => {
    const [openModal, setOpenModal] = useState(false)

    const triggerModal = () => setOpenModal(!openModal)

    const onDeletePostClick = () => {
        onDeletePost()
        setOpenModal(false)
    }

    return (
        <div className="row">
            <div className="col-md-11 center-block">
                <div className="panel panel-default">
                    <div className="panel-heading border-bottom-0">
                        <span className="post-author-comment">Панель управления постом</span>

                        <NavLink to={postId + '/edit'}>
                            <button type="button" className="btn btn-primary ml-3">
                                Редактировать
                            </button>
                        </NavLink>
                        <button type="button" className="btn btn-danger ml-2" onClick={triggerModal}>
                            Удалить
                        </button>

                        <Dialog
                            open={openModal}
                            onClose={triggerModal}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">{"Удалить пост"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Вы уверены? Это действие невозможно будет отменить
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={triggerModal} color="primary">
                                    Отмена
                                </Button>
                                <Button onClick={onDeletePostClick} color="primary">
                                    Удалить
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostAdminPanel


