package com.springboot.controller;

import com.springboot.entity.User;
import com.springboot.service.UserService;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/addUser")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/getUserByName")
    public Optional<User> getUser(String name) {
        return userService.getUser(name);
    }

//     @GetMapping("/getFavorites")
//     public Set<Favorite> getUserFavorites(Long id) {
//     return userService.getUserFavorites(id);
//     }
}