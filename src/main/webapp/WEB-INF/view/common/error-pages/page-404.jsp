<%@ page import="ru.technews.common.Const" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<!doctype html>
<html>
<head>
    <title>Страница не найдена</title>
    <link href="<spring:url value="/resources/css/libraries/bootstrap.min.css"/>" rel="stylesheet"/>
    <link href="<spring:url value="/resources/css/styles.css"/>" rel="stylesheet"/>
</head>
<body>

<div class="d-flex flex-row align-items-center mt-15">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 text-center">
                <span class="display-1 d-block">404</span>
                <div class="mb-3 lead">Запрашиваемая страница не найдена</div>
                <a href="<%=Const.INDEX_URL%>" class="btn btn-link text-decoration-none">На главную страницу</a>
            </div>
        </div>
    </div>
</div>

</body>
</html>
