package com.example.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuestionRequestDto {
    private String title;
    private String content;
    private int reward;
    private LocalDateTime deadline;
}
