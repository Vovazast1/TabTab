package com.springboot.repository;

import com.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserId(Long id);

    User findByEmailIgnoreCase(String emailId);

    Optional<User> findByUsernameOrEmail(String username, String email);

    User findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query("select u.isVerified " +
            "from User u " +
            "where u.userId = :userId")
    Long getVerification(Long userId);

}