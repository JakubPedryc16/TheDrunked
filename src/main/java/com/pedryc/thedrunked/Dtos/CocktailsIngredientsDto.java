package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.entities.CocktailsIngredientsEntity;
import com.pedryc.thedrunked.entities.IngredientEntity;
import lombok.Getter;

import java.util.List;

@Getter
public class CocktailsIngredientsDto {

    private final IngredientDto ingredient;
    private final String ingredientAmount;

    public CocktailsIngredientsDto(CocktailsIngredientsEntity cocktailsIngredientsEntity) {
        IngredientEntity ingredientEntity = cocktailsIngredientsEntity.getIngredient();
        this.ingredient = new IngredientDto(ingredientEntity);
        this.ingredientAmount = cocktailsIngredientsEntity.getIngredientAmount();
    }
}
