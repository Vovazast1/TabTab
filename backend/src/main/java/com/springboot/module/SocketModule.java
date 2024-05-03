package com.springboot.module;


import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.springboot.payload.MessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Slf4j
@Component
public class SocketModule {

    private final SocketIOServer server;
    private final SocketService socketService;

    public SocketModule(SocketIOServer server, SocketService socketService) {
        this.server = server;
        this.socketService = socketService;
        server.addConnectListener(onConnected());
        server.addDisconnectListener(onDisconnected());
        server.addEventListener("send_message", MessageDto.class, onChatReceived());
    }

    private DataListener<MessageDto> onChatReceived() {
        return(senderClient, data , ackSender) -> {
            log.info(data.toString());
            socketService.saveMessage(senderClient, data);
        };
    }

    private DisconnectListener onDisconnected() {
        return client -> {
            var params = client.getHandshakeData().getUrlParams();
            String room = String.join("", params.get("room"));
            String username = String.join("", params.get("username"));
            String content = String.join("", params.get("content"));
            socketService.saveInfoMessage(client,content,room, username);
            log.info("Socket ID[{}] - room[{}] - username [{}]  disconnected to chat module through", client.getSessionId().toString(), room, username);
        };
    }

    private ConnectListener onConnected() {
        return (client) -> {
            var params = client.getHandshakeData().getUrlParams();

            String room = params.containsKey("room") && params.get("room") != null ?
                    params.get("room").stream().collect(Collectors.joining()) : "";

            String username = params.containsKey("username") && params.get("username") != null ?
                    params.get("username").stream().collect(Collectors.joining()) : "";

            String content = params.containsKey("content") && params.get("content") != null ?
                    params.get("content").stream().collect(Collectors.joining()) : "";

            if (!room.isEmpty() && !username.isEmpty() && !content.isEmpty()) {
                client.joinRoom(room);
            }
        };
    }
}
