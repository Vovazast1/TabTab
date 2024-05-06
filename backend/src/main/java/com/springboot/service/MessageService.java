package com.springboot.service;

import com.springboot.payload.LocationMessageDto;
import com.springboot.repository.LocationMessageDtoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MessageService {

    private final LocationMessageDtoRepository messageRepository;

    public List<LocationMessageDto> getMessages(Long locationId) {
        return messageRepository.findAllByLocationId(locationId);
    }

    public LocationMessageDto saveMessage(LocationMessageDto locationMessage) {
        return messageRepository.save(locationMessage);
    }
}
