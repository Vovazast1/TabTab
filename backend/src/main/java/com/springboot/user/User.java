//package com.springboot.user;
//
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.Getter;
//import lombok.Setter;
//
//@Entity
//@Table(name = "User")
//@Getter
//@Setter
//
//public class User {
//
//    @Id
//    @Column(name = "UserID")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long userId;
//
//    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch =
//    // FetchType.EAGER)
//    // private Set<Favorite> favorites;
//
//    @Column(name = "Email")
//    private String email;
//
//    @Column(name = "Nickname")
//    private String userName;
//
//    @Column(name = "Birthday")
//    private String birthday;
//
//    @Column(name = "Password")
//    private String password;
//
//}
