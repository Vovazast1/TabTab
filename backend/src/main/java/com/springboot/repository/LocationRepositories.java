package com.springboot.repository;

import com.springboot.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepositories extends JpaRepository<Location, Long> {

    List<Location> findByActivity(String name);

    @Query("select u.image " +
            "from Location u " +
            "where u.locationId = :locationId")
    String getImageByLocationId(Long locationId);
}
