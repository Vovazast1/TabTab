package com.springboot.controller;

import com.springboot.entity.User;
import com.springboot.service.FavoriteService;
import com.springboot.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1/user")
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

    @GetMapping("{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping("{id}")
    public User getUserById(@PathVariable long id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("{id}")
    public void deleteUserById(@PathVariable long id) {
        userService.deleteUserById(id);
    }

    @PostMapping("{id}/changeUsername")
    public ResponseEntity<?> changeUsername(@PathVariable long id, @RequestParam String name) {
        User user = userService.getUserById(id);

        if (user.getUsername().equals(name))
            return ResponseEntity.badRequest().body("Username matches the previous!");

        user.setUsername(name);
        userService.saveUser(user);
        return ResponseEntity.ok("Username successfully changed!");
    }

    @PostMapping("{id}/changePassword")
    public ResponseEntity<?> changePassword(@PathVariable long id, @RequestParam String password) {
        User user = userService.getUserById(id);

        if (user.getPassword().equals(password))
            return ResponseEntity.badRequest().body("Password matches the previous!");

        user.setPassword(password);
        userService.saveUser(user);
        return ResponseEntity.ok("Password successfully changed!");
    }

    @GetMapping("{id}/verification")
    public Long getVerification(@PathVariable long id) {
        return userService.getVerificationById(id);
    }

    @PostMapping("{id}/changeAvatar")
    public ResponseEntity<?> changeAvatar(@PathVariable long id, @RequestParam long avatar) {
        User user = userService.getUserById(id);

        if (user.getAvatar() == avatar)
            return ResponseEntity.badRequest().body("Avatar matches the previous!");

        user.setAvatar(avatar);
        userService.saveUser(user);
        return ResponseEntity.ok("Avatar successfully changed!");
    }
}