package com.example.backend.repository;

import com.example.backend.domain.Reply;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReplyRepository extends MongoRepository<Reply, String> {
    List<Reply> findByQuestionIdOrderByCreatedTimeDesc(String questionId);

    void deleteAllByQuestionId(String questionId);
}
