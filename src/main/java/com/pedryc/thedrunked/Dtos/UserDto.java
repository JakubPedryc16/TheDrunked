package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.UserEntity;

import lombok.Getter;

@Getter
public class UserDto {

    private final Long userId;
    private final String username;
    private final String role;

    public UserDto(UserEntity userEntity) {
        this.userId = userEntity.getUserId();
        this.username = userEntity.getUsername();
        this.role = userEntity.getRole();
    }
}
