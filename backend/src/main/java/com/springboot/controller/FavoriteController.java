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

    @GetMapping("{id}")
    public List<FavoriteDto> getFavorites(@PathVariable Long id) {
        List<Favorite> favorites = favoriteService.getFavorites(id);
        return favorites.stream()
                .map(this::favoriteToDto)
                .collect(Collectors.toList());
    }

    private FavoriteDto favoriteToDto(Favorite favorite) {
        FavoriteDto favoriteDto = new FavoriteDto();
        favoriteDto.setFavoriteId(favorite.getFavoriteId());
        favoriteDto.setUserId(favorite.getUser().getUserId());
        favoriteDto.setLocationId(favorite.getLocation().getLocationId());
        return favoriteDto;
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

    @GetMapping
    public Boolean isFavorite(@RequestParam Long userId, @RequestParam Long locationId) {
        return favoriteService.getFavoriteId(userId, locationId) != null;
    }
}
