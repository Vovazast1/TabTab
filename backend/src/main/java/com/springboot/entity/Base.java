//package com.springboot.entity;
//
//import jakarta.persistence.*;
//import lombok.Data;
//import org.hibernate.annotations.CreationTimestamp;
//
//import java.util.Date;
//
//@MappedSuperclass
//@Data
//public abstract class Base {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long locationMessageId;
//
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "UserID", nullable = false)
//    private User user;
//
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "LocationID", nullable = false)
//    private Location location;
//
//    @Column(nullable = false, updatable = false)
//    @CreationTimestamp
//    private Date timeStamp;
//}
