package com.example.backend.service;

import com.example.backend.dto.ReplyRequestDto;
import com.example.backend.dto.ReplyResponseDto;
import com.example.backend.domain.Question;
import com.example.backend.domain.Reply;
import com.example.backend.domain.ReplyLike;
import com.example.backend.exception.BusinessException;
import com.example.backend.exception.ErrorCode;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.ReplyLikeRepository;
import com.example.backend.repository.ReplyRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReplyService {
    private final ReplyRepository replyRepository;
    private final ReplyLikeRepository replyLikeRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    // 질문의 답변들을 조회
    public List<ReplyResponseDto> getReplies(String questionId, String currentUserId) {
        Question question = questionRepository.findById(questionId).orElseThrow();
        String selectedId = question.getSelectedAnswerId();

        return replyRepository.findByQuestionIdOrderByCreatedTimeDesc(questionId)
                .stream()
                .map(reply -> new ReplyResponseDto(
                        reply,
                        userRepository.findById(reply.getAuthorId()).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND)).getUsername(),
                        reply.getId().equals(selectedId),
                        replyLikeRepository.existsByReplyIdAndUserId(reply.getId(), currentUserId)
                        )
                )
                .toList();
    }

    public List<ReplyResponseDto> getRepliesByUserId(String userId) {
        return replyRepository.findAllByAuthorIdOrderByCreatedTimeDesc(userId)
                .stream()
                .map(reply -> new ReplyResponseDto(
                                reply,
                                userRepository.findById(reply.getAuthorId()).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND)).getUsername(),
                                false,
                                replyLikeRepository.existsByReplyIdAndUserId(reply.getId(), userId)
                        )
                )
                .toList();
    }

    // 질문에 답변 생성
    public void createReply(ReplyRequestDto dto, String userId) {
        if (userId == null) throw new AccessDeniedException("로그인 정보 없음");
        Reply reply = new Reply();
        reply.setQuestionId(dto.getQuestionId());
        reply.setContent(dto.getContent());
        reply.setAuthorId(userId);
        reply.setCreatedTime(LocalDateTime.now());
        reply.setLikeCount(0);
        replyRepository.save(reply);
    }

    // 답변 수정
    public void updateReply(ReplyRequestDto dto, String replyId, String userId) {
        Reply reply = replyRepository.findById(replyId).orElseThrow();
        if (!reply.getAuthorId().equals(userId)) throw new AccessDeniedException("권한 없음");
        reply.setContent(dto.getContent());
        reply.setModifiedTime(LocalDateTime.now());
        reply.setEdited(true);
        replyRepository.save(reply);
    }

    // 답변 삭제
    public void deleteReply(String replyId, String userId) {
        Reply reply = replyRepository.findById(replyId).orElseThrow();
        if (!reply.getAuthorId().equals(userId)) throw new AccessDeniedException("권한 없음.");

        // 답변에 달린 좋아요 삭제
        replyLikeRepository.deleteAllByReplyId(replyId);

        // 답변 삭제
        replyRepository.deleteById(replyId);
    }

    // 답변 좋아요
    public void likeReply(String replyId, String userId) {
        if (replyLikeRepository.existsByReplyIdAndUserId(replyId, userId)) {
            throw new BusinessException(ErrorCode.REPLY_ALREADY_LIKED);
        }
        replyLikeRepository.save(new ReplyLike(null, replyId, userId));
        Reply reply = replyRepository.findById(replyId).orElseThrow();
        reply.setLikeCount(reply.getLikeCount() + 1);
        replyRepository.save(reply);
    }

    // 답변 좋아요 취소
    public void unlikeReply(String replyId, String userId) {
        if (!replyLikeRepository.existsByReplyIdAndUserId(replyId, userId)) {
            throw new BusinessException(ErrorCode.REPLY_NOT_LIKED);
        }
        replyLikeRepository.deleteByReplyIdAndUserId(replyId, userId);
        Reply reply = replyRepository.findById(replyId).orElseThrow();
        reply.setLikeCount(reply.getLikeCount() - 1);
        replyRepository.save(reply);
    }
}
