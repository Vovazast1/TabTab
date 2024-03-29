package com.springboot.payload;

import lombok.Data;

@Data
public class RegisterDto {
    private String name;
    private String username;
    private String email;
    private String password;
}