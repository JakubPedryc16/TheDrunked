package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.CocktailEntity;

import lombok.Getter;

@Getter
public class CocktailDto {
    private final Long id;
    private final String name;
    private final String description;
    private final String image;
    private final int likes;

    public CocktailDto(CocktailEntity cocktailEntity
    ) {
        this.id = cocktailEntity.getId();
        this.name = cocktailEntity.getName();
        this.description = cocktailEntity.getDescription();
        this.image = cocktailEntity.getImage();
        this.likes = cocktailEntity.countLikes();
    }
}
