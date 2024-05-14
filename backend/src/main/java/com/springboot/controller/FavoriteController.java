package com.springboot.controller;

import com.springboot.entity.Favorite;
import com.springboot.payload.FavoriteDto;
import com.springboot.service.FavoriteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/v1/favorite")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping
    public List<FavoriteDto> getFavorites(@RequestParam Long userId) {
        List<Favorite> favorites = favoriteService.getFavorites(userId);
        return favorites.stream()
                .map(this::favoriteToDto)
                .collect(Collectors.toList());
    }

    private FavoriteDto favoriteToDto(Favorite favorite) {
        return new FavoriteDto(
                favorite.getFavoriteId(),
                favorite.getUser().getUserId(),
                favorite.getLocation().getLocationId(),
                favorite.getLocation().getImage(),
                favorite.getLocation().getLocationName()
        );
    }

    @PostMapping
    public void addFavorite(@RequestBody FavoriteDto favoriteDTO) {
        Long favoriteId = favoriteService.getFavoriteId(favoriteDTO.getUserId(), favoriteDTO.getLocationId());

        if (favoriteId != null) {
            this.favoriteService.deleteFavorite(favoriteId);
            return;
        }

        this.favoriteService.addFavorite(favoriteDTO.getUserId(), favoriteDTO.getLocationId());
    }

    @DeleteMapping("{favoriteId}")
    public void deleteFavorite(@PathVariable Long favoriteId) {
        favoriteService.deleteFavorite(favoriteId);
    }

    @DeleteMapping
    public void deleteFavorites(@RequestParam Long userId) {
        List<Favorite> favorites = favoriteService.getFavorites(userId);
        for (Favorite favorite: favorites) {
            favoriteService.deleteFavorite(favorite.getFavoriteId());
        }
    }
}
