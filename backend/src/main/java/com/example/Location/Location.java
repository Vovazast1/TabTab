package com.example.Location;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Location")
@Getter
@Setter

public class Location {

    @Id
    @jakarta.persistence.Column(name = "LocationID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long locationId;

    @jakarta.persistence.Column(name = "Address")
    private String locationName;

    @jakarta.persistence.Column(name = "Activity")
    private String activity;

    @jakarta.persistence.Column(name = "Type")
    private String type;

}
