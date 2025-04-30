package com.warmhelp.app.services;

import com.warmhelp.app.models.ChatGptMessage;
import com.warmhelp.app.repositories.ChatGptRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


import java.util.*;

@Service
public class ChatGptService {

    private final WebClient webClient;
    private final ChatGptRepository chatGptRepository;

    @Value("${openai.api.model}")
    private String model;

    public ChatGptService(ChatGptRepository chatGptRepository, @Value("${openai.api.key}") String apiKey) {
        this.chatGptRepository = chatGptRepository;
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1") // ← base solo del dominio + versión
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey.trim())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public ChatGptMessage sendQuestion(String question) {
        // Estructura del body según API OpenAI
        Map<String, Object> body = new HashMap<>();
        body.put("model", model);

        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "user", "content", question));
        body.put("messages", messages);

        // Llamada a OpenAI
        String answer = this.webClient.post()
                .uri("/chat/completions") // ← endpoint correcto
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    var choices = (List<Map<String, Object>>) response.get("choices");
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    return message.get("content").toString().trim();
                })
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Mono.just("Error: " + e.getMessage());
                })
                .block();

        // Guardar en base de datos
        ChatGptMessage message = new ChatGptMessage();
        message.setQuestion(question);

        if (answer.startsWith("Error:")) {
            message.setAnswer("Lo siento, hubo un problema con la solicitud. Intenta de nuevo en unos segundos.");
        } else {
            message.setAnswer(answer);
        }

        return this.chatGptRepository.save(message);
    }
    public List<ChatGptMessage> getHistory() {
        return chatGptRepository.findAllByOrderByCreatedAtAsc();
    }
    public void deleteAllMessages() {
        chatGptRepository.deleteAll();
    }


}
