package com.example;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class controller {

    @Autowired
    CityService cityService;

    @RequestMapping("sayHello")
    public String sayHello() {
        return "Hello user";
    }

    @GetMapping("getcities")
    public List<City> getCities() {
        return cityService.getCities();
    }

    @PostMapping("addcity")
    public City SaveCity(@RequestBody City city) {
        return cityService.saveCity(city);
    }

    @GetMapping("getCity")
    public City getCity(String cityname) {
        return cityService.getCity(cityname);
    }

    @GetMapping("/hi")
    @CrossOrigin(origins = { "http://localhost:8100", "http://localhost:8080" })
    public String helloWorld() {
        return "{ \"tab2\": \"Hello Hell\" }";
    }

    @RequestMapping("/goodbye")
    @CrossOrigin(origins = { "http://localhost:8100", "http://localhost:8080" })
    public String goodbyeHell() {
        return "{ \"tab2\": \"Goodbye World\" }";
    }
}