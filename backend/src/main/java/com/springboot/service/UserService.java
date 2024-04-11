package com.springboot.service;

import java.util.List;
import java.util.Optional;

import com.springboot.entity.User;
import com.springboot.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepos;

    public UserService() {
    }

    public List<User> getUsers() {
        return userRepos.findAll();
    }

    public User saveUser(User user) {
        return userRepos.save(user);
    }

    public Optional<User> getUser(String name) {
        return userRepos.findByUsername(name);
    }

}
