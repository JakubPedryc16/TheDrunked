package com.pedryc.thedrunked.Dtos;


import com.pedryc.thedrunked.entities.IngredientEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
public class IngredientDto {

    private final long id;
    private final String name;
    private final String image;


    public IngredientDto(IngredientEntity ingredientEntity) {
        this.id = ingredientEntity.getId();
        this.name = ingredientEntity.getName();
        this.image = ingredientEntity.getImage();

    }

}
