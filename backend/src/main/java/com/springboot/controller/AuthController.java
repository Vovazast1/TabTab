package com.springboot.controller;

import com.springboot.payload.JWTAuthResponse;
import com.springboot.payload.LoginDto;
import com.springboot.payload.RegisterDto;
import com.springboot.security.JwtTokenProvider;
import com.springboot.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {
        return authService.register(registerDto);
    }

    @PostMapping("/login")
    public JWTAuthResponse login(@RequestBody LoginDto loginDto) {
        return authService.login(loginDto);
    }

    @RequestMapping(value="/confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token")String confirmationToken) {
        return authService.confirmEmail(confirmationToken);
    }
}
