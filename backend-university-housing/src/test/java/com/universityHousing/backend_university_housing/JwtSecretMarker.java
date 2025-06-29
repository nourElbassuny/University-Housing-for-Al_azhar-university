package com.universityHousing.backend_university_housing;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Encoders;
import org.junit.jupiter.api.Test;

import javax.crypto.SecretKey;

public class JwtSecretMarker {
    @Test
    public void generateSecretKey(){
        SecretKey secretKey= Jwts.SIG.HS512.key().build();
        String secret= Encoders.BASE64.encode(secretKey.getEncoded());
        System.out.println(secret);
    }
}
