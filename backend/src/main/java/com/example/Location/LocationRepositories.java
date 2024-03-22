package com.example.Location;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepositories extends JpaRepository<Location, Long> {

    Location findByLocationName(String name);

    Location findByLocationId(Long id);
}