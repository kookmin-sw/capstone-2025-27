package com.example.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "replies")
public class Reply {
    @Id
    private String id;
    private String questionId;
    private String authorId;
//    대댓글 기능 생길시 사용
//    private String parentReplyId;
//    private int depth;
    private String content;
    private LocalDateTime createdTime;
    private LocalDateTime modifiedTime;
    private boolean edited;
    private int likeCount;
}
