package com.example.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.model.JwtAuthenticationResponse;
import com.example.back.model.RefreshTokenRequest;
import com.example.back.model.SigninRequest;
import com.example.back.model.SignupRequest;
import com.example.back.service.AuthenticationService;

import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;
    //로그인 처리 - accessToken발급
    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest signinRequest){
        log.info("sigin 호출 => " + signinRequest);
        return ResponseEntity.ok(authenticationService.signin(signinRequest));
    }
    @PostMapping("/signup")
    public ResponseEntity<Integer> signup(@RequestBody SignupRequest signupRequest){
        log.info("join 호출 => " + signupRequest);
        return ResponseEntity.ok(authenticationService.signup(signupRequest));
    }
    //refreshToken발급
    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshRequest){
        log.info("refresh 호출 => " + refreshRequest);
        return ResponseEntity.ok(authenticationService.refreshToken(refreshRequest));
    }
}
