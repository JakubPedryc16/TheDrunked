package com.pedryc.thedrunked.controllers;

import com.pedryc.thedrunked.Dtos.UserDto;
import com.pedryc.thedrunked.services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/users")
     public List<UserDto> users() {
        return userService.getAllUsers();
    }
}
