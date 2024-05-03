package com.springboot.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@MappedSuperclass
@Data
public abstract class Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Date createdDateTime;
}
