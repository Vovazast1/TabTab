package com.springboot.controller;

import com.springboot.entity.User;
import com.springboot.service.FavoriteService;
import com.springboot.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

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
    public ResponseEntity<?> changeUsername(@PathVariable long id, @RequestParam String username) {
        User user = userService.getUserById(id);

        if (user.getUsername().equals(username))
            return ResponseEntity.badRequest().body("Username matches the previous!");

        user.setUsername(username);
        userService.saveUser(user);
        return ResponseEntity.ok("Username successfully changed!");
    }

    @PostMapping("{id}/changeEmail")
    public ResponseEntity<?> changeEmail(@PathVariable long id, @RequestParam String email) {
        User user = userService.getUserById(id);

        if (user.getUsername().equals(email))
            return ResponseEntity.badRequest().body("Email matches the previous!");

        user.setEmail(email);
        userService.saveUser(user);
        return ResponseEntity.ok("Email successfully changed!");
    }

    @GetMapping("{id}/verification")
    public Boolean getVerification(@PathVariable long id) {
        return userService.getVerificationById(id);
    }

    @PostMapping("{id}/avatar")
    public ResponseEntity<?> changeAvatar(@PathVariable long id, @RequestParam long avatar) {
        User user = userService.getUserById(id);

        if (user.getAvatar() == avatar)
            return ResponseEntity.badRequest().body("Avatar matches the previous!");

        user.setAvatar(avatar);
        userService.saveUser(user);
        return ResponseEntity.ok("Avatar successfully changed!");
    }
}