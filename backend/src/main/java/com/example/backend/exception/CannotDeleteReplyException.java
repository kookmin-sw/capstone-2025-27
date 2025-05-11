package com.example.backend.exception;

public class CannotDeleteReplyException extends RuntimeException {
    public CannotDeleteReplyException(String message) {
        super(message);
    }
}
