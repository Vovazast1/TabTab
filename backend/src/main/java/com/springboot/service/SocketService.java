package com.springboot.service;

import com.corundumstudio.socketio.SocketIOClient;
import com.springboot.payload.LocationMessageDto;
import com.springboot.payload.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocketService {

    private final MessageService messageService;

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
        LocationMessageDto storedMessage = messageService.saveMessage(LocationMessageDto.builder()
                .messageType(MessageType.CLIENT)
                .message(message.getMessage())
                .locationId(message.getLocationId())
                .userId(message.getUserId())
                .build());
        sendSocketMessage(senderClient,storedMessage, message.getLocationId());
    }

    public void saveInfoMessage(SocketIOClient senderClient, String message, long locationId, long userId){
        LocationMessageDto storedMessage = messageService.saveMessage(LocationMessageDto.builder()
                .messageType(MessageType.CLIENT)
                .userId(userId)
                .message(message)
                .locationId(locationId)
                .build());
        sendSocketMessage(senderClient,storedMessage,locationId);
    }

}
