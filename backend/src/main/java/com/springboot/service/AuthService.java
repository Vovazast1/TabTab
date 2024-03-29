package com.springboot.service;

import com.springboot.payload.LoginDto;
import com.springboot.payload.RegisterDto;

public interface AuthService {
    String login(LoginDto loginDto);

    String register(RegisterDto registerDto);
}