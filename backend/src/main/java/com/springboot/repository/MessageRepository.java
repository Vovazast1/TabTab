package com.springboot.repository;

import com.springboot.payload.MessageDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageDto, Long> {
    List<MessageDto> findAllByRoom(String room);
}
