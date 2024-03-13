package com.example;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class controller {

    @RequestMapping
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