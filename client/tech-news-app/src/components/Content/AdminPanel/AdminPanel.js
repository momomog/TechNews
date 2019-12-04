import React from "react";
import {NavLink} from "react-router-dom";

function AdminPanel() {
    return (
        <div>
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
                                            <div className="col-lg-4">
                                                <div className="pl-4">
                                                    <span>Добавить новый пост</span>
                                                    <input id="login-username" type="text" className="admin-post-input ml-3 mt-3"
                                                           name="usernameOrEmail"
                                                        // onChange={this.onLoginFieldsChange}
                                                           placeholder="ID поста"
                                                           required/>

                                                </div>

                                                <div className="pl-4">
                                                    <span>Удалить пост</span>
                                                    <input id="login-username" type="text" className="admin-post-input ml-3 mt-3"
                                                           name="usernameOrEmail"
                                                        // onChange={this.onLoginFieldsChange}
                                                           placeholder="ID поста"
                                                           required/>
                                                    <NavLink to={'/edit'}>
                                                        <button type="button" className="btn btn-success ml-3">Добавить</button>
                                                    </NavLink>
                                                </div>

                                                <div className="pl-4">
                                                    <span>Редактировать пост</span>
                                                    <input id="login-username" type="text" className="admin-post-input ml-3 mt-3"
                                                           name="usernameOrEmail"
                                                        // onChange={this.onLoginFieldsChange}
                                                           placeholder="ID поста"
                                                           required/>
                                                    <NavLink to={'/edit'}>
                                                        <button type="button" className="btn btn-success ml-3">Добавить</button>
                                                    </NavLink>
                                                </div>

                                            </div>
                                            <div className="col-lg-8">
                                                <NavLink to={'/edit'}>
                                                    <button type="button" className="btn btn-success ml-3">Добавить</button>
                                                </NavLink>
                                            </div>

                                        </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AdminPanel;