package com.example.Location;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class LocationController {

    @Autowired
    LocationService locationService;

    @GetMapping("getLocations")
    public List<Location> getLocations() {
        return locationService.getLocations();
    }

    @PostMapping("addLocation")
    public Location saveLocation(@RequestBody Location location) {
        return locationService.saveLocation(location);
    }

    @GetMapping("getLocationByName")
    public Location getLocationByName(String name) {
        return locationService.getLocationByName(name);
    }

    @GetMapping("getLocationById")
    public Location getLocationById(Long id) {
        return locationService.getLocationById(id);
    }
}
