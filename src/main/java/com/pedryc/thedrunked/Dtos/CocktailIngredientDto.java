package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.CocktailIngredientEntity;
import com.pedryc.thedrunked.entities.IngredientEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CocktailIngredientDto {

    private final long id;
    private final String name;
    private final String image;
    private final String amount;

    public CocktailIngredientDto(CocktailIngredientEntity cocktailIngredientEntity) {
        IngredientEntity ingredientEntity = cocktailIngredientEntity.getIngredient();
        this.id = ingredientEntity.getId();
        this.name = ingredientEntity.getName();
        this.image = ingredientEntity.getImage();
        this.amount = cocktailIngredientEntity.getAmount();
    }
}
