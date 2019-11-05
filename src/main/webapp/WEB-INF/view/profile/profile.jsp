<%@ page import="ru.ibs.intern.traineeship.common.Const" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!doctype html>
<html>
<head>
    <title>Профиль стажёра</title>
</head>
<body>

<jsp:include page="../common/header.jsp"/>
<jsp:useBean id="profile" scope="request" type="ru.ibs.intern.traineeship.entity.profile.UserProfileDataEntity"/>

<div class="container emp-profile mw-50">
    <div class="row">
        <div class="col-md-4">
            <div class="profile-img">
                <img src="<%=Const.PHOTO_PROFILE_URL + "?id=" + profile.getUserAvatarId()%>" alt="user_photo">
            </div>
        </div>
        <div class="col-md-6">
            <div class="profile-head">
                <h3>
                    ${profile.firstName} ${profile.lastName}
                </h3>
                <h6>
                    <%
                        switch (profile.getRole()) {
                            case "ROLE_INTERN":
                                out.println("стажёр-консультант");
                                break;
                            case "ROLE_MENTOR":
                                out.println("ментор");
                                break;
                            case "ROLE_HR":
                                out.println("менеджер по персоналу");
                                break;
                        }
                    %>
                </h6>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                           aria-controls="home" aria-selected="true">Обо мне</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-8">
            <div class="tab-content profile-tab" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div class="row">
                        <div class="col-md-3">
                            <label>Имя:</label>
                        </div>
                        <div class="col-md-9">
                            <p>
                                ${profile.firstName} ${profile.middleName} ${profile.lastName}
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label>Email:</label>
                        </div>
                        <div class="col-md-9">
                            <p>
                                ${profile.users.email}
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label>Skype:</label>
                        </div>
                        <div class="col-md-9">
                            <p>
                                ${profile.skype}
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label>Локация:</label>
                        </div>
                        <div class="col-md-9">
                            <p>
                                ${profile.location.name} (${profile.location.offset})
                            </p>
                        </div>
                    </div>
                </div>
                <span data-toggle="modal" data-target="#profileModalEdit">
                    <button type="button" class="btn btn-outline-warning btn-sm mr-1 updateButton" value="Редактировать"
                            data-toggle="profileAction" data-placement="top">
                        Редактировать
                    </button>
                </span>
            </div>
        </div>
    </div>
</div>

<jsp:include page="../common/footer.jsp"/>

<%--********************************************************************************************************--%>
<%--Модальное окно редактирования профиля--%>
<%--При пустом поле "Фотография" останется фото, которое имеется на данный момент в БД--%>
<div class="modal fade" id="profileModalEdit" tabindex="-1" role="dialog"
     aria-labelledby="profileModalEdit" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h5 class="modal-title">Редактирование профиля</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form role="form" id="updateProfileForm"
                      enctype="multipart/form-data" method="post" accept-charset="UTF-8">
                    <div class="row">
                        <div class="col-6 pr-0">
                            <div class="form-group">
                                <label for="firstName" class="col-sm-3 control-label required-field">Имя</label>
                                <div class="col-sm-9 mw-100">
                                    <input type="text" id="firstName" placeholder="Имя" class="form-control"
                                           name="firstName" value=${profile.firstName} autofocus required>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 pl-0">
                            <div class="form-group">
                                <label for="middleName" class="col-sm-3 control-label">Отчество</label>
                                <div class="col-sm-9 mw-100">
                                    <input type="text" id="middleName" placeholder="Отчество" class="form-control"
                                           name="middleName" value=${profile.middleName}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="lastName" class="col-sm-3 control-label required-field">Фамилия</label>
                        <div class="col-sm-9 mw-100">
                            <input type="text" id="lastName" placeholder="Фамилия" class="form-control" name="lastName"
                                   value=${profile.lastName} required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 pr-0">
                            <div class="form-group">
                                <label for="email" class="col-sm-3 control-label required-field">Почта</label>
                                <div class="col-sm-9 mw-100">
                                    <input type="email" id="email" placeholder="Почта" class="form-control" name="email"
                                           value=${profile.users.email} required>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 pl-0">
                            <div class="form-group">
                                <label for="skype" class="col-sm-3 control-label">Skype</label>
                                <div class="col-sm-9 mw-100">
                                    <input type="text" id="skype" placeholder="Skype" class="form-control" name="skype"
                                           value=${profile.skype}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Город</label>
                        <div class="col-sm-9 mw-100">
                            <select id="locationId" class="form-control" name="locationId" required>
                                <option value="" disabled selected>Выберите город...</option>
                                <option value="1">Москва</option>
                                <option value="2">Санкт-Петербург</option>
                                <option value="3">Ульяновск</option>
                                <option value="4">Пермь</option>
                                <option value="5">Нижний Новгород</option>
                                <option value="6">Пенза</option>
                                <option value="7">Уфа</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="photo" class="col-sm-3 control-label">Фотография</label>
                        <div class="col-sm-9 mw-100">
                            <input type="file" id="photo" name="photo" accept="image/*">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-9 col-sm-offset-3">
                            <span class="required-field"></span>
                            <span class="help-block mw-100">Необходимые для заполнения поля</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                        <input type="submit" class="btn btn-primary" value="Сохранить"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
    // открытие модального окошка редактирования профиля
    $('#myModal').on('shown.bs.modal', function () {
        $('#firstName').trigger('focus')
    });

    // сет роли юзера
    $("#role").val("${profile.role}");

    // Получение id города
    const cities = ["Москва", "Санкт-Петербург", "Ульяновск", "Пермь", "Нижний Новгород", "Пенза", "Уфа"];
    let locationId;
    cities.map((city, index) => {
        if ("${profile.location.name}".startsWith(city)) {
            locationId = index + 1;
        }
    });
    // сет города
    if (locationId)
        $("#locationId").val(locationId);

    // сет action-ссылки формы редактирования профиля по id-параметру
    $("#updateProfileForm").attr("action", "/profile/update?id=" + ${profile.id});
</script>

</body>
</html>
