package com.example.Location;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import jakarta.persistence.Column;
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
    @Column(name = "LocationID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long locationId;

    // @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, fetch =
    // FetchType.EAGER)
    // private Set<Favorite> favorites;

    @Column(name = "Address")
    private String locationName;

    @Column(name = "Activity")
    private String activity;

    @Column(name = "Type")
    private String type;

}
