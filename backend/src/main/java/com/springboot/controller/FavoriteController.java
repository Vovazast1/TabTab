package com.springboot.controller;

import com.springboot.entity.Favorite;
import com.springboot.payload.FavoriteDto;
import com.springboot.service.FavoriteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/v1/favorites")
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

    private FavoriteDto favoriteToDto(Favorite favorite) {
        FavoriteDto favoriteDto = new FavoriteDto();
        favoriteDto.setUserId(favorite.getUser().getUserId());
        favoriteDto.setLocationId(favorite.getLocation().getLocationId());
        return favoriteDto;
    }
}
