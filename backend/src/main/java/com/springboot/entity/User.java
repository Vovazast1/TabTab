package com.springboot.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Table(name = "User", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "Username" }),
        @UniqueConstraint(columnNames = { "Email" })
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
    private Date birthday;

    @Column(name = "Password")
    private String password;

    @Column(name = "Verification")
    private boolean isVerified;
}