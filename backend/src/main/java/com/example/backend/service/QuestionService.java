package com.example.backend.service;

import com.example.backend.dto.QuestionRequestDto;
import com.example.backend.dto.QuestionResponseDto;
import com.example.backend.entity.Question;
import com.example.backend.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    // 질문 생성
    public String createQuestion(QuestionRequestDto dto, String userId) {
        Question question = Question.builder()
                .authorId(userId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .reward(dto.getReward())
                .deadline(dto.getDeadline())
                .createTime(LocalDateTime.now())
                .selectedAnswerId(null)
                .autoSelected(false)
                .build();
        return questionRepository.save(question).getId();
    }

    // 질문 검색 by question id
    public QuestionResponseDto getQuestion(String id) {
        return new QuestionResponseDto(questionRepository.findById(id).orElseThrow(() -> new NoSuchElementException("질문을 찾을 수 없습니다.")));
    }

    // 질문 update
    public void updateQuestion(String id, QuestionRequestDto dto, String userId) throws AccessDeniedException {
        Question question = questionRepository.findById(id).orElseThrow();
        if (!question.getAuthorId().equals(userId)) throw new AccessDeniedException("권한 없음");
        question.setTitle(dto.getTitle());
        question.setContent(dto.getContent());
        question.setReward(dto.getReward());
        question.setDeadline(dto.getDeadline());
        questionRepository.save(question);
    }

    // 질문 삭제 (근데 질문 삭제를 하면 포인트는? -> 생각 필요 ex) deadline 지나야 삭제 가능)
    public void deleteQuestion(String id, String userId) throws AccessDeniedException {
        Question question = questionRepository.findById(id).orElseThrow();
        if (!question.getAuthorId().equals(userId)) throw new AccessDeniedException("권한 없음");
        questionRepository.deleteById(id);
    }

    // 질문 제목으로 검색
    public List<QuestionResponseDto> searchByTitle(String keyword) {
        return questionRepository.findByTitleRegexIgnoreCase(keyword).stream().map(QuestionResponseDto::new).toList();
    }

    // 무한 스크롤 - 현시간 cursor 기준 이전에 생성된 글을 size 갯수 만큼 조회
    public List<QuestionResponseDto> getPagedQuestions(LocalDateTime cursor, int size) {
        LocalDateTime cursorTime = cursor != null ? cursor : LocalDateTime.now();
        Pageable pageable = PageRequest.of(0, size);

        List<Question> questions = questionRepository.findByCreateTimeBeforeOrderByCreateTimeDesc(cursorTime, pageable);

        return questions.stream()
                .map(QuestionResponseDto::new)
                .toList();
    }
}
