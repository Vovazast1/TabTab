package com.springboot.repository;

import com.springboot.entity.LocationMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationMessageRepository extends JpaRepository<LocationMessage, Long> {
    List<LocationMessage> findByLocationLocationId(Long locationId);
}
