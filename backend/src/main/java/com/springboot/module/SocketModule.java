package com.springboot.module;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.springboot.entity.Location;
import com.springboot.entity.LocationMessage;
import com.springboot.entity.User;
import com.springboot.payload.LocationMessageDto;
import com.springboot.repository.LocationRepository;
import com.springboot.repository.UserRepository;
import com.springboot.service.SocketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Slf4j
@Component
public class SocketModule {

    private final SocketIOServer server;
    private final SocketService socketService;

    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private UserRepository userRepository;

    public SocketModule(SocketIOServer server, SocketService socketService, LocationRepository locationRepository,
            UserRepository userRepository) {
        this.server = server;
        this.socketService = socketService;
        server.addConnectListener(onConnected());
        server.addDisconnectListener(onDisconnected());
        server.addEventListener("send_message", LocationMessageDto.class, onChatReceived());
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
    }

    private DataListener<LocationMessageDto> onChatReceived() {
        return (senderClient, data, ackSender) -> {
            log.info(data.toString());
            socketService.saveMessage(senderClient, data);
        };
    }

    private DisconnectListener onDisconnected() {
        return client -> {
            long locationId = getLocationIdFromClient(client);
            Location location = locationRepository.findById(locationId).orElse(null);

            long userId = getUserIdFromClient(client);
            User user = userRepository.findById(userId).orElse(null);
        };
    }

    private ConnectListener onConnected() {
        return (client) -> {
            long locationId = getLocationIdFromClient(client);
            Location location = locationRepository.findByLocationId(locationId);
            long userId = getUserIdFromClient(client);
            User user = userRepository.findByUserId(userId);

            if (location != null && user != null) {
                client.joinRoom(String.valueOf(locationId));
            } else {
                System.out.println("Location or user not found!");
            }
        };
    }

    public long getLocationIdFromClient(SocketIOClient client) {
        var params = client.getHandshakeData().getUrlParams();
        String locationIdKey = "locationId";
        long locationId = 0;
        if (params.containsKey(locationIdKey)) {
            String locationIdStr = params.get(locationIdKey).stream().findFirst().orElse(null);
            if (locationIdStr != null && !locationIdStr.isEmpty()) {
                try {
                    locationId = Long.parseLong(locationIdStr);
                } catch (NumberFormatException e) {
                }
            }
        }
        return locationId;
    }

    public long getUserIdFromClient(SocketIOClient client) {
        var params = client.getHandshakeData().getUrlParams();
        String userIdKey = "userId";
        long userId = 0;
        if (params.containsKey(userIdKey)) {
            String userIdStr = params.get(userIdKey).stream().findFirst().orElse(null);
            if (userIdStr != null && !userIdStr.isEmpty()) {
                try {
                    userId = Long.parseLong(userIdStr);
                } catch (NumberFormatException e) {
                }
            }
        }
        return userId;
    }

    public String getMessageFromClient(SocketIOClient client) {
        var params = client.getHandshakeData().getUrlParams();
        String message = params.containsKey("message") && params.get("message") != null
                ? params.get("message").stream().collect(Collectors.joining())
                : "";
        return message;
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
