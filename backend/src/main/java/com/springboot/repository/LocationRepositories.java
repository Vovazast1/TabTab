package com.springboot.repository;

import com.springboot.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepositories extends JpaRepository<Location, Long> {

    Location findByLocationName(String name);

    Location findByLocationId(Long id);

    List<Location> findByActivity(String name);

    List<Location> findByType(String type);
}