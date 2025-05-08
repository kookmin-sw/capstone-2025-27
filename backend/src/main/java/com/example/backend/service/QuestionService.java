package com.example.backend.service;

import com.example.backend.dto.QuestionRequestDto;
import com.example.backend.dto.QuestionResponseDto;
import com.example.backend.entity.Question;
import com.example.backend.entity.Reply;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.ReplyLikeRepository;
import com.example.backend.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final ReplyRepository replyRepository;
    private final ReplyLikeRepository replyLikeRepository;

    // 질문 생성
    public String createQuestion(QuestionRequestDto dto, String userId) {
        Question question = Question.builder()
                .authorId(userId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .reward(dto.getReward())
                .deadline(dto.getDeadline())
                .createTime(LocalDateTime.now())
                .modifiedTime(null)
                .selectedAnswerId(null)
                .autoSelected(false)
                .edited(false)
                .build();
        return questionRepository.save(question).getId();
    }

    // 질문 검색 by question id
    public QuestionResponseDto getQuestion(String questionId) {
        return new QuestionResponseDto(questionRepository.findById(questionId).orElseThrow(() -> new NoSuchElementException("질문을 찾을 수 없습니다.")));
    }

    // 질문 update
    public void updateQuestion(String questionId, QuestionRequestDto dto, String userId)  {
        Question question = questionRepository.findById(questionId).orElseThrow();
        if (!question.getAuthorId().equals(userId)) throw new AccessDeniedException("권한 없음");
        question.setTitle(dto.getTitle());
        question.setContent(dto.getContent());
        question.setReward(dto.getReward());
        question.setDeadline(dto.getDeadline());
        question.setModifiedTime(LocalDateTime.now());
        question.setEdited(true);
        questionRepository.save(question);
    }

    // 질문 삭제 (근데 질문 삭제를 하면 포인트는? -> 생각 필요 ex) deadline 지나야 삭제 가능)
    public void deleteQuestion(String questionId, String userId)  {
        Question question = questionRepository.findById(questionId).orElseThrow();
        if (!question.getAuthorId().equals(userId)) throw new AccessDeniedException("권한 없음");

        List<Reply> replies = replyRepository.findByQuestionIdOrderByCreatedTimeDesc(questionId);

        // 질문들에 달린 좋아요 삭제
        List<String> replyIds = replies.stream().map(Reply::getId).toList();
        replyLikeRepository.deleteAllByReplyIdIn(replyIds);

        // 질문에 달린 답변들 삭제
        replyRepository.deleteAllByQuestionId(questionId);

        // 질문 삭제
        questionRepository.deleteById(questionId);
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
