package com.example.backend.exception;

public class AlreadyRewardedException extends RuntimeException {
    public AlreadyRewardedException(String message) {
        super(message);
    }
}
