package com.springboot.service;

import java.util.List;

import com.springboot.entity.User;
import com.springboot.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepos;

    public List<User> getUsers() {
        return userRepos.findAll();
    }

    public User saveUser(User user) {
        return userRepos.save(user);
    }

    public User getUserById(long id) {
        return userRepos.findByUserId(id);
    }

    public void deleteUserById(long id) {
        User userToDelete = userRepos.findByUserId(id);
        userRepos.delete(userToDelete);
    }

    public Boolean getVerificationById(long id) {
        return userRepos.findByUserId(id).getIsVerified();
    }

    public Long getAvatarById(long id) {
        return userRepos.findByUserId(id).getAvatar();
    }

    public Boolean getUsernameStatus(String username) { return userRepos.existsByUsername(username); }
}
