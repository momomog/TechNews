package ru.technews.exception;


public class ExceptionResponse {
    public int code;
    public String message;

    public ExceptionResponse(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
