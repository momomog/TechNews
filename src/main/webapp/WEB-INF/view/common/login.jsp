<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!doctype html>
<html>
<head>
    <title>Авторизация</title>

    <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet"
          id="bootstrap-css">
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
<%--                        <div class="span4 offset2 auth-button">--%>
<%--                            <a class="btn btn-info pull-right" href="http://localhost:8080/login">Войти</a>--%>
<%--                            <a class="btn btn-info pull-right" href="http://localhost:8080/registration">Регистрация</a>--%>
<%--                        </div>--%>
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
                <div class="row justify-content-sm-center mb-10">
                    <div class="card">
                        <article class="card-body">
                            <h3 class="card-title text-center mb-4 mt-1">Вход</h3>
                            <hr>
                            <p class="text-success text-center">Для продолжения введите учетные данные профиля</p>
                            <form action="perform_login" method="post" name='f'>
                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                                        </div>
                                        <%-- input type="email"!! для упрощения ввода пока text --%>
                                        <input type="text" name="username" class="form-control" placeholder="Почта">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                                        </div>
                                        <input type="password" name="password" class="form-control" placeholder="********">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary btn-block">Войти</button>
                                </div>
                            </form>
                            <p id="errorCode" class="text-danger text-center">








                            </p>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<%--<div class="container mt-7">--%>
<%--    <div class="row justify-content-sm-center mb-10">--%>
<%--        <div class="card">--%>
<%--            <article class="card-body">--%>
<%--                <h3 class="card-title text-center mb-4 mt-1">Вход</h3>--%>
<%--                <hr>--%>
<%--                <p class="text-success text-center">Для продолжения введите учетные данные профиля</p>--%>
<%--                <form action="perform_login" method="post" name='f'>--%>
<%--                    <div class="form-group">--%>
<%--                        <div class="input-group">--%>
<%--                            <div class="input-group-prepend">--%>
<%--                                <span class="input-group-text"> <i class="fa fa-user"></i> </span>--%>
<%--                            </div>--%>
<%--                            &lt;%&ndash; input type="email"!! для упрощения ввода пока text &ndash;%&gt;--%>
<%--                            <input type="text" name="username" class="form-control" placeholder="Почта">--%>
<%--                        </div>--%>
<%--                    </div>--%>
<%--                    <div class="form-group">--%>
<%--                        <div class="input-group">--%>
<%--                            <div class="input-group-prepend">--%>
<%--                                <span class="input-group-text"> <i class="fa fa-lock"></i> </span>--%>
<%--                            </div>--%>
<%--                            <input type="password" name="password" class="form-control" placeholder="********">--%>
<%--                        </div>--%>
<%--                    </div>--%>
<%--                    <div class="form-group">--%>
<%--                        <button type="submit" class="btn btn-primary btn-block">Войти</button>--%>
<%--                    </div>--%>
<%--                </form>--%>
<%--                <p id="errorCode" class="text-danger text-center">--%>
<%--                    <%--%>
<%--                        String authStatus = (String) request.getSession().getAttribute("errorStatus");--%>
<%--                        if (authStatus != null && authStatus.equals("Bad credentials")) {--%>
<%--                            out.println("Не удалось войти.");--%>
<%--                            out.println("<br>");--%>
<%--                            out.println("Проверьте правильность введенных данных");--%>
<%--                        }--%>
<%--                    %>--%>
<%--                </p>--%>
<%--            </article>--%>
<%--        </div>--%>
<%--    </div>--%>
<%--</div>--%>


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
