<%@ page import="ru.ibs.intern.traineeship.common.Const" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

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
        <div class="col-md-12">
            <div>
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
                <div class="skill-head">
                    <!-- Кнопка для вызова модального окна добавления пользователя -->
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addSkillModal">
                        Добавить навык
                    </button>
                    <table class="table table-bordered mt-2">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Уровень навыка</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <c:forEach var="skill" varStatus="row" items="${profile.skills}">
                        <tr>
                            <th scope="row">${row.count}</th>
                            <td>${skill.skill.name}</td>
                            <td>${skill.level}</td>
                            <td>
                                <button class="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#updateSkillModal"
                                        data-id="${skill.id}"
                                        data-skill="${skill.skill.id}"
                                        data-level="${skill.level}">
                                    <i class="fas fa-user-edit"></i>
                                </button>
                            </td>
                            <td>
                            <button type="button" class="btn btn-outline-danger btn-sm"
                                    data-toggle="modal" data-target=".bd-example-modal-sm"
                                    data-id="${skill.id}">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                            </td>
                        </tr>
                        </c:forEach>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Модальное окно для добавления навыка -->
<div class="modal fade" id="addSkillModal" tabindex="-1" role="dialog" aria-labelledby="addSkillModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addSkillModalLabel">Навык</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form:form method="POST">
                <div class="modal-body">
                    <div class="modal-body">
                        <div class="form-group">
                            <input type="hidden" class="form-control" name="profileId" value="${profile.id}" required>
                        </div>
                        <div class="form-group">
                            <label class="col-form-label required-field">Город</label>
                            <select id="userLocationId" class="form-control" name="skillId" required>
                                <option value="" disabled selected>Выберите навык...</option>
                                <jsp:useBean id="listSkill" scope="request" type="java.util.List"/>
                                <c:forEach var="listSkill" items="${listSkill}">
                                    <option value=${listSkill.id}>${listSkill.name}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="col-form-label">Уровень навык</label>
                            <input type="text" class="form-control" name="level" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                    <button type="submit" class="btn btn-success">Добавить</button>
                </div>
            </form:form>
        </div>
    </div>
</div>

<!-- Модальное окно для обновления навык -->
<div class="modal fade" id="updateSkillModal" tabindex="-1" role="dialog" aria-labelledby="updateSkillModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updateSkillModalLabel">Навык</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form:form method="POST" id="updateSkillForm">
                <div class="modal-body">
                    <div class="modal-body">
                        <div class="form-group">
                            <input id="profileId" type="hidden" class="form-control" name="profileId" value="${profile.id}" required>
                        </div>
                        <div class="form-group">
                            <label class="col-form-label required-field">Город</label>
                            <select id="skillId" class="form-control" name="skillId" required>
                                <option  value="" disabled selected>Выберите навык...</option>
                                <c:forEach var="listSkill" items="${listSkill}">
                                    <option value=${listSkill.id}>${listSkill.name}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="col-form-label">Уровень навык</label>
                            <input type="text" id="level" class="form-control" name="level" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                    <button type="submit" class="btn btn-success">Изменить</button>
                </div>
            </form:form>
        </div>
    </div>
</div>

<!-- Модальное окно для удаления навык -->
<div class="modal fade bd-example-modal-sm" id="deleteSkillModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Предупреждение</h5>
            </div>
            <div class="modal-body">
                <p>Удалить текущего навык?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Нет</button>
                <form:form id="deleteSkillForm" method="POST"><button class="btn btn-danger">Да</button></form:form>
            </div>
        </div>
    </div>
</div>

<jsp:include page="../common/footer.jsp"/>

<script>

    $('#updateSkillModal').on('shown.bs.modal', function (event) {
        var button = $(event.relatedTarget),
            modal = $(this);
        modal.find("#profileId").val(${profile.id});
        modal.find("#skillId").val(button.data("skill"));
        modal.find("#level").val(button.data("level"));
        $("#updateSkillForm").attr("action", "/profile/skills/update/" + button.data("id"));
    });

    $('#deleteSkillModal').on('shown.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        $("#deleteSkillForm").attr("action", "/profile/skills/delete/" + button.data("id"));
    });

</script>
</body>
</html>