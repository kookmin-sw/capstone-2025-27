package com.example.backend.service;

import com.example.backend.dto.ReplyRequestDto;
import com.example.backend.dto.ReplyResponseDto;
import com.example.backend.entity.Question;
import com.example.backend.entity.Reply;
import com.example.backend.entity.ReplyLike;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.ReplyLikeRepository;
import com.example.backend.repository.ReplyRepository;
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

    // 질문의 답변들을 조회
    public List<ReplyResponseDto> getReplies(String questionId, String currentUserId) {
        Question question = questionRepository.findById(questionId).orElseThrow();
        String selectedId = question.getSelectedAnswerId();

        return replyRepository.findByQuestionIdOrderByCreatedTimeDesc(questionId)
                .stream()
                .map(reply -> new ReplyResponseDto(
                        reply,
                        reply.getId().equals(selectedId),
                        replyLikeRepository.existsByReplyIdAndUserId(reply.getId(), currentUserId)
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
            throw new IllegalStateException("이미 좋아요를 한 답변입니다.");
        }
        replyLikeRepository.save(new ReplyLike(null, replyId, userId));
        Reply reply = replyRepository.findById(replyId).orElseThrow();
        reply.setLikeCount(reply.getLikeCount() + 1);
        replyRepository.save(reply);
    }

    // 답변 좋아요 취소
    public void unlikeReply(String replyId, String userId) {
        if (!replyLikeRepository.existsByReplyIdAndUserId(replyId, userId)) {
            throw new IllegalStateException("좋아요가 되어있지 않은 답변입니다.");
        }
        replyLikeRepository.deleteByReplyIdAndUserId(replyId, userId);
        Reply reply = replyRepository.findById(replyId).orElseThrow();
        reply.setLikeCount(reply.getLikeCount() - 1);
        replyRepository.save(reply);
    }
}
