package com.pedryc.thedrunked.Dtos;


import com.pedryc.thedrunked.entities.IngredientEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
public class IngredientDto {

    private long id;
    private String name;
    private String image;


    public IngredientDto() {}

    public IngredientDto(IngredientEntity ingredientEntity) {
        this.id = ingredientEntity.getId();
        this.name = ingredientEntity.getName();
        this.image = ingredientEntity.getImage();

    }

}
