package com.springboot.payload;

import lombok.*;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class LocationMessageDto{
    public MessageType messageType;
    public String message;
    public long locationId;
    public long userId;
}
