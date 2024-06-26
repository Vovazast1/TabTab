package com.springboot.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Table(name = "Location")
@Entity
@Getter
@Setter

public class Location {

    @Id
    @Column(name = "LocationID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long locationId;

    @Column(name = "Address")
    private String locationName;

    @Column(name = "Activity")
    private String activity;

    @Column(name = "Type")
    private String type;

    @Column(name = "Latitude")
    private double latitude;

    @Column(name = "Longitude")
    private double longitude;

    @Column(name = "Image")
    private String image;
}