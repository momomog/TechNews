package ru.technews.exception;


public class ExceptionResponse {
    public String message;
    public int code;

    public ExceptionResponse(String message, int ex) {
        this.message = message;
        this.code = ex;
    }
}
