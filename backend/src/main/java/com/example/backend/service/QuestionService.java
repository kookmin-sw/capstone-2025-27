package com.example.backend.service;

import com.example.backend.dto.QuestionInfoResponseDto;
import com.example.backend.dto.QuestionRequestDto;
import com.example.backend.dto.QuestionResponseDto;
import com.example.backend.domain.Question;
import com.example.backend.domain.Reply;
import com.example.backend.dto.RewardRequestDto;
import com.example.backend.exception.BusinessException;
import com.example.backend.exception.ErrorCode;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.ReplyLikeRepository;
import com.example.backend.repository.ReplyRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final ReplyRepository replyRepository;
    private final ReplyLikeRepository replyLikeRepository;
    private final UserRepository userRepository;
    private final PointService pointService;


    // 질문 생성
    @Transactional
    public String createQuestion(QuestionRequestDto dto, String userId) {

        String questionId = new ObjectId().toHexString();

        // 사용자 point reward 만큼 삭감
        pointService.spendPoint(userId, dto.getReward(), questionId);

        Question question = Question.builder()
                .id(questionId)
                .authorId(userId)
                .title(dto.getTitle())
                .category(dto.getCategory())
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
    public QuestionInfoResponseDto getQuestion(String questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new BusinessException(ErrorCode.QUESTION_NOT_FOUND));

        String authorName = userRepository.findById(question.getAuthorId())
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND))
                .getUsername();

        Reply selectedReply = replyRepository.findById(question.getSelectedAnswerId()).orElseThrow();
        String selectedReplyAuthorName = userRepository.findById(selectedReply.getAuthorId()).orElseThrow().getUsername();

        return new QuestionInfoResponseDto(question, authorName, selectedReplyAuthorName);
    }

    // 유저 아이디로 생성한 질문 모두 가져오기
    public List<QuestionResponseDto> getQuestionsByUserId(String userId) {
        return questionRepository.findAllByAuthorIdOrderByCreateTimeDesc(userId)
                .stream()
                .map(q -> {
                            String authorName = userRepository.findById(q.getAuthorId())
                                    .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND))
                                    .getUsername();
                            return new QuestionResponseDto(q, authorName);
                        }
                )
                .toList();
    }

    // 질문 update
    @Transactional
    public void updateQuestion(String questionId, QuestionRequestDto dto, String userId)  {
        Question question = questionRepository.findById(questionId).orElseThrow();
        if (!question.getAuthorId().equals(userId)) throw new AccessDeniedException("권한 없음");

        Long originalReward = question.getReward();
        Long newReward = dto.getReward();

        // 리워드 수정시 포인트 재분배
        if (newReward > originalReward) {
            pointService.spendPoint(userId, newReward - originalReward, questionId);
        } else if (newReward < originalReward) {
            throw new BusinessException(ErrorCode.REWARD_UPDATE_INVALID);
        }

        question.setTitle(dto.getTitle());
        question.setCategory(dto.getCategory());
        question.setContent(dto.getContent());
        question.setReward(dto.getReward());
        question.setDeadline(dto.getDeadline());
        question.setModifiedTime(LocalDateTime.now());
        question.setEdited(true);

        questionRepository.save(question);
    }

    // 질문 삭제
    @Transactional
    public void deleteQuestion(String questionId, String userId)  {
        Question question = questionRepository.findById(questionId).orElseThrow();
        if (!question.getAuthorId().equals(userId)) throw new AccessDeniedException("권한 없음");

        List<Reply> replies = replyRepository.findByQuestionIdOrderByCreatedTimeDesc(questionId);
        // 데드라인 이전
        if (question.getDeadline().isBefore(LocalDateTime.now())){
            // 답글이 하나라도 존재시 삭제 불가
            if (!replies.isEmpty()) throw new BusinessException(ErrorCode.CAN_NOT_DELETE_REPLY);
            // 삭제시 질문에 답변이 하나도 없을시 포인트 환불
            pointService.refundQuestionReward(userId, question.getReward(), questionId);
        }

        // 질문들에 달린 좋아요 삭제
        List<String> replyIds = replies.stream().map(Reply::getId).toList();
        replyLikeRepository.deleteAllByReplyIdIn(replyIds);

        // 질문에 달린 답변들 삭제
        replyRepository.deleteAllByQuestionId(questionId);

        // 질문 삭제
        questionRepository.deleteById(questionId);
    }

    // 현상금 보상
    @Transactional
    public void rewardReply(RewardRequestDto dto, String userId) {
        Reply reply = replyRepository.findById(dto.getReplyId()).orElseThrow();
        Question question = questionRepository.findById(dto.getQuestionId()).orElseThrow();

        if (question.getSelectedAnswerId() != null) {
            throw new BusinessException(ErrorCode.ALREADY_REWARDED);
        }
        // 포인트 처리
        pointService.rewardPoint(userId, question.getReward(), question.getId());
        // 변경사항 업데이트
        question.setSelectedAnswerId(reply.getId());
        question.setAutoSelected(false);
        questionRepository.save(question);
    }

    // 질문 검색 (제목, 카테고리)
    public List<QuestionResponseDto> search(String keyword, String category) {
        List<Question> questions;

        if (keyword != null && category != null) {
            questions = questionRepository.findByTitleRegexIgnoreCaseAndCategoryOrderByCreateTimeDesc(keyword, category);
        } else if (keyword != null) {
            questions = questionRepository.findByTitleRegexIgnoreCase(keyword);
        } else if (category != null) {
            questions = questionRepository.findByCategoryOrderByCreateTimeDesc(category);
        } else {
            questions = questionRepository.findAllByOrderByCreateTimeDesc();
        }

        return questions.stream()
                .map(q -> {
                    String authorName = userRepository.findById(q.getAuthorId())
                            .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND))
                            .getUsername();
                    return new QuestionResponseDto(q, authorName);
                })
                .toList();
    }

    // 무한 스크롤 - 현시간 cursor 기준 이전에 생성된 글을 size 갯수 만큼 조회
    public List<QuestionResponseDto> getPagedQuestions(LocalDateTime cursor, int size) {
        LocalDateTime cursorTime = cursor != null ? cursor : LocalDateTime.now();
        Pageable pageable = PageRequest.of(0, size);

        List<Question> questions = questionRepository.findByCreateTimeBeforeOrderByCreateTimeDesc(cursorTime, pageable);

        return questions.stream()
                .map(q -> {
                            String authorName = userRepository.findById(q.getAuthorId())
                                    .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND))
                                    .getUsername();
                            return new QuestionResponseDto(q, authorName);
                    }
                )
                .toList();
    }
}
