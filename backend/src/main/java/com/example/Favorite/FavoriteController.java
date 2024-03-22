package com.example.Favorite;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class FavoriteController {

    @Autowired
    FavoriteService favoriteService;

    @GetMapping("getFavorites")
    public List<Favorite> getFavorites() {
        return favoriteService.getFavorites();
    }

    @PostMapping("addFavorite")
    public Favorite saveFavorite(@RequestBody Favorite favorite) {
        return favoriteService.saveFavorite(favorite);
    }

    @GetMapping("getFavoriteByUserId")
    public Favorite getFavoriteByUserId(Long id) {
        return favoriteService.getFavoriteByUserId(id);
    }

    @GetMapping("getFavoriteByFavoriteId")
    public Favorite getFavoriteByLocationId(Long id) {
        return favoriteService.getFavoriteByLocationId(id);
    }
}
