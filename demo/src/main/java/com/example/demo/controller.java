package com.example.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class controller {

    @RequestMapping
    public String helloWorld() {
        return "Hello Hell";
    }

    @RequestMapping("/goodbye")
    public String goodbyeHell() {
        return "Goodbye World";
    }
}