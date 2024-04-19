package com.springboot.controller;

import com.springboot.entity.User;
import com.springboot.payload.JWTAuthResponse;
import com.springboot.payload.LoginDto;
import com.springboot.payload.RegisterDto;
import com.springboot.repository.UserRepository;
import com.springboot.security.JwtTokenProvider;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


public class AuthControllerTest {

    @InjectMocks
    private AuthController authController;
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtTokenProvider jwtTokenProvider;
    @BeforeEach
    void setUp() {
        SecurityContextHolder.clearContext();
        MockitoAnnotations.openMocks(this);
    }
    @Test
    @DisplayName("Test should pass when user enter into account with valid username or email and password")
    void testAuthenticateAndGetToken_WithValidCredentials() {
        String usernameOrEmail = "testUser";
        String password = "testPassword";
        String token = "testToken";

        LoginDto loginDto = new LoginDto(usernameOrEmail, password);
        Authentication authentication = mock(Authentication.class);

        when(authentication.isAuthenticated())
                .thenReturn(true);
        when(authenticationManager
                .authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(jwtTokenProvider
                .GenerateToken(usernameOrEmail))
                .thenReturn(token);

        JWTAuthResponse response = authController.AuthenticateAndGetToken(loginDto);

        verify(authenticationManager)
                .authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtTokenProvider)
                .GenerateToken(usernameOrEmail);
        assertNotNull(response);
        assertEquals(token, response.getAccessToken());
    }
    @Test
    @DisplayName("Test should pass when user enter into account with invalid username or email and password")
    void testAuthenticateAndGetToken_WithInvalidCredentials() {
        String usernameOrEmail = "testUser";
        String password = "testPassword";

        LoginDto loginDto = new LoginDto(usernameOrEmail, password);
        Authentication authentication = mock(Authentication.class);

        when(authentication.isAuthenticated())
                .thenReturn(false);
        when(authenticationManager
                .authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);

        assertThrows(UsernameNotFoundException.class, () -> authController.AuthenticateAndGetToken(loginDto));
    }

    @Test
    @DisplayName("Test should pass when user register with correct credentials")
    void testRegisterUser_Success(){
        RegisterDto registerDto = new RegisterDto("username", "email@example.com", "password", Date.valueOf("1999-01-02"));
        when(userRepository
                .existsByUsername(registerDto.getUsername()))
                .thenReturn(false);
        when(userRepository
                .existsByEmail(registerDto.getEmail()))
                .thenReturn(false);
        when(passwordEncoder
                .encode(registerDto.getPassword()))
                .thenReturn("encodedPassword");

        ResponseEntity<?> response = authController.registerUser(registerDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User registered successfully", response.getBody());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("Test should pass when user login with wrong username")
    void testRegisterUser_WithWrongUsername(){
        RegisterDto registerDto = new RegisterDto("existingUsername", "email@example.com", "password", Date.valueOf("1999-01-02"));
        when(userRepository
                .existsByUsername(registerDto.getUsername()))
                .thenReturn(true);

        ResponseEntity<?> response = authController.registerUser(registerDto);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Username is already taken!", response.getBody());
        verify(userRepository, never())
                .save(any(User.class));
    }

    @Test
    @DisplayName("Test should pass when user login with wrong email")
    void testRegisterUser_WithWrongEmail(){
        RegisterDto registerDto = new RegisterDto("username", "existingEmail@example.com", "password", Date.valueOf("1999-01-02"));
        when(userRepository
                .existsByUsername(registerDto.getUsername()))
                .thenReturn(false);
        when(userRepository
                .existsByEmail(registerDto.getEmail()))
                .thenReturn(true);

        ResponseEntity<?> response = authController.registerUser(registerDto);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Email is already taken!", response.getBody());
        verify(userRepository, never()).save(any(User.class));
    }
}