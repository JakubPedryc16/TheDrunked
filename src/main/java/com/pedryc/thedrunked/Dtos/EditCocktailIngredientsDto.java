package com.pedryc.thedrunked.Dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class EditCocktailIngredientsDto implements HasIngredients{

    private long id;
    private List<CocktailIngredientDto> ingredients;
}

