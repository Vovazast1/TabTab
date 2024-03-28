//package com.springboot.entity;
//
//import lombok.Data;
//
//import jakarta.persistence.*;
//import java.util.Set;
//
//@Table(name = "user", uniqueConstraints = {
//        @UniqueConstraint(columnNames = {"Nickname"}),
//        @UniqueConstraint(columnNames = {"Email"})
//})
//@Entity
//@Data
//
//public class Users {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long userId;
//
//    private String email;
//
//    private String nickname;
//
//    private String birthday;
//
//    private String password;
//
//    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
//    @JoinTable(name = "favorite",
//            joinColumns = @JoinColumn(name = "UserID", referencedColumnName = "UserID"),
//            inverseJoinColumns = @JoinColumn(name = "LocationID", referencedColumnName = "LocationID"))
//    private Set<Favorite> favorites;
//}