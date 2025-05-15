package com.example.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuestionRequestDto {
    private String title;
    private String category;
    private String content;
    private Long reward;
    private LocalDateTime deadline;
}
