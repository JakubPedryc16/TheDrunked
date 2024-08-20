package com.pedryc.thedrunked.controllers;

import com.pedryc.thedrunked.auth.JwtService;
import com.pedryc.thedrunked.auth.LoginForm;
import com.pedryc.thedrunked.auth.UserDetailService;

import com.pedryc.thedrunked.entities.UserEntity;
import com.pedryc.thedrunked.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailService myUserDetailService;

    @Autowired
    private UserRepository myUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public UserEntity createUser(@RequestBody UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return myUserRepository.save(user);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JwtToken> authenticateAndGetToken(@RequestBody LoginForm loginForm) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginForm.username(), loginForm.password()
        ));
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(myUserDetailService.loadUserByUsername(loginForm.username()));
            return ResponseEntity.ok(new JwtToken(token));
        } else {
            throw new UsernameNotFoundException("Invalid credentials");
        }
    }
    public record JwtToken(String token){}
}


