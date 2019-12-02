import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PostAdminPanel extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            openModal: false
        }
    }

    handleOpenModal = () => {
        this.setState({openModal: true})
    };

    handleCloseModal = () => {
        this.setState({openModal: false})
    };

    onDeletePost = () => {
        this.props.deletePostById();
        this.setState({openModal: false});
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-11 center-block ">
                    <div className="panel panel-default">
                        <div className="panel-heading border-bottom-0">
                            <span className="post-author-comment">Панель управления постом</span>
                            <button type="button" className="btn btn-primary ml-3">Редактировать</button>
                            <button type="button" className="btn btn-danger ml-2"
                                    onClick={this.handleOpenModal}>Удалить
                            </button>

                            <Dialog
                                open={this.state.openModal}
                                onClose={this.handleCloseModal}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description">
                                <DialogTitle id="alert-dialog-title">{"Удалить пост"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Вы уверены? Это действие невозможно будет отменить
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleCloseModal} color="primary">
                                        Отмена
                                    </Button>
                                    <Button onClick={this.onDeletePost} color="primary" autoFocus>
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
}

export default PostAdminPanel;


