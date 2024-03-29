//package com.springboot.repository;
//
//import com.springboot.entity.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.Optional;
//
//public interface UsersRepository extends JpaRepository<Users, Long> {
//    Optional<Users> findByEmail(String email);
//    Optional<Users> findByUsernameOrEmail(String username, String email);
//    Optional<Users> findByUsername(String username);
//    Boolean existsByUsername(String username);
//    Boolean existsByEmail(String email);
//}