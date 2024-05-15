package com.springboot.service;

import com.springboot.entity.Location;
import java.util.List;

import com.springboot.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    @Autowired
    LocationRepository locationRepository;

    public List<Location> getLocations() {
        return locationRepository.findAll();
    }

    public Location saveLocation(Location location) {
        return locationRepository.save(location);
    }

    public List<Location> getLocationByActivity(String activity) {
        return locationRepository.findByActivity(activity);
    }

    public Location getLocationById(Long locationId) {
        return locationRepository.findLocationByLocationId(locationId);
    }
}
