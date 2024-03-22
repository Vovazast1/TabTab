package com.example.Favorite;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepositories extends JpaRepository<Favorite, Long> {

}