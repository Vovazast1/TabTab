package com.springboot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "Location_Message")
@Getter
@Setter
public class LocationMessage {

    @Id
    @Column(name = "LocationMessageID")
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

    @Column(name = "Timestamp")
    private Date timestamp;
}
