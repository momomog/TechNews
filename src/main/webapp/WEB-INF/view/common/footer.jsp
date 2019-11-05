<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

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
<div class="container mw-50">
        <footer class="pt-2 my-md-3 pt-md-3 border-top">
            <div class="row">
                <div class="col-sm-1"></div>
                <div class="col-sm-4">
                    <div class="footer-company-name">IBS Group</div>
                    <small class="d-block mb-3 text-muted">© 2019</small>
                </div>
                <div class="col-sm-4">
                    <h5>Решения и продукты</h5>
                    <ul class="list-unstyled text-small">
                        <li><a class="text-muted" href="#">Все продукты на одной странице</a></li>
                        <li><a class="text-muted" href="#">Бизнес-приложения</a></li>
                        <li><a class="text-muted" href="#">ИТ-инфраструктура</a></li>
                        <li><a class="text-muted" href="#">Управление данными</a></li>
                        <li><a class="text-muted" href="#">Цифровое государство</a></li>
                        <li><a class="text-muted" href="#">Информационная безопасность</a></li>
                    </ul>
                </div>
                <div class="col-sm-3">
                    <h5>О компании</h5>
                    <ul class="list-unstyled text-small">
                        <li><a class="text-muted" href="#">Контакты</a></li>
                        <li><a class="text-muted" href="#">Вакансии</a></li>
                        <li><a class="text-muted" href="#">Основная информация</a></li>
                    </ul>
                </div>
            </div>
        </footer>
</div>
</body>
<html/>
