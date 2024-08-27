package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.entities.CocktailsIngredientsEntity;
import com.pedryc.thedrunked.entities.TagEntity;
import com.pedryc.thedrunked.entities.UserEntity;
import lombok.Getter;

import java.util.List;

@Getter
public class ComplexCocktailDto {

    private final Long id;
    private final String name;
    private final String description;
    private final String image;
    private final UserDto user;
    private final int likes;
    private final List<TagDto> tags;
    private final List<CocktailsIngredientsDto> ingredients;

    public ComplexCocktailDto(CocktailEntity cocktailEntity
    ) {
        this.id = cocktailEntity.getId();
        this.name = cocktailEntity.getName();
        this.description = cocktailEntity.getDescription();
        this.image = cocktailEntity.getImage();
        this.likes = cocktailEntity.countLikes();
        
        UserEntity userEntity = cocktailEntity.getUser();
        this.user = userEntity != null ? new UserDto(userEntity) : null;

        List<TagEntity> tagList = cocktailEntity.getTags();
        this.tags = tagList.stream().map(TagDto::new).toList();
//
        List<CocktailsIngredientsEntity> cocktailsIngredientsEntityList = cocktailEntity.getIngredients();
        this.ingredients = cocktailsIngredientsEntityList.stream().map(CocktailsIngredientsDto::new).toList();
    }

}
