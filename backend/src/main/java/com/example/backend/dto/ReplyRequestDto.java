package com.example.backend.dto;

import lombok.Data;

@Data
public class ReplyRequestDto {
    private String questionId;
    private String content;
}
