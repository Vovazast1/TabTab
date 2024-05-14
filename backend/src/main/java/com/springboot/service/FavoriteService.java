package com.springboot.service;

import java.util.List;

import com.springboot.entity.Favorite;
import com.springboot.entity.Location;
import com.springboot.entity.User;
import com.springboot.repository.FavoriteRepository;
import com.springboot.repository.LocationRepositories;
import com.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {
    @Autowired
    FavoriteRepository favoriteRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    LocationRepositories locationRepositories;

    public List<Favorite> getFavorites(Long id) {
        return favoriteRepository.findByUserUserId(id);
    }

    public Long getFavoriteId(Long userId, Long locationId) { return favoriteRepository.getFavoriteId(userId, locationId);}

    public void addFavorite(Long userId, Long locationId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Location location = locationRepositories.findById(locationId)
                .orElseThrow(() -> new RuntimeException("Location not found with ID: " + locationId));

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setLocation(location);
        favoriteRepository.save(favorite);
    }

    public void deleteFavorite(Long favoriteId) {
       favoriteRepository.delete(favoriteRepository.getFavoriteByFavoriteId(favoriteId));
    }
}
