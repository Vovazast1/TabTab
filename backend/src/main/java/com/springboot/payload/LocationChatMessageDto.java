package com.springboot.payload;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocationChatMessageDto {
    private String message;
    private String timestamp;
    private String userId;
}
