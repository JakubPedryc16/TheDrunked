//package com.pedryc.thedrunked.controllers;
//
//
//
//import com.pedryc.thedrunked.entities.UserEntity;
//import com.pedryc.thedrunked.repositories.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class RegistrationController {
//
//    @Autowired
//    private UserRepository myUserRepository;
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @PostMapping("/register/user")
//    public UserEntity createUser(@RequestBody UserEntity user) {
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        return myUserRepository.save(user);
//    }
//}
