package com.example.backend.dto;

import com.example.backend.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private String userEmail;
    private String userName;
    private Long point;

    public UserResponseDto(User user) {
        this.userEmail = user.getEmail();
        this.userName = user.getUsername();
        this.point = user.getPoint();
    }
}
