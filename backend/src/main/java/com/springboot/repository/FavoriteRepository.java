package com.springboot.repository;

import com.springboot.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserUserId(Long userId);
    Favorite getFavoriteByFavoriteId(Long favoriteId);
}
