package com.springboot.entity;

import com.springboot.payload.MessageType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "location_message")
@Getter
@Setter
@Builder
public class LocationMessage {

    @Id
    @Column(name = "location_messageid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long locationMessageID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LocationID", nullable = false)
    private Location location;

    @Column(name = "Message")
    private String message;

    @Column(name = "Timestamp", nullable = false, updatable = false)
    @CreationTimestamp
    private Date timestamp;

    @Enumerated(EnumType.STRING)
    @Column(name = "MessageType" , nullable = false)
    private MessageType messageType;

    public LocationMessage() {

    }

    public LocationMessage(long locationMessageID, User user, Location location, String message, Date timestamp, MessageType messageType) {
        this.locationMessageID = locationMessageID;
        this.user = user;
        this.location = location;
        this.message = message;
        this.timestamp = timestamp;
        this.messageType = messageType;
    }
}
