package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "replyLikes")
@NoArgsConstructor
@AllArgsConstructor
public class ReplyLike {
    @Id
    private String id;
    private String replyId;
    private String userId;
}
