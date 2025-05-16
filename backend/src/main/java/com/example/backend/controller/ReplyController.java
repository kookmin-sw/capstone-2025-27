package com.example.backend.controller;

import com.example.backend.dto.ReplyRequestDto;
import com.example.backend.dto.ReplyResponseDto;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.service.ReplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/replies")
@RequiredArgsConstructor
@Tag(name = "Reply", description = "답변 관련 API")
public class ReplyController {
    private final ReplyService replyService;

//    @GetMapping("/{replyId}")
//    public ResponseEntity<?> getReplyById(@PathVariable String replyId) {
//        return ResponseEntity.ok(replyService.ge)
//    }

    @Operation(summary = "유저가 남긴 답변 모두 조회", description = "user id로 답변 모두 조회")
    @GetMapping("/user")
    public ResponseEntity<List<ReplyResponseDto>> getRepliesByUserId(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(replyService.getRepliesByUserId(userDetails.getUserId()));
    }

    @Operation(summary = "질문에 답변 생성", description = "질문에 답변 생성")
    @PostMapping
    public ResponseEntity<?> createReply(@RequestBody ReplyRequestDto dto,
                                         @AuthenticationPrincipal CustomUserDetails userDetails) {
        replyService.createReply(dto, userDetails.getUserId());
        return ResponseEntity.ok(Map.of("message", "답변이 작성되었습니다."));
    }

    @Operation(summary = "답변 수정", description = "답변의 content 를 수정")
    @PutMapping("/{replyId}")
    public ResponseEntity<?> updateReply(@PathVariable String replyId,
                                         @RequestBody ReplyRequestDto dto,
                                         @AuthenticationPrincipal CustomUserDetails userDetails) {
        replyService.updateReply(dto, replyId, userDetails.getUserId());
        return ResponseEntity.ok(Map.of("message", "답변이 수정되었습니다."));
    }

    @Operation(summary = "답변 삭제", description = "해당 답변을 삭제")
    @DeleteMapping("/{replyId}")
    public ResponseEntity<?> deleteReply(@PathVariable String replyId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        replyService.deleteReply(replyId, userDetails.getUserId());
        return ResponseEntity.ok(Map.of("message", "답변이 삭제되었습니다."));
    }

    @Operation(summary = "좋아요", description = "아직 해당 답변의 좋아요를 누르지 않았다면 좋아요를 1 올린다.")
    @PostMapping("/{replyId}/like")
    public ResponseEntity<?> like(@PathVariable String replyId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        replyService.likeReply(replyId, userDetails.getUserId());
        return ResponseEntity.ok(Map.of("message", "답변이 좋아요 되었습니다.."));
    }

    @Operation(summary = "좋아요 취소", description = "해당 답변의 좋아요를 취소")
    @DeleteMapping("/{replyId}/like")
    public ResponseEntity<?> unlike(@PathVariable String replyId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        replyService.unlikeReply(replyId, userDetails.getUserId());
        return ResponseEntity.ok(Map.of("message", "답변이 좋아요 해제 되었습니다."));
    }
}
