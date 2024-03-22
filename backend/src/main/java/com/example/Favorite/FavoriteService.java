package com.example.Favorite;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {

    @Autowired
    FavoriteRepositories favoriteRepositories;

    public FavoriteService() {
    }

    public List<Favorite> getFavorites() {
        return favoriteRepositories.findAll();
    }

    public Favorite saveFavorite(Favorite favorite) {
        return favoriteRepositories.save(favorite);
    }

    public Favorite getFavoriteByUserId(Long id) {
        return favoriteRepositories.getFavoriteByUserId(id);
    }

    public Favorite getFavoriteByLocationId(Long id) {
        return favoriteRepositories.getFavoriteByLocationId(id);
    }
}
