package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.CocktailsIngredientsEntity;
import com.pedryc.thedrunked.entities.IngredientEntity;
import lombok.Getter;


@Getter
public class CocktailsIngredientsDto {

    private final long id;
    private final String name;
    private final String image;
    private final String amount;

    public CocktailsIngredientsDto(CocktailsIngredientsEntity cocktailsIngredientsEntity) {
        IngredientEntity ingredientEntity = cocktailsIngredientsEntity.getIngredient();
        this.id = ingredientEntity.getId();
        this.name = ingredientEntity.getName();
        this.image = ingredientEntity.getImage();
        this.amount = cocktailsIngredientsEntity.getAmount();
    }
}
