package com.springboot.repository;

import com.springboot.entity.Favorite;
import com.springboot.entity.Location;
import com.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserUserId(Long userId);
    Favorite getFavoriteByFavoriteId(Long favoriteId);
}
