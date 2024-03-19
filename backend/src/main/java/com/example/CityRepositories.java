package com.example;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepositories extends JpaRepository<City, Long> {

    City findByCityname(String cityname);
}
