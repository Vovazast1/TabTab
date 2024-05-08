package com.springboot.controller;

import com.springboot.entity.LocationMessage;
import com.springboot.payload.LocationMessageDto;
import com.springboot.service.LocationMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {

    @Autowired
    private LocationMessageService locationMessageService;

    @GetMapping("{locationId}")
    public List<LocationMessageDto> getMessages(@PathVariable Long locationId) {
        List<LocationMessage> messages = locationMessageService.getMessages(locationId);
        return messages.stream()
                .map(this::locationToDto)
                .collect(Collectors.toList());
    }

    private LocationMessageDto locationToDto(LocationMessage locationMessage) {
        LocationMessageDto locationMessageDto = new LocationMessageDto();
        locationMessageDto.messageType = locationMessage.getMessageType();
        locationMessageDto.userId = locationMessage.getUser().getUserId();
        locationMessageDto.locationId = locationMessage.getLocation().getLocationId();
        locationMessageDto.message = locationMessage.getMessage();
        return locationMessageDto;
    }
}
