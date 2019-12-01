package ru.technews.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ru.technews.exception.ExceptionResponse;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/errors")
public class ExceptionHandlerController {

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @RequestMapping("unauthorised")
    public ExceptionResponse unAuthorised(HttpServletRequest request, HttpServletResponse httpServletResponse) {
        return new ExceptionResponse("Bad credentials", 401);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @RequestMapping("int_server_error")
    public ExceptionResponse internalServerError(HttpServletRequest request, HttpServletResponse httpServletResponse) {
        return new ExceptionResponse("Internal Server Error", 500);
    }
}
