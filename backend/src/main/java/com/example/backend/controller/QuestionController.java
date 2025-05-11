package com.example.backend.controller;

import com.example.backend.dto.QuestionRequestDto;
import com.example.backend.dto.RewardRequestDto;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.service.QuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
@Tag(name = "Question", description = "질문글 관련 API")
public class QuestionController {
    private final QuestionService questionService;

    @Operation(summary = "질문글 생성", description = "새로운 질문을 생성")
    @PostMapping
    public ResponseEntity<?> createQuestion(@RequestBody QuestionRequestDto requestDto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        String questionId = questionService.createQuestion(requestDto, userDetails.getUserId());
        return ResponseEntity.ok(Map.of("id", questionId, "message", "질문이 등록되었습니다"));
    }

    @Operation(summary = "질문 조회 by Question Id", description = "질문 id로 질문을 조회")
    @GetMapping("/{id}")
    public ResponseEntity<?> getQuestion(@PathVariable String id) {
        return ResponseEntity.ok(questionService.getQuestion(id));
    }

    @Operation(summary = "질문 수정", description = "질문을 수정")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable String id,
                                            @RequestBody QuestionRequestDto dto,
                                            @AuthenticationPrincipal CustomUserDetails userDetails) {
        questionService.updateQuestion(id, dto, userDetails.getUserId());
        return ResponseEntity.ok(Map.of("message", "질문이 수정되었습니다."));
    }

    @Operation(summary = "질문 삭제", description = "질문을 삭제")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable String id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        questionService.deleteQuestion(id, userDetails.getUserId());
        return ResponseEntity.ok(Map.of("message", "질문이 삭제되었습니다."));
    }

    @PostMapping("/answers/reward")
    public ResponseEntity<?> rewardReply(@RequestBody RewardRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        questionService.rewardReply(dto, userDetails.getUserId());
        return ResponseEntity.ok(Map.of("message", "보상이 완료되었습니다."));
    }

    @Operation(summary = "제목으로 질문 검색", description = "정규식(regex)를 이용해 제목으로 질문 검색 *추후에 text-index 로 마이그레이션 필요")
    @GetMapping("/search")
    public ResponseEntity<?> searchQuestions(@RequestParam String keyword) {
        return ResponseEntity.ok(questionService.searchByTitle(keyword));
    }

    @Operation(summary = "무한 스크롤", description = "현시간(cursor) 기준으로 이전에 생성된 글을 10개(default)만큼 조회")
    @GetMapping
    public ResponseEntity<?> getQuestions(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)LocalDateTime cursor,
                                          @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(questionService.getPagedQuestions(cursor, size));
    }
}
