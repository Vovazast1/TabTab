
package com.springboot.controller;

import java.text.SimpleDateFormat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.springboot.payload.LocationChatMessageDto;
import java.util.Date;

@Controller
public class LocationMessageController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public LocationChatMessageDto sendMessage(LocationChatMessageDto locationChatMessageDto) throws Exception {
        String timestamp = new SimpleDateFormat("HH:mm").format(new Date());
        return new LocationChatMessageDto(locationChatMessageDto.getMessage(), timestamp,
                locationChatMessageDto.getUserId());
    }

    // @MessageMapping("/chat.addUser")
    // @SendTo("/topic/public")
    // public LocationChatMessage addUser(@Payload LocationChatMessage chatMessage,
    // SimpMessageHeaderAccessor headerAccessor){
    // // Add username in webSocket Session
    // headerAccessor.getSessionAttributes().put("username",
    // chatMessage.getSender());
    // return chatMessage;
    // }
}
