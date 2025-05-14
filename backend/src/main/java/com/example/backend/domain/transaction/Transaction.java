package com.example.backend.domain.transaction;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document("transactions")
public class Transaction {
    @Id
    private String id;
    private String userId;
    private Long amount;
    private TransactionType type;
    private String referenceId;
    private LocalDateTime createdTime;
}
