//package com.springboot.user;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
////import com.example.Favorite.Favorite;
//
//@Service
//public class UserService {
//
//    @Autowired
//    UserRepository userRepos;
//
//    public UserService() {
//    }
//
//    public List<User> getUsers() {
//        return userRepos.findAll();
//    }
//
//    public User saveUser(User user) {
//        return userRepos.save(user);
//    }
//
//    public User getUser(String name) {
//        return userRepos.findByUserName(name);
//    }
//
//    // public Set<Favorite> getUserFavorites(Long id) {
//    // return userRepos.findByUserId(id).getFavorites();
//    // }
//
//}
