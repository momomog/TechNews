<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!doctype html>
<html>
<head>
    <title>Авторизация</title>

<%--    <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet"--%>
<%--          id="bootstrap-css">--%>
    <script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">

<%--    <link href="<spring:url value="/resources/css/libraries/bootstrap.min.css"/>" rel="stylesheet"/>--%>
    <link href="<spring:url value="/resources/css/styles.css"/>" rel="stylesheet"/>
    <link href="<spring:url value="/resources/css/libraries/fontawesome-5.10.1/css/all.css"/>" rel="stylesheet"/>

    <script src="<spring:url value="/resources/js/libraries/jquery-3.3.1.slim.min.js"/>"></script>
    <script src="<spring:url value="/resources/js/libraries/popper.min.js"/>"></script>
    <script src="<spring:url value="/resources/js/libraries/bootstrap.min.js"/>"></script>
</head>
<body>

<div class="container">
    <div class="row">
        <div class="span12">
            <div class="head">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span6"><h1 class="muted">Tech-news</h1></div>
                        <div class="span4 offset2 auth-button">
                            <a class="btn btn-info pull-right" href="http://localhost:8080/login">Войти</a>
                            <a class="btn btn-info pull-right" href="http://localhost:8080/registration">Регистрация</a>
                        </div>
                    </div>
                </div>
                <div class="navbar">
                    <div class="navbar-inner">
                        <div class="container">
                            <ul class="nav">
                                <li><a href="#">Все новости</a></li>
                                <li><a href="#">Смартфоны</a></li>
                                <li><a href="#">Ноутбуки</a></li>
                                <li><a href="#">Компьютерное железо</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="login-box justify-content-center">
            <div class="login-logo">
                <a href="http://ichef-1.bbci.co.uk/news/660/cpsprodpb/17A21/production/_85310869_85310700.jpg"><img src="https://www.google.com/images/icons/material/product/1x/analytics_64dp.png" alt="My Ad Cubes"></a>
            </div>
            <div class="login-box-body">
                <p class="login-box-msg">Sign in to start your session</p>
                <form action="http://myadcubes.com/index.php/user/auth/login" method="post" accept-charset="utf-8">        <div class="form-group has-feedback">
                    <input type="text" name="login" value="" placeholder="Username" class="form-control" id="login" maxlength="80" size="30">            <span class="glyphicon glyphicon-user form-control-feedback"></span>
                    <span><font color="red"></font></span>
                </div>
                    <div class="form-group has-feedback">
                        <input type="password" name="password" value="" placeholder="Password" class="form-control" id="password" size="30">            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                        <span><font color="red"></font></span>
                    </div>
                    <div class="row">
                        <div class="col-xs-8">
                            <div class="checkbox icheck">
                                <label>
                                    <div class="icheckbox_square-blue" aria-checked="false" aria-disabled="false" style="position: relative;">
                                        <input type="checkbox" name="remember" value="" id="remember" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"
                                        ><ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins>
                                    </div> <label for="remember" class="">Remember me</label>
                                </label>
                            </div>
                        </div><!-- /.col -->
                        <div class="col-xs-4">
                            <input type="submit" name="submit" value="Sign In" id="submit" class="btn btn-primary btn-block btn-flat">            </div><!-- /.col -->
                    </div>
                </form>        <a href="http://myadcubes.com/user/auth/forgot_password">I forgot my password</a><br>
                <a href="http://myadcubes.com/user/auth/register/" class="text-center">Register a new membership</a>
            </div>
        </div>
    </div>
</div>



<script>
    // Затирание errorCode при нажатии на произвольное место после неудачной авторизации
    $('body').click(function () {
        if ($("#errorCode").text()) {
            $("#errorCode").text("");
        }
    });
</script>

</body>
</html>
