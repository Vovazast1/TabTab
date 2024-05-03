package com.springboot.payload;

import com.springboot.entity.Base;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class MessageDto extends Base {
    @Enumerated(EnumType.STRING)
    private MessageType messageType;
    private String content;
    private String room;
    private String username;
}
