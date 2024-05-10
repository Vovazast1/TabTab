package com.springboot.controller;

import com.springboot.entity.Location;
import com.springboot.service.LocationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/v1/location")
public class LocationController {

    @Autowired
    LocationService locationService;

    @GetMapping
    public List<Location> getLocations(@RequestParam(required = false) String activity) {
        return activity != null
                ? locationService.getLocationByActivity(activity)
                : locationService.getLocations();
    }

    @PostMapping
    public Location saveLocation(@RequestBody Location location) {
        return locationService.saveLocation(location);
    }

    @GetMapping("{id}")
    public String getImageByLocationId(@PathVariable Long id) {
        return locationService.getImageByLocationId(id);
    }
}
