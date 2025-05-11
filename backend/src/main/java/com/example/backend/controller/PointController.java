package com.example.backend.controller;

import com.example.backend.dto.ChargeRequestDto;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.service.PointService;
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
public class PointController {
    private final PointService pointService;

    @PostMapping("/charge")
    public ResponseEntity<?> chargePoint(@RequestBody ChargeRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        //imp_id로 검증 + 금액확인
//        pointService.chargePoint(userDetails.getUserId(), 확인금액);
        return ResponseEntity.ok(Map.of("message", "질문이 수정되었습니다."));
    }
}
