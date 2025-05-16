package com.example.backend.dto;

import com.example.backend.domain.Reply;
import com.example.backend.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReplyResponseDto {
    private String id;
    private String authorId;
    private String content;
    private LocalDateTime createdTime;
    private int likeCount;
    private boolean isSelected;
    private boolean isLiked;

    public ReplyResponseDto(Reply reply, String authorName, boolean isSelected, boolean isLiked) {
        this.id = reply.getId();
        this.authorId = authorName;
        this.content = reply.getContent();
        this.createdTime = reply.getCreatedTime();
        this.likeCount = reply.getLikeCount();
        this.isSelected = isSelected;
        this.isLiked = isLiked;
    }
}
