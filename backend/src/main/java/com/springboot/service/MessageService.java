package com.springboot.service;

import com.springboot.payload.MessageDto;
import com.springboot.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public List<MessageDto> getMessages(String room) {
        return messageRepository.findAllByRoom(room);
    }

    public MessageDto saveMessage(MessageDto messageDto) {
        return messageRepository.save(messageDto);
    }
}
