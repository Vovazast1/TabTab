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
    public FavoriteDto addFavorite(@RequestBody FavoriteDto favoriteDTO) {
        return this.favoriteToDto(
                favoriteService.addFavorite(
                        favoriteDTO.userId,
                        favoriteDTO.locationId)
        );
    }

    @DeleteMapping("{favoriteId}")
    public void deleteFavorite(@PathVariable Long favoriteId) {
        favoriteService.deleteFavorite(favoriteId);
    }

    private FavoriteDto favoriteToDto(Favorite favorite) {
        FavoriteDto favoriteDto = new FavoriteDto();
        favoriteDto.favoriteId = favorite.getFavoriteId();
        favoriteDto.userId = favorite.getUser().getUserId();
        favoriteDto.locationId = favorite.getLocation().getLocationId();
        return favoriteDto;
    }
}
