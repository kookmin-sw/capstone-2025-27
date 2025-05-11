package com.example.backend.service;

import com.example.backend.domain.User;
import com.example.backend.domain.transaction.Transaction;
import com.example.backend.domain.transaction.TransactionType;
import com.example.backend.exception.InsufficientPointsException;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.TransactionRepository;
import com.example.backend.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class PointService {
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;

    // 포인트 입금
    public void chargePoint(String userId, Long amount) {
        // imp_uid 로 결제 검증

        // 포인트 적립
        User user = userRepository.findById(userId).orElseThrow();
        user.setPoint(user.getPoint() + amount);
        userRepository.save(user);

        // 거래 기록
        Transaction transaction = Transaction.builder()
                .userId(userId)
                .amount(amount)
                .type(TransactionType.CHARGE)
                .referenceId(null)
                .createdTime(LocalDateTime.now())
                .build();

        transactionRepository.save(transaction);
    }

    // 포인트 출금
    public void requestWithdraw(String userId, Long amount, String accountInfo) {
        if (amount <= 0) throw new IllegalStateException("인출 금액은 0보다 커야 합니다.");
        // 포인트 체크
        checkEnoughPoints(userId, amount);

        User user = userRepository.findById(userId).orElseThrow();
        user.setPoint(user.getPoint() - amount);
        userRepository.save(user);

        Transaction transaction = Transaction.builder()
                .userId(userId)
                .amount(amount)
                .type(TransactionType.WITHDRAW_REQUESTED)
                .referenceId(null)
                .createdTime(LocalDateTime.now())
                .build();

        transactionRepository.save(transaction);
    }

    // 포인트 소모
    public void spendPoint(String userId, Long amount, String questionId) {
        // 포인트 체크
        checkEnoughPoints(userId, amount);

        User user = userRepository.findById(userId).orElseThrow();
        user.setPoint(user.getPoint() - amount);
        userRepository.save(user);

        Transaction transaction = Transaction.builder()
                .userId(userId)
                .amount(amount)
                .type(TransactionType.QUESTION_POST)
                .referenceId(questionId)
                .createdTime(LocalDateTime.now())
                .build();

        transactionRepository.save(transaction);
    }

    // 포인트 보상
    public void rewardPoint(String answerAuthorId, Long amount, String answerId) {
        User user = userRepository.findById(answerAuthorId).orElseThrow();
        user.setPoint(user.getPoint() + amount);
        userRepository.save(user);

        Transaction transaction = Transaction.builder()
                .userId(answerAuthorId)
                .amount(amount)
                .type(TransactionType.REWARD_RECEIVED)
                .referenceId(answerId)
                .createdTime(LocalDateTime.now())
                .build();

        transactionRepository.save(transaction);
    }

    // 답변이 없을고 데드라인이 지났을 시 포인트 환불
    public void refundQuestionReward(String userId, Long amount, String questionId) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setPoint(user.getPoint() + amount);
        userRepository.save(user);

        Transaction transaction = Transaction.builder()
                .userId(userId)
                .amount(amount)
                .type(TransactionType.QUESTION_REWARD_REFUND)
                .referenceId(userId)
                .createdTime(LocalDateTime.now())
                .build();

        transactionRepository.save(transaction);
    }

    // 포인트 보유 여부 검증
    public void checkEnoughPoints(String userId, Long requiredAmount) {
        User user = userRepository.findById(userId).orElseThrow();
        if (user.getPoint() < requiredAmount) throw new InsufficientPointsException("보유 포인트가 부족합니다.");
    }
}
