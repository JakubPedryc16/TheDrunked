package com.pedryc.thedrunked.Dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class FormCocktailDto {

    private final Long id;
    private final String name;
    private final String description;
    private final String image;
    private final List<TagDto> tags;
    private final List<CocktailIngredientDto> ingredients;

}

