package com.pedryc.thedrunked.Dtos;


import com.pedryc.thedrunked.entities.IngredientEntity;

import lombok.Getter;



@Getter
public class IngredientDto {

    private final long ingredientId;
    private final String ingredientName;
    private final String ingredientImage;


    public IngredientDto(IngredientEntity ingredientEntity
    ) {
        this.ingredientId = ingredientEntity.getIngredientId();
        this.ingredientName = ingredientEntity.getIngredientName();
        this.ingredientImage = ingredientEntity.getIngredientImage();

    }

}
