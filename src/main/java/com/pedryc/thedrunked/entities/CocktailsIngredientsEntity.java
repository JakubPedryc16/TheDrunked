package com.pedryc.thedrunked.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "cocktails_ingredients")
@Setter
@Getter
public class CocktailsIngredientsEntity {

    @Id
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "cocktail_id")
    @JsonIgnore
    private CocktailEntity cocktail;

    @Id
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "ingredient_id")
    private IngredientEntity ingredient;

    @Column(name = "ingredient_amount")
    private String ingredientAmount;
}
