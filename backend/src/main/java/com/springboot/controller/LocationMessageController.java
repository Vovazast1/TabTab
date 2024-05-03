//package com.springboot.controller;
//
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.stereotype.Controller;
//
//@Controller
//public class LocationMessageController {
//
//    @MessageMapping("/chat.sendMessage")
//    @SendTo("/topic/public")
//    public String sendMessage(
//            @Payload String message
//    ) {
//        return message;
//    }
//
////    @MessageMapping("/chat.addUser")
////    @SendTo("/topic/public")
////    public LocationChatMessage addUser(@Payload LocationChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){
////        // Add username in webSocket Session
////        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
////        return chatMessage;
////    }
//}
