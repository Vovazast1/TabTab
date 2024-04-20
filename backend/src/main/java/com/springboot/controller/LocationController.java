package com.springboot.controller;

import com.springboot.entity.Location;
import com.springboot.service.LocationService;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/v1/locations")
public class LocationController {

    @Autowired
    LocationService locationService;

    @GetMapping
    public List<Location> getLocations() {
        return locationService.getLocations();
    }

    @PostMapping("/addLocation")
    public Location saveLocation(@RequestBody Location location) {
        return locationService.saveLocation(location);
    }

    @GetMapping("/locationByName")
    public Location getLocationByName(String name) {
        return locationService.getLocationByName(name);
    }

    @GetMapping("/locationById")
    public Location getLocationById(Long id) {
        return locationService.getLocationById(id);
    }

    @GetMapping("/locationByActivity")
    public List<Location> getLocationByActivity(String activity){
        return locationService.getLocationByActivity(activity);
    }

    @GetMapping("/locationByType")
    public List<Location> getLocationByType(String type){
        return locationService.getLocationByType(type);
    }
}
