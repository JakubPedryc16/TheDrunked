package com.pedryc.thedrunked.services;

import com.pedryc.thedrunked.Dtos.UserDto;
import com.pedryc.thedrunked.entities.UserEntity;
import com.pedryc.thedrunked.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDto> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        return users.stream().map(UserDto::new).toList();
    }
}
