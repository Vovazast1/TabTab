package com.example.User;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/user")
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
    public User getUser(String name) {
        return userService.getUser(name);
    }

    // @GetMapping("/getFavorites")
    // public Set<Favorite> getUserFavorites(Long id) {
    // return userService.getUserFavorites(id);
    // }
}

// @RequestMapping("/goodbye")
// @CrossOrigin(origins = { "http://localhost:8100", "http://localhost:8080" })
// public String goodbyeHell() {
// return "{ \"tab2\": \"Goodbye World\" }";
// }