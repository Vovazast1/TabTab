package com.springboot.service;

import com.corundumstudio.socketio.SocketIOClient;
import com.springboot.entity.Location;
import com.springboot.entity.LocationMessage;
import com.springboot.entity.User;
import com.springboot.payload.LocationMessageDto;
import com.springboot.payload.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocketService {

    @Autowired
    private LocationMessageService locationMessageService;

    @Autowired
    private UserService userService;

    @Autowired
    private LocationService locationService;


    public void sendSocketMessage(SocketIOClient senderClient, LocationMessageDto message, long locationId){
        for(
                SocketIOClient client : senderClient.getNamespace().getRoomOperations(String.valueOf(locationId)).getClients()
        ){
            if(!client.getSessionId().equals(senderClient.getSessionId())){
                client.sendEvent("read_message", message);
            }
        }
    }

    public void saveMessage(SocketIOClient senderClient, LocationMessageDto message){

        User user = userService.getUserById(message.getUserId());
        Location location = locationService.getLocationById(message.getLocationId());



        LocationMessage storedMessage = locationMessageService.saveMessage(LocationMessage.builder()
                .messageType(MessageType.CLIENT)
                .message(message.getMessage())
                .location(location)
                .user(user)
                .build());
        LocationMessageDto storedMessageDto = locationToDto(storedMessage);

        sendSocketMessage(senderClient,storedMessageDto, message.getLocationId());
    }

    public void saveInfoMessage(SocketIOClient senderClient, String message, long locationId, long userId){
        User user = userService.getUserById(userId);

        Location location = locationService.getLocationById(locationId);

        LocationMessage storedMessage = locationMessageService.saveMessage(LocationMessage.builder()
                .messageType(MessageType.CLIENT)
                .user(user)
                .message(message)
                .location(location)
                .build());

        LocationMessageDto storedMessageDto = locationToDto(storedMessage);
        sendSocketMessage(senderClient,storedMessageDto,locationId);
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
