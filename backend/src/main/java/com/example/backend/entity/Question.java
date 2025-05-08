package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "questions")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Question {
    @Id
    private String id;
    private String title;
    private String content;
    private int reward;
    private LocalDateTime createTime;
    private LocalDateTime modifiedTime;
    private LocalDateTime deadline;
    private String authorId;
    private String selectedAnswerId;
    private boolean autoSelected;
    private boolean edited;
}
