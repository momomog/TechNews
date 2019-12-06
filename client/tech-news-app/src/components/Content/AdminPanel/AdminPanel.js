import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

class AdminPanel extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            delPostNum: '',
            editPostNum: '',
            openModal: false
        }
    }

    handleOpenModal = () => {
        let postId = this.state.delPostNum;
        if (postId && !(postId.toString().indexOf('.') > 0))
            this.setState({openModal: true})
    };

    handleCloseModal = () => {
        this.setState({openModal: false})
    };

    onFieldsChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onDeletePost = () => {
        this.props.deletePostById(this.state.delPostNum);
        this.setState({openModal: false});
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-11 center-block ">
                    <div className="panel panel-default">
                        <div className="panel-heading"><h4>Панель администратора</h4></div>
                        <div className="panel-body">
                            <div className="box box-info">
                                <div className="box-body">
                                    <div className="col-sm-2"/>
                                    <h5 className="card-header w-100">Управление постами</h5>
                                    <div className="row">
                                        <div className="col-3 mt-4">
                                            <span className="pl-4">Добавить новый</span>
                                        </div>
                                        <div className="col-9 mt-3">
                                            <NavLink to="/new-post">
                                                <button type="button" className="btn btn-success">
                                                    Добавить
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-1 mt-3">
                                            <span className="pl-4">Удалить</span>
                                        </div>
                                        <div className="col-2 mt-2">
                                            <input type="number" className="admin-post-input ml-3 pull-right"
                                                   name="delPostNum"
                                                   placeholder="ID поста" onChange={this.onFieldsChange}/>
                                        </div>
                                        <div className="col-9 mt-1">
                                            <button type="button" className="btn btn-danger"
                                                    onClick={this.handleOpenModal}>
                                                Удалить
                                            </button>
                                        </div>
                                    </div>

                                    {/*<div className="row">*/}
                                    {/*    <div className="col-1 mt-3">*/}
                                    {/*        <span className="pl-4">Редактировать</span>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="col-2 mt-2">*/}
                                    {/*        <input type="number" className="admin-post-input ml-3 pull-right"*/}
                                    {/*               name="editPostNum"*/}
                                    {/*               placeholder="ID поста" onChange={this.onFieldsChange}/>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="col-9 mt-1">*/}
                                    {/*        <NavLink to={'/edit'}>*/}
                                    {/*            <button type="button" className="btn btn-primary">*/}
                                    {/*                Редактировать*/}
                                    {/*            </button>*/}
                                    {/*        </NavLink>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    <Dialog
                                        open={this.state.openModal}
                                        onClose={this.handleCloseModal}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description">
                                        <DialogTitle id="alert-dialog-title">
                                            {'Удалить пост #' + this.state.delPostNum}
                                        </DialogTitle>
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
                </div>
            </div>
        )
    }


}

export default AdminPanel;