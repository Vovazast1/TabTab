package com.springboot.controller;

import com.springboot.payload.LocationChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class LocationMessageController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public LocationChatMessage sendMessage(@Payload LocationChatMessage chatMessage){
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public LocationChatMessage addUser(@Payload LocationChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){
        // Add username in webSocket Session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }
}
