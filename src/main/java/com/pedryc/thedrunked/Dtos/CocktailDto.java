package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.entities.CocktailsIngredientsEntity;
import com.pedryc.thedrunked.entities.TagEntity;
import com.pedryc.thedrunked.entities.UserEntity;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class CocktailDto {

    private final Long id;
    private final String name;
    private final String description;
    private final String image;
    private final UserEntity userId;
//    private final List<TagDto> cocktailTags;
//    private final List<CocktailsIngredientsDto> cocktailIngredients;

    public CocktailDto(CocktailEntity cocktailEntity
    ) {
        this.id = cocktailEntity.getId();
        this.name = cocktailEntity.getName();
        this.description = cocktailEntity.getDescription();
        this.image = cocktailEntity.getImage();
        this.userId = cocktailEntity.getUserId();

//        List<TagEntity> tagList = cocktailEntity.getCocktailTags();
//        this.cocktailTags = tagList.stream().map(TagDto::new).toList();
//
//        List<CocktailsIngredientsEntity> cocktailsIngredientsEntityList = cocktailEntity.getCocktailIngredients();
//        this.cocktailIngredients = cocktailsIngredientsEntityList.stream().map(CocktailsIngredientsDto::new).toList();
    }

}
