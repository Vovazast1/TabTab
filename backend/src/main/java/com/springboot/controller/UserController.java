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

    @GetMapping("{id}")
    public User getUserById(@PathVariable long id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("{userId}")
    public void deleteUserByUserId(@PathVariable long userId) {
        userService.deleteUserById(userId);
    }

    @PostMapping("{id}/changeUsername")
    public ResponseEntity<?> changeUsername(@PathVariable long id, @RequestParam String username) {
        User user = userService.getUserById(id);

        if (user.getUsername().equals(username))
            return ResponseEntity.badRequest().build();

        user.setUsername(username);
        userService.saveUser(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("{id}/changePassword")
    public ResponseEntity<?> changePassword(@PathVariable long id, @RequestParam String password) {
        User user = userService.getUserById(id);

        if (user.getPassword().equals(password))
            return ResponseEntity.badRequest().build();

        user.setPassword(password);
        userService.saveUser(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{id}/verification")
    public Boolean getVerification(@PathVariable long id) {
        return userService.getVerificationById(id);
    }

    @GetMapping("{id}/avatar")
    public Long getAvatar(@PathVariable long id) {
        return userService.getAvatarById(id);
    }

    @PostMapping("{id}/changeAvatar")
    public ResponseEntity<?> changeAvatar(@PathVariable long id, @RequestParam long avatar) {
        User user = userService.getUserById(id);

        if (user.getAvatar() == avatar)
            return ResponseEntity.badRequest().build();

        user.setAvatar(avatar);
        userService.saveUser(user);
        return ResponseEntity.ok().build();
    }
}