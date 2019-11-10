<%@ page import="ru.technews.common.Const" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!doctype html>
<html>
<head>
    <title>Список профилей</title>
</head>
<body>

<jsp:include page="../common/header.jsp"/>

<table class="table table-striped mt-5 mb-4">
    <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Фото</th>
        <th scope="col">Имя</th>
        <th scope="col">Отчество</th>
        <th scope="col">Фамилия</th>
        <th scope="col">Тип</th>
        <th scope="col">Почта</th>
        <th scope="col">Skype</th>
        <th scope="col">Город</th>
        <th scope="col"></th>
    </tr>
    </thead>
    <tbody>

    <jsp:useBean id="profiles" scope="request" type="java.util.List"/>
    <c:forEach var="profile" varStatus="row" items="${profiles}">
        <tr>
            <th scope="row">${row.count}
            </th>
            <td id="profilePhoto">
                <a href="<%=Const.PROFILE_URL + "?id="%>${profile.id}">
                    <img src="<%=Const.PHOTO_PROFILE_URL + "?id="%>${profile.userAvatarId}"
                         width="40px" height="40px" alt="profile_image">
                </a>
            </td>
            <td>${profile.firstName}</td>
            <td>${profile.middleName}</td>
            <td>${profile.lastName}</td>
            <td>${profile.role}</td>
            <td>${profile.email}</td>
            <td>${profile.skype}</td>
            <td>${profile.location.name} (${profile.location.offset})</td>
            <td>
                <a href="<%=Const.PROFILE_URL + "/delete?id="%>${profile.id}" class="btn btn-outline-danger btn-sm"
                   data-toggle="deleteProfile" data-placement="top" title="Удалить">
                    <i class="fas fa-trash-alt"></i>
                </a>
            </td>
        </tr>
    </c:forEach>
    </tbody>
</table>

<jsp:include page="../common/footer.jsp"/>

<script>
    // показ tooltip'a для ссылки-иконки "удалить"
    $(function () {
        $('[data-toggle="deleteProfile"]').tooltip()
    });
</script>

</body>
</html>
