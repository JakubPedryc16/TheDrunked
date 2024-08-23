package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.entities.CocktailsIngredientsEntity;
import com.pedryc.thedrunked.entities.TagEntity;
import com.pedryc.thedrunked.entities.UserEntity;
import lombok.Getter;

import java.util.List;

@Getter
public class CocktailDto {

    private final Long id;
    private final String name;
    private final String description;
    private final String image;
    private final UserDto user;
    private final List<TagDto> tags;
    private final List<CocktailsIngredientsDto> ingredients;

    public CocktailDto(CocktailEntity cocktailEntity
    ) {
        this.id = cocktailEntity.getId();
        this.name = cocktailEntity.getName();
        this.description = cocktailEntity.getDescription();
        this.image = cocktailEntity.getImage();

        UserEntity userEntity = cocktailEntity.getCocktailUser();
        this.user = userEntity != null ? new UserDto(userEntity) : null;

        List<TagEntity> tagList = cocktailEntity.getCocktailTags();
        this.tags = tagList.stream().map(TagDto::new).toList();
//
        List<CocktailsIngredientsEntity> cocktailsIngredientsEntityList = cocktailEntity.getCocktailIngredients();
        this.ingredients = cocktailsIngredientsEntityList.stream().map(CocktailsIngredientsDto::new).toList();
    }

}