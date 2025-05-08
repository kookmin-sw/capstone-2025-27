package com.example.backend.repository;

import com.example.backend.entity.ReplyLike;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReplyLikeRepository extends MongoRepository<ReplyLike, String> {
    boolean existsByReplyIdAndUserId(String replyId, String userId);

    void deleteByReplyIdAndUserId(String replyId, String userId);

    long countByReplyId(String replyId);

    void deleteAllByReplyId(String replyId);

    void deleteAllByReplyIdIn(List<String> replyId);
}
