package com.example.backend.dto;

import com.example.backend.domain.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponseDto {
    private String id;
    private String title;
    private String category;
    private String content;
    private Long reward;
    private LocalDateTime deadline;
    private String authorId;
    private String selectedAnswerId;
    private boolean autoSelected;

    public QuestionResponseDto(Question q, String authorName) {
        this.id = q.getId();
        this.title = q.getTitle();
        this.category = q.getCategory();
        this.content = q.getContent();
        this.reward = q.getReward();
        this.deadline = q.getDeadline();
        this.authorId = authorName;
        this.selectedAnswerId = q.getSelectedAnswerId();
        this.autoSelected = q.isAutoSelected();
    }
}
