package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.UserEntity;

import lombok.Getter;

@Getter
public class UserDto {

    private final Long id;
    private final String username;
    private final String role;

    public UserDto(UserEntity userEntity) {
        this.id = userEntity.getUserId();
        this.username = userEntity.getUsername();
        this.role = userEntity.getRole();
    }
}
