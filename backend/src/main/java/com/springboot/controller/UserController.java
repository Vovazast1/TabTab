package com.springboot.controller;

import com.springboot.entity.User;
import com.springboot.service.FavoriteService;
import com.springboot.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    FavoriteService favoriteService;

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("{name}")
    public User getUserByName(@PathVariable String name) {
        return userService.getUserByName(name);
    }

    @GetMapping("{id}")
    public User getUserById(@PathVariable long id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("user/{id}")
    public void deleteUserById(@PathVariable long id) { userService.deleteUserById(id); }

    @PostMapping("user/{id}/changeUsername")
    public ResponseEntity<?> changeUsername(@PathVariable long id, @RequestBody String name) {
        User user = userService.getUserById(id);

        if (user.getUsername().equals(name))
            return ResponseEntity.badRequest().body("Name matches the previous!");

        user.setUsername(name);
        userService.saveUser(user);
        return ResponseEntity.ok("Name successfully changed!");
    }

    @PostMapping("user/{id}/changeEmail")
    public ResponseEntity<?> changeEmail(@PathVariable long id, @RequestBody String email) {
        User user = userService.getUserById(id);

        if (user.getUsername().equals(email))
            return ResponseEntity.badRequest().body("Email matches the previous!");

        user.setEmail(email);
        userService.saveUser(user);
        return ResponseEntity.ok("Email successfully changed!");
    }
}