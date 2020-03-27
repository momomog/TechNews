package ru.technews.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.technews.common.Common;
import ru.technews.exception.ExceptionResponse;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
public class ExceptionHandlerController {

    @RequestMapping(value = "error-handler")
    public ExceptionResponse internalServerError(HttpServletRequest request,
                                                 HttpServletResponse response,
                                                 @RequestParam(required = false) Map<String,String> allParams) {
        int errorCode = response.getStatus();
        return new ExceptionResponse(errorCode, Common.getErrorMessage(errorCode));
    }
}
