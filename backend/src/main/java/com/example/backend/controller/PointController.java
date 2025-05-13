package com.example.backend.controller;

import com.example.backend.dto.ChargeRequestDto;
import com.example.backend.dto.WithDrawRequestDto;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.service.PointService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/point")
@RequiredArgsConstructor
@Tag(name = "Point",description = "포인트 관련 API")
public class PointController {
    private final PointService pointService;

    @Operation(summary = "포인트 충전", description = "portOne api를 이용한 kakaopay test 결제를 통한 충전")
    @PostMapping("/charge")
    public ResponseEntity<?> chargePoint(@RequestBody ChargeRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        pointService.chargePoint(userDetails.getUserId(), dto.getImpUid());
        return ResponseEntity.ok(Map.of("message", "포인트가 충전되었습니다."));
    }

    @Operation(summary = "포인트 환전", description = "결제 시스템 미적용 포인트 환전")
    @PostMapping("/withdraw")
    public ResponseEntity<?> withDrawPoint(@RequestBody WithDrawRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        pointService.withdrawPoint(userDetails.getUserId(), dto.getAmount());
        return ResponseEntity.ok(Map.of("message", "환전이 완료되었습니다."));
    }
}
