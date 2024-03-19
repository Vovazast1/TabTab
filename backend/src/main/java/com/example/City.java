package com.example;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "City")

public class City {

    @Id
    @jakarta.persistence.Column(name = "city_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @jakarta.persistence.Column(name = "city_name")
    private String cityname;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCityname() {
        return cityname;
    }

    public void setCityname(String cityname) {
        this.cityname = cityname;
    }

}
