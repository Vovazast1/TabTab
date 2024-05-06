package com.springboot.payload;

import com.springboot.entity.LocationMessage;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class LocationMessageDto {
    private MessageType messageType;
    private String message;
    private long locationId;
    private long userId;
}
