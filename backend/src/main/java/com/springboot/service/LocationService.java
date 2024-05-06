package com.springboot.service;

import com.springboot.entity.Location;
import java.util.List;

import com.springboot.repository.LocationRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    @Autowired
    LocationRepositories locationRepositories;

    public List<Location> getLocations() {
        return locationRepositories.findAll();
    }

    public Location saveLocation(Location location) {
        return locationRepositories.save(location);
    }

    public Location getLocationById(Long id) {
        return locationRepositories.findByLocationId(id);
    }

    public List<Location> getLocationByActivity(String activity){ return locationRepositories.findByActivity(activity); }

    public String getImageByLocationId(Long locationId) { return locationRepositories.getImageByLocationId(locationId);}
}
