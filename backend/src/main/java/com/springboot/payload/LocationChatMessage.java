package com.springboot.payload;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocationChatMessage {
    private String message;
    private Date timestamp;
    private MessageType type;
    private String sender;
}
