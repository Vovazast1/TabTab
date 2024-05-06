package com.springboot.repository;

import com.springboot.payload.LocationMessageDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationMessageDtoRepository extends JpaRepository<LocationMessageDto, Long> {
    List<LocationMessageDto> findAllByLocationId(Long locationId);
}
