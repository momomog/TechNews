import React, {useState} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'

interface Props {
    deletePostById: (postId: number) => void
    updatePosts: (day: string, month: string, postNum: number) => void
}

/**
 * Панель администратора
 */
const AdminPanel: React.FC<Props> = ({deletePostById , updatePosts}) => {
    const [delPostId, setDelPostId] = useState<number>(0)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [day, setDay] = useState<string>(new Date().getDate().toString())
    const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString())
    const [postNum, setPostNum] = useState<string>('')

    const handleOpenModal = () => {
        if (delPostId && !(String(delPostId).indexOf('.') > 0))
            setOpenModal(true)
    }

    const handleCloseModal = () => setOpenModal(false)

    const onDeletePost = () => {
        deletePostById(delPostId)
        setOpenModal(false)
    }

    const onLoadPostsFromOuterSrc = () => {
        updatePosts(day, month, +postNum)
    }

    return (
        <div className="row">
            <div className="col-md-11 center-block ">
                <div className="panel panel-default">
                    <div className="panel-heading"><h4>Панель администратора</h4></div>
                    <div className="panel-body">
                        <div className="box box-info">
                            <div className="box-body">
                                <h5 className="card-header w-100">Управление постами</h5>

                                <div className="row p-3">
                                    <div className="col-sm-2 mt-3">
                                        <span>Добавить новый</span>
                                    </div>
                                    <div className="col-sm-10">
                                        <NavLink to="/new-post">
                                            <button type="button" className="btn btn-success mt-2">
                                                Добавить
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>

                                <hr className="mt-1 mb-1"/>

                                <div className="row p-3">
                                    <div className="col-sm-1 mt-2">
                                        <span>Удалить</span>
                                    </div>
                                    <div className="col-sm-2">
                                        <input type="number"
                                               className="admin-post-input"
                                               name="delPostNum" min="0"
                                               placeholder="ID поста"
                                               onChange={e => setDelPostId(+e.target.value)}/>
                                    </div>
                                    <div className="col-sm-9">
                                        <button type="button" className="btn btn-danger"
                                                onClick={handleOpenModal}>
                                            Удалить
                                        </button>
                                    </div>
                                </div>

                                <hr className="mt-1 mb-1"/>

                                <div className="row p-3">
                                    <div className="col-sm-3 mt-3">
                                        <span>Обновить список постов</span>
                                    </div>
                                    <div className="col-sm-2">
                                        <input className="admin-post-input mt-2"
                                               placeholder="День"
                                               onChange={e => setDay((e.target as HTMLInputElement).value)}
                                               value={day}
                                        />
                                    </div>
                                    <div className="col-sm-1">
                                        <input className="admin-post-input mt-2"
                                               placeholder="Месяц"
                                               onChange={e => setMonth((e.target as HTMLInputElement).value)}
                                               value={month}
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <input className="admin-post-input mt-2"
                                               type="number"
                                               placeholder="Номер поста"
                                               onChange={e => setPostNum((e.target as HTMLInputElement).value)}
                                               value={postNum}
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                        <button type="button"
                                                onClick={onLoadPostsFromOuterSrc}
                                                disabled={!day && !month && !postNum}
                                                className="btn btn-success mt-1 mr-2">
                                            Обновить
                                        </button>
                                        {/*<button type="button"*/}
                                        {/*        className="btn btn-primary mt-1">*/}
                                        {/*    Остановить*/}
                                        {/*</button>*/}
                                    </div>
                                </div>


                                <Dialog open={openModal}
                                        onClose={handleCloseModal}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description">

                                    <DialogTitle id="alert-dialog-title">
                                        Удалить пост №{delPostId}
                                    </DialogTitle>

                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Вы уверены? Это действие невозможно будет отменить
                                        </DialogContentText>
                                    </DialogContent>

                                    <DialogActions>
                                        <Button onClick={handleCloseModal} color="primary">
                                            Отмена
                                        </Button>
                                        <Button onClick={onDeletePost} color="primary">
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

export default AdminPanel