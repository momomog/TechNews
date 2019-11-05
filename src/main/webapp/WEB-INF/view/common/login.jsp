<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!doctype html>
<html>
<head>
    <title>Авторизация</title>
</head>
<body>

<jsp:include page="header.jsp"/>

<div class="container mt-7">
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
                    <%
                        String authStatus = (String) request.getSession().getAttribute("errorStatus");
                        if (authStatus != null && authStatus.equals("Bad credentials")) {
                            out.println("Не удалось войти.");
                            out.println("<br>");
                            out.println("Проверьте правильность введенных данных");
                        }
                    %>
                </p>
            </article>
        </div>
    </div>
</div>

<jsp:include page="footer.jsp"/>

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
