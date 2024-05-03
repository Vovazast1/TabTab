package com.springboot.module;

import com.corundumstudio.socketio.SocketIOClient;
import com.springboot.payload.MessageDto;
import com.springboot.payload.MessageType;
import com.springboot.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocketService {

    private final MessageService messageService;

    public void sendSocketMessage(SocketIOClient senderClient, MessageDto message, String room){
        for(
                SocketIOClient client : senderClient.getNamespace().getRoomOperations(room).getClients()
        ){
            if(!client.getSessionId().equals(senderClient.getSessionId())){
                client.sendEvent("read_message", message);
            }
        }
    }

    public void saveMessage(SocketIOClient senderClient, MessageDto message){
        MessageDto storedMessage = messageService.saveMessage(MessageDto.builder()
                .messageType(MessageType.CLIENT)
                .content(message.getContent())
                .room(message.getRoom())
                .username(message.getUsername())
                .build());
        sendSocketMessage(senderClient,storedMessage,message.getRoom());
    }

    public void saveInfoMessage(SocketIOClient senderClient, String message, String room, String username){
        MessageDto storedMessage = messageService.saveMessage(MessageDto.builder()
                .messageType(MessageType.CLIENT)
                .username(username)
                .content(message)
                .room(room)
                .build());
        sendSocketMessage(senderClient,storedMessage,room);
    }

}
