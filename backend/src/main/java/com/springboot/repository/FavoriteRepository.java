package com.springboot.repository;

import com.springboot.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUserUserId(Long id);

    Favorite getFavoriteByFavoriteId(Long favoriteId);

    @Query("select u.favoriteId " +
            "from Favorite u " +
            "where u.user.userId = :userId and u.location.locationId = :locationId")
    Long getFavoriteId(Long userId, Long locationId);
}
