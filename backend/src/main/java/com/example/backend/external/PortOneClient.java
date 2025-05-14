package com.example.backend.external;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class PortOneClient {
    @Value("${portone.api-key}")
    private String apiKey;

    @Value("${portone.api-secret}")
    private String apiSecret;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.iamport.kr")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

    public String getAccessToken() {
        Map<String, String> body = Map.of("imp_key", apiKey, "imp_secret", apiSecret);
        return webClient.post()
                .uri("/users/getToken")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(json -> json.path("response").path("access_token").asText())
                .block();
    }

    public JsonNode verifyPayment(String impUid) {
        String accessToken = getAccessToken();

        return webClient.get()
                .uri("/payments/{imp_Uid}", impUid)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(json -> json.path("response"))
                .block();
    }

    // portOne v2 api 용
    public JsonNode verifyPaymentByPaymentId(String paymentId) {
        log.info(paymentId);
        return webClient.get()
                .uri("/v2/payments/{paymentId}", paymentId)
                .headers(headers -> {headers.set(HttpHeaders.AUTHORIZATION, "PortOne " + apiSecret.trim());})
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(json -> json.path("data"))
                .block();
    }
}
