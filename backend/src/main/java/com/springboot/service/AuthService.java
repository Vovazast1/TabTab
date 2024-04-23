package com.springboot.service;

import com.springboot.payload.JWTAuthResponse;
import com.springboot.payload.LoginDto;
import com.springboot.payload.RegisterDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    JWTAuthResponse login(LoginDto loginDto);

    ResponseEntity register(RegisterDto registerDto);

    ResponseEntity confirmEmail(String confirmationToken);
}