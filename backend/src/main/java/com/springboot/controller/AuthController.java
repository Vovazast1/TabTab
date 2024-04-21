package com.springboot.controller;

import com.springboot.entity.User;
import com.springboot.payload.JWTAuthResponse;
import com.springboot.payload.LoginDto;
import com.springboot.payload.RegisterDto;
import com.springboot.repository.UserRepository;
import com.springboot.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody RegisterDto registerDto) {

        if (userRepository.existsByUsername(registerDto.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken!");
        }

        if (userRepository.existsByEmail(registerDto.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already taken!");
        }

        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setBirthday(registerDto.getBirthday());

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.OK).body("User registered successfully");

    }

    @PostMapping("/login")
    public JWTAuthResponse AuthenticateAndGetToken(@RequestBody LoginDto LoginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        LoginDto.getUsernameOrEmail(),
                        LoginDto.getPassword()));
        if (authentication.isAuthenticated()) {
            return JWTAuthResponse.builder()
                    .accessToken(jwtTokenProvider.GenerateToken(LoginDto.getUsernameOrEmail())).build();
        } else {
            throw new UsernameNotFoundException("invalid user request..!!");
        }
    }
}
