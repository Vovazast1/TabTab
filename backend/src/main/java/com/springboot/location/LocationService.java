//package com.springboot.location;
//
//import java.util.List;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class LocationService {
//
//    @Autowired
//    LocationRepositories locationRepositories;
//
//    public LocationService() {
//    }
//
//    public List<Location> getLocations() {
//        return locationRepositories.findAll();
//    }
//
//    public Location saveLocation(Location location) {
//        return locationRepositories.save(location);
//    }
//
//    public Location getLocationByName(String name) {
//        return locationRepositories.findByLocationName(name);
//    }
//
//    public Location getLocationById(Long id) {
//        return locationRepositories.findByLocationId(id);
//    }
//}
