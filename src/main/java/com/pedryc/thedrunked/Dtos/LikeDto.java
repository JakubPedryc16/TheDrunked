package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.entities.LikeEntity;
import com.pedryc.thedrunked.entities.UserEntity;

import lombok.Getter;

@Getter
public class LikeDto {
    
    private Long id;
    private UserDto user;
    private CocktailDto cocktail;

    public LikeDto(LikeEntity likeEntity) {
        this.id = likeEntity.getId();
        
        UserEntity userEntity = likeEntity.getUser();
        this.user = new UserDto(userEntity);

        CocktailEntity cocktailEntity = likeEntity.getCocktail();
        this.cocktail = new CocktailDto(cocktailEntity);

    }

}
