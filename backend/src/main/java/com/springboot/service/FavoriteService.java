package com.springboot.service;

import java.util.List;

import com.springboot.entity.Favorite;
import com.springboot.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {
    @Autowired
    FavoriteRepository favoriteRepository;

    public List<Favorite> getAllFavorites() {
        return favoriteRepository.findAll();
    }

//     public void addFavorite(Long userId, Long locationId) {
//     FavoriteId id = new FavoriteId(userId, locationId);
//     Favorite favorite = new Favorite(id);
//     favoriteRepository.save(favorite);
//     }
}
