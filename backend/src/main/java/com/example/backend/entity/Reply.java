package com.example.backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "replies")
public class Reply {
    @Id
    private String id;
    private String questionId;
    private String authorId;
    private String parentReplyId;
    private int depth;
    private String content;
    private LocalDateTime createdTime;
}
