package com.springboot.payload;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class JWTAuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
}