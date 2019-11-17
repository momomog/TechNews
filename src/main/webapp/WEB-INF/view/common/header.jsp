<%@ page import="ru.technews.common.Const" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>

<!doctype html>
<html>
<head>
    <title>Стажировка</title>
    <link href="<spring:url value="/resources/css/libraries/bootstrap.min.css"/>" rel="stylesheet"/>
    <link href="<spring:url value="/resources/css/styles.css"/>" rel="stylesheet"/>
    <link href="<spring:url value="/resources/css/libraries/fontawesome-5.10.1/css/all.css"/>" rel="stylesheet"/>

    <script src="<spring:url value="/resources/js/libraries/jquery-3.3.1.slim.min.js"/>"></script>
    <script src="<spring:url value="/resources/js/libraries/popper.min.js"/>"></script>
    <script src="<spring:url value="/resources/js/libraries/bootstrap.min.js"/>"></script>
</head>
<body>
<div class=" align-items-center p-2 px-md-4 mb-2 bg-white border-bottom box-shadow">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="<%=Const.INDEX_URL%>">
            <img class="logo" src="<spring:url value="/resources/images/public/ibs_logo.jpg"/>" alt="ibs_logo">
            <span>Стажировка</span>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav d-flex mr-auto text-center align-items-center">

                <security:authorize access="isAuthenticated()">
                    <li class="nav-item active">
                        <a class="nav-link line" href="<%=Const.PROFILE_URL%>">Профиль</a>
                    </li>
                </security:authorize>

                <security:authorize access="hasRole('ROLE_INTERN')">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Список задач</a>
                    </li>
                </security:authorize>

                <security:authorize access="hasRole('ROLE_HR')">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Список менторов</a>
                    </li>
                </security:authorize>

                <security:authorize access="hasRole('ROLE_INTERN') || hasRole('ROLE_MENTOR')">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Список компетенций</a>
                    </li>
                </security:authorize>

                <security:authorize access="hasRole('ROLE_INTERN')">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Список ресурсов</a>
                    </li>
                </security:authorize>

                <security:authorize access="hasRole('ROLE_MENTOR')">
                    <li class="nav-item">
                        <a class="nav-link" href="#">План обучения</a>
                    </li>
                </security:authorize>

                <security:authorize access="hasRole('ROLE_HR')">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Планы обучения</a>
                    </li>
                </security:authorize>

                <security:authorize access="hasRole('ROLE_MENTOR') || hasRole('ROLE_HR')">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Список компетенций по грейдам</a>
                    </li>
                </security:authorize>

                <security:authorize access="hasRole('ROLE_HR')">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Список компетенций</a>
                    </li>
                </security:authorize>

                <security:authorize access="isAuthenticated()">
                    <li class="nav-item">
                        <a class="nav-link lh-1" href="#">Цели стажерской программы</a>
                    </li>
                </security:authorize>

            </ul>
            <security:authorize access="isAuthenticated()">
                <a class="btn btn-primary" href="<c:url value="/perform_logout" />">Выйти</a>
            </security:authorize>

            <security:authorize access="isAnonymous()">
                <a class="btn btn-primary ml-auto mr-0" href="<c:url value="/login.html" />">Войти</a>
            </security:authorize>
        </div>
    </nav>
</div>
</body>
</html>