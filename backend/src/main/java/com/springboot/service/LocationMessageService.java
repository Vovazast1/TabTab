package com.springboot.service;

import com.springboot.entity.LocationMessage;
import com.springboot.repository.LocationMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class LocationMessageService {

    private final LocationMessageRepository locationMessageRepository;

    public List<LocationMessage> getMessages(Long locationId) {
        return locationMessageRepository.findByLocationLocationId(locationId);
    }

    public LocationMessage saveMessage(LocationMessage locationMessage) {
        return locationMessageRepository.save(locationMessage);
    }
}
