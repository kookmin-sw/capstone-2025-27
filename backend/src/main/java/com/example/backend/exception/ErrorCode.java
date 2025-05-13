package com.example.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // General
    USER_NOT_FOUND("USER_NOT_FOUND", "사용자를 찾을 수 없습니다."),

    // Auth
    USERNAME_DUPLICATED("USERNAME_DUPLICATED", "이미 존재하는 username입니다."),
    EMAIL_DUPLICATED("EMAIL_DUPLICATED", "이미 존재하는 email입니다."),

    // Question/Reply
    QUESTION_NOT_FOUND("QUESTION_NOT_FOUND", "질문을 찾을 수 없습니다."),
    CAN_NOT_DELETE_REPLY("CAN_NOT_DELETE_REPLY", "답글이 존재하여 질문을 삭제할 수 없습니다."),
    REWARD_UPDATE_INVALID("REWARD_UPDATE_INVALID", "reward 를 이전 reward 보다 낮게 설정할 수 없습니다."),
    REPLY_ALREADY_LIKED("REPLY_ALREADY_LIKED", "이미 좋아요를 한 답변입니다."),
    REPLY_NOT_LIKED("REPLY_NOT_LIKED", "좋아요가 되어있지 않은 답변입니다."),
    ALREADY_REWARDED("ALREADY_REWARDED", "이미 보상이 완료되었습니다."),

    // Point
    INSUFFICIENT_POINTS("POINTS_NOT_ENOUGH", "보유 포인트가 부족합니다."),
    WITHDRAW_AMOUNT_INVALID("WITHDRAW_AMOUNT_INVALID", "인출 금액은 0보다 커야 합니다."),

    // Payment
    PAYMENT_NOT_COMPLETED("PAYMENT_NOT_COMPLETED", "결제가 완료되지 않았습니다. 다시 시도해 주세요");



    private final String code;
    private final String message;
}
