import React from "react";
import {NavLink} from "react-router-dom";

function Authorization() {

    return (
        <div className="container">
            <div id="loginbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 mt-5">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">Войти</div>
                    </div>

                    <div className="panel-body pt-5">
                        <form id="loginform" className="form-horizontal" role="form">
                            <div className="input-group mb-3">
                                <span className="input-group-addon">
                                    <i className="glyphicon glyphicon-user"></i>
                                </span>
                                <input id="login-username" type="text" className="input-group-form" name="username"
                                       value="" placeholder="имя пользователя или почта"/>
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-addon">
                                    <i className="glyphicon glyphicon-lock"></i>
                                </span>
                                <input id="login-password" type="password" className="input-group-form" name="password"
                                       placeholder="пароль"/>
                            </div>

                            <div className="input-group">
                                <div className="checkbox input-group-checkbox mt-2">
                                    <label>
                                        <input id="login-remember" type="checkbox" name="remember" value="1"/>
                                        Запомнить
                                    </label>
                                </div>
                            </div>

                            <div className="form-group mt-2">
                                <div className="col-sm-12">
                                    <a id="btn-login" href="#" className="btn btn-success">Войти</a>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-md-12 control">
                                    <div className="border-top pt-3">
                                        Не имеете аккаунт?
                                        <NavLink to="/registration" className="navlink reg"> Зарегистрироваться</NavLink>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*<div id="signupbox" style="display:none; margin-top:50px"*/}
            {/*     className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">*/}
            {/*    <div className="panel panel-info">*/}
            {/*        <div className="panel-heading">*/}
            {/*            <div className="panel-title">Sign Up</div>*/}
            {/*            <div style="float:right; font-size: 85%; position: relative; top:-10px"><a id="signinlink"*/}
            {/*                                                                                       href="#"*/}
            {/*                                                                                       onClick="$('#signupbox').hide(); $('#loginbox').show()">Sign*/}
            {/*                In</a></div>*/}
            {/*        </div>*/}
            {/*        <div className="panel-body">*/}
            {/*            <form id="signupform" className="form-horizontal" role="form">*/}

            {/*                <div id="signupalert" style="display:none" className="alert alert-danger">*/}
            {/*                    <p>Error:</p>*/}
            {/*                    <span></span>*/}
            {/*                </div>*/}


            {/*                <div className="form-group">*/}
            {/*                    <label htmlFor="email" className="col-md-3 control-label">Email</label>*/}
            {/*                    <div className="col-md-9">*/}
            {/*                        <input type="text" className="form-control" name="email"*/}
            {/*                               placeholder="Email Address">*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="form-group">*/}
            {/*                    <label htmlFor="firstname" className="col-md-3 control-label">First Name</label>*/}
            {/*                    <div className="col-md-9">*/}
            {/*                        <input type="text" className="form-control" name="firstname"*/}
            {/*                               placeholder="First Name">*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="form-group">*/}
            {/*                    <label htmlFor="lastname" className="col-md-3 control-label">Last Name</label>*/}
            {/*                    <div className="col-md-9">*/}
            {/*                        <input type="text" className="form-control" name="lastname" placeholder="Last Name">*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="form-group">*/}
            {/*                    <label htmlFor="password" className="col-md-3 control-label">Password</label>*/}
            {/*                    <div className="col-md-9">*/}
            {/*                        <input type="password" className="form-control" name="passwd"*/}
            {/*                               placeholder="Password">*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="form-group">*/}
            {/*                    <label htmlFor="icode" className="col-md-3 control-label">Invitation Code</label>*/}
            {/*                    <div className="col-md-9">*/}
            {/*                        <input type="text" className="form-control" name="icode" placeholder="">*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="form-group">*/}
            {/*                    <!-- Button -->*/}
            {/*                    <div className="col-md-offset-3 col-md-9">*/}
            {/*                        <button id="btn-signup" type="button" className="btn btn-info"><i*/}
            {/*                            className="icon-hand-right"></i> &nbsp Sign Up*/}
            {/*                        </button>*/}
            {/*                        <span style="margin-left:8px;">or</span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div style="border-top: 1px solid #999; padding-top:20px" className="form-group">*/}

            {/*                    <div className="col-md-offset-3 col-md-9">*/}
            {/*                        <button id="btn-fbsignup" type="button" className="btn btn-primary"><i*/}
            {/*                            className="icon-facebook"></i> Sign Up with Facebook*/}
            {/*                        </button>*/}
            {/*                    </div>*/}

            {/*                </div>*/}


            {/*            </form>*/}
            {/*        </div>*/}
            {/*    </div>*/}


            {/*</div>*/}
        </div>


    )
}

export default Authorization;

