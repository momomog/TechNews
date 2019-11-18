import React from 'react';
import {NavLink} from "react-router-dom";
import { Layout, notification } from 'antd';

class AuthButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'Polling App',
            description: description,
        });
    }

    handleLogin() {
        notification.success({
            message: 'Polling App',
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <NavLink className="btn btn-info pull-right sing-in-button"
                         to="http://localhost:8080/login">Войти
                </NavLink>
                <NavLink className="btn btn-info pull-right"
                         to="http://localhost:8080/registration">Регистрация
                </NavLink>
            </div>
        );
    }
}

export default AuthButton;