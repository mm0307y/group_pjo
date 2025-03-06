package com.example.back.service;

import java.util.HashMap;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.example.back.dao.UserDao;
import com.example.back.model.JwtAuthenticationResponse;
import com.example.back.model.RefreshTokenRequest;
import com.example.back.model.Role;
import com.example.back.model.SigninRequest;
import com.example.back.model.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserDao userDao;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    public JwtAuthenticationResponse signin(SigninRequest signinRequest) {
        log.info("signin");
        //UsernamePasswordAuthenticationToken을 생성하여 사용자 이름과 비번을 전달함.
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
        (signinRequest.getUsername(), signinRequest.getPassword()));
        //인증이 성공하면 Dao를 통해 해당 사용자 정보를 데이터 베이스에서 조회함.
        //이 때 만일 사용자가 존재하지 않으면 IllegalArgumentException발생함. 
        User user = userDao.findByUsername(signinRequest.getUsername());
        Role role = user.getRole();
        String username = user.getUsername();
        String email = user.getEmail();
        int id = user.getId();
        String jwt = jwtService.generateToken(user);
        log.info(jwt);
        String refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);
        log.info(refreshToken);
        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setAccessToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        jwtAuthenticationResponse.setRole(role);
        jwtAuthenticationResponse.setUsername(username);
        jwtAuthenticationResponse.setId(id);
        jwtAuthenticationResponse.setEmail(email);
        return jwtAuthenticationResponse;
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {

        log.info("refresh 호출");
        log.info(refreshTokenRequest);
        String userID = jwtService.extractUserName(refreshTokenRequest.getToken());
        User user = userDao.findByUserid(userID);
        if (jwtService.isTokenValid(refreshTokenRequest.getToken(), user)) {
            String jwt = jwtService.generateToken(user);
            String refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

            JwtAuthenticationResponse jwtAuthentucationResponse = new JwtAuthenticationResponse();

            jwtAuthentucationResponse.setAccessToken(jwt);
            jwtAuthentucationResponse.setRefreshToken(refreshToken);

            return jwtAuthentucationResponse;
        }
        return null;
    }
}

