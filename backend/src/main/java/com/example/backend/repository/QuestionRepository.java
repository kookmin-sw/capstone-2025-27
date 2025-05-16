package com.example.backend.repository;

import com.example.backend.domain.Question;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface QuestionRepository extends MongoRepository<Question, String> {
    @Query("{ 'title': { $regex: ?0, $options: 'i' } }")
    List<Question> findByTitleRegexIgnoreCase(String keyword);

    List<Question> findByCreateTimeBeforeOrderByCreateTimeDesc(LocalDateTime cursor, Pageable pageable);

    List<Question> findByCategoryOrderByCreateTimeDesc(String category);

    List<Question> findAllByAuthorIdOrderByCreateTimeDesc(String authorId);

    List<Question> findByTitleRegexIgnoreCaseAndCategoryOrderByCreateTimeDesc(String keyword, String category);

    List<Question> findAllByOrderByCreateTimeDesc();
}
