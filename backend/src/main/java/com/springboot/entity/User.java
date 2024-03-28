package com.springboot.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Table(name = "User", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"Nickname"}),
        @UniqueConstraint(columnNames = {"Email"})
})
@Entity
@Getter
@Setter

public class User {

    @Id
    @Column(name = "UserID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(name = "Email")
    private String email;

    @Column(name = "Username")
    private String username;

    @Column(name = "Birthday")
    private String birthday;

    @Column(name = "Password")
    private String password;

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Role> roles;
}


// @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch =
// FetchType.EAGER)
// private Set<Favorite> favorites;