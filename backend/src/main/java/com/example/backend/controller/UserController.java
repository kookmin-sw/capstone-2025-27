package com.example.backend.controller;

import com.example.backend.dto.RegisterRequest;
import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@Tag(name = "User", description = "유저 관련 API")
public class UserController {

    @Autowired
    private UserService userService;

    @Operation(summary = "회원가입", description = "입력받은 정보를 바탕으로 회원가입을 하고 정보가 형식에 맞지 않거나 중복이면 실패 메시지 발송", security = @SecurityRequirement(name = ""))
    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(@RequestBody RegisterRequest request) {
        try {
            User user = userService.registerUser(request);
            return ResponseEntity.ok("회원가입 성공: " + user.getUsername());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("회원가입 실패: " + e.getMessage());
        }
    }
}
