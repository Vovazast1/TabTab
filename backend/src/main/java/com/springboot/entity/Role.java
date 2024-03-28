package com.springboot.entity;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

@Table(name = "roles")
@Entity
@Getter
@Setter

public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 60)
    private String name;
}