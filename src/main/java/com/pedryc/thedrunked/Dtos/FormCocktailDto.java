package com.pedryc.thedrunked.Dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class FormCocktailDto implements HasTags, HasIngredients{

    private  Long id;
    private  String name;
    private  String description;
    private  String image;
    private  List<TagDto> tags;
    private  List<CocktailIngredientDto> ingredients;

    public FormCocktailDto() {

    }
}

