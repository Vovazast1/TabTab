package com.springboot.repository;

import com.springboot.entity.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("confirmationTokenRepository")
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Integer> {
    ConfirmationToken findByConfirmationToken(String confirmationToken);
}