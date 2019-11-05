<%@ page import="ru.ibs.intern.traineeship.common.Const" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!doctype html>
<html>
<head>
    <title>Стажировка</title>
</head>
<body>

<jsp:include page="common/header.jsp"/>

<div class="container mt-3">
    <div class="mb-3">
        <div class="text-center">
            <h5>
                Это главная страница
            </h5>
            <h6>
                Немного позже здесь будет много полезной информации, а пока только картинка
            </h6>
        </div>
    </div>
    <div class="mb-3">
        <div class="text-center">
            <img class="mb-1 mr-auto ml-auto" src="<spring:url value="/resources/images/public/index_picture.jpg"/>" alt="ibs_logo"
                 width="500" height="350">
        </div>
    </div>
</div>

<jsp:include page="common/footer.jsp"/>

</body>
</html>
