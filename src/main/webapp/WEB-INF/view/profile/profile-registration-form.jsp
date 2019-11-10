<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!doctype html>
<html>
<head>
    <title>Регистрация</title>
</head>
<body>

<jsp:include page="../common/header.jsp"/>

<div class="container emp-profile mw-50">
    <div class="text-center">
        <h4>Регистрация нового пользователя</h4>
        <br>
    </div>
    <div class="justify-content-center">
        <form class="form-horizontal w-50 ml-auto mr-auto" role="form" action="/registration"
              enctype="multipart/form-data" method="post" accept-charset="UTF-8">
            <div class="row">
                <div class="col-6 pr-0">
                    <div class="form-group">
                        <label for="firstName" class="col-sm-3 control-label required-field">Имя</label>
                        <div class="col-sm-9 mw-100">
                            <input type="text" id="firstName" placeholder="Имя" class="form-control" name="firstName"
                                   autofocus required>
                        </div>
                    </div>
                </div>
                <div class="col-6 pl-0">
                    <div class="form-group">
                        <label for="middleName" class="col-sm-3 control-label">Отчество</label>
                        <div class="col-sm-9 mw-100">
                            <input type="text" id="middleName" placeholder="Отчество" class="form-control"
                                   name="middleName">
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="lastName" class="col-sm-3 control-label required-field">Фамилия</label>
                <div class="col-sm-9 mw-100">
                    <input type="text" id="lastName" placeholder="Фамилия" class="form-control" name="lastName"
                           required>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label required-field">Тип</label>
                <div class="col-sm-9 mw-100">
                    <select id="role" class="form-control" name="role" required>
                        <option value="" disabled selected>Выберите тип...</option>
                        <option value="INTERN">Стажёр-консультант</option>
                        <option value="MENTOR">Ментор</option>
                        <option value="HR">Менеджер по персоналу</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-6 pr-0">
                    <div class="form-group">
                        <label for="email" class="col-sm-3 control-label required-field">Почта</label>
                        <div class="col-sm-9 mw-100">
                            <input type="email" id="email" placeholder="Почта" class="form-control" name="email"
                                   required>
                        </div>
                    </div>
                </div>
                <div class="col-6 pl-0">
                    <div class="form-group">
                        <label for="skype" class="col-sm-3 control-label required-field">Skype</label>
                        <div class="col-sm-9 mw-100">
                            <input type="text" id="skype" placeholder="Skype" class="form-control" name="skype"
                                   required>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label required-field">Город</label>
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
            <div class="d-flex justify-content-center">
                <input type="submit" class="btn btn-primary btn-block w-auto" value="Зарегистрировать"/>
            </div>
        </form>
    </div>
</div>

<jsp:include page="../common/footer.jsp"/>

</body>
</html>
