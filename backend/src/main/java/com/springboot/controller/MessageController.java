package com.springboot.controller;

import com.springboot.payload.MessageDto;
import com.springboot.service.MessageService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/{room}")
    public ResponseEntity<List<MessageDto>> getMessages(@PathVariable("room") String room) {
        return ResponseEntity.ok(messageService.getMessages(room));
    }
}
