//package com.springboot.config;
//
//import com.springboot.payload.LocationChatMessage;
//import com.springboot.payload.MessageType;
//import com.springboot.service.UserService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.event.EventListener;
//import org.springframework.messaging.simp.SimpMessageSendingOperations;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.stereotype.Component;
//import org.springframework.web.socket.messaging.SessionDisconnectEvent;
//
//@Component
//@RequiredArgsConstructor
//@Slf4j
//public class WebSocketEventListener {
//
//    private final SimpMessageSendingOperations messageTemplate;
//
//    @EventListener
//    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
//        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
//        String username = (String) accessor.getSessionAttributes().get("username");
//        if(username != null) {
//            log.info("User disconnected: {}", username);
//            var chatMessage = LocationChatMessage.builder()
//                    .type(MessageType.LEAVE)
//                    .sender(username)
//                    .build();
//            messageTemplate.convertAndSend("/topic/public", chatMessage);
//        }
//    }
//}
