package com.springboot.controller;

import com.springboot.entity.Favorite;
import com.springboot.service.FavoriteService;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {
    @Autowired
    FavoriteService favoriteService;

    @GetMapping("/getFavorites")
    public List<Favorite> getAllFavorites() {
        return favoriteService.getAllFavorites();
    }

}
