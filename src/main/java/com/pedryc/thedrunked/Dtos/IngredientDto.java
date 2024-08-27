package com.pedryc.thedrunked.Dtos;


import com.pedryc.thedrunked.entities.IngredientEntity;

import lombok.Getter;



@Getter
public class IngredientDto {

    private final long id;
    private final String name;
    private final String image;


    public IngredientDto(IngredientEntity ingredientEntity
    ) {
        this.id = ingredientEntity.getId();
        this.name = ingredientEntity.getName();
        this.image = ingredientEntity.getImage();

    }

}
