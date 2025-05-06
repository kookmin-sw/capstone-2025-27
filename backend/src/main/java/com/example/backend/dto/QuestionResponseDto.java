package com.example.backend.dto;

import com.example.backend.entity.Question;
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
    private String content;
    private int reward;
    private LocalDateTime deadline;
    private String authorId;
    private String selectedAnswerId;
    private boolean autoSelected;

    public QuestionResponseDto(Question q) {
        this.id = q.getId();
        this.title = q.getTitle();
        this.content = q.getContent();
        this.reward = q.getReward();
        this.deadline = q.getDeadline();
        this.authorId = q.getAuthorId();
        this.selectedAnswerId = q.getSelectedAnswerId();
        this.autoSelected = q.isAutoSelected();
    }
}
