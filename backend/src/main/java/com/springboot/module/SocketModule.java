package com.springboot.module;


import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.springboot.payload.LocationMessageDto;
import com.springboot.service.SocketService;
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
        server.addEventListener("send_message", LocationMessageDto.class, onChatReceived());
    }

    private DataListener<LocationMessageDto> onChatReceived() {
        return(senderClient, data , ackSender) -> {
            log.info(data.toString());
            socketService.saveMessage(senderClient, data);
        };
    }

    private DisconnectListener onDisconnected() {
        return client -> {
            var params = client.getHandshakeData().getUrlParams();
            long locationId = 0;

            if (params.containsKey("locationId") && params.get("locationId") != null) {
                try {
                    locationId = Long.parseLong(params.get("locationId").stream().findFirst().orElse(""));
                } catch (NumberFormatException e) {
                }
            }

            long userId = 0;

            if (params.containsKey("userId") && params.get("userId") != null) {
                try {
                    userId = Long.parseLong(params.get("userId").stream().findFirst().orElse(""));
                } catch (NumberFormatException e) {
                }
            }
            String message = String.join("", params.get("message"));
            socketService.saveInfoMessage(client, message,locationId, userId);
            log.info("Socket ID[{}] - room[{}] - username [{}]  disconnected to chat module through", client.getSessionId().toString(), locationId, userId);
        };
    }

    private ConnectListener onConnected() {
        return (client) -> {
            var params = client.getHandshakeData().getUrlParams();

            long locationId = 0;

            if (params.containsKey("locationId") && params.get("locationId") != null) {
                try {
                    locationId = Long.parseLong(params.get("locationId").stream().findFirst().orElse(""));
                } catch (NumberFormatException e) {
                }
            }

            long userId = 0;

            if (params.containsKey("userId") && params.get("userId") != null) {
                try {
                    userId = Long.parseLong(params.get("userId").stream().findFirst().orElse(""));
                } catch (NumberFormatException e) {
                }
            }

            String message = params.containsKey("message") && params.get("message") != null ?
                    params.get("message").stream().collect(Collectors.joining()) : "";

            if (!message.isEmpty()) {
                client.joinRoom(String.valueOf(locationId));
            }
        };
    }
}
