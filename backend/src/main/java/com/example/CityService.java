package com.example;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityService {

    @Autowired
    CityRepositories cityRepositories;

    public CityService() {
    }

    public List<City> getCities() {
        return cityRepositories.findAll();
    }

    public City saveCity(City city) {
        return cityRepositories.save(city);
    }

    public City getCity(String cityname) {
        return cityRepositories.findByCityname(cityname);
    }
}
