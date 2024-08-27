package com.pedryc.thedrunked.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "cocktails_ingredients")
@Setter
@Getter
public class CocktailsIngredientsEntity {

    @Id
    @ManyToOne()
    @JoinColumn(name = "cocktail_id")
    private CocktailEntity cocktail;

    @Id
    @ManyToOne()
    @JoinColumn(name = "ingredient_id")
    private IngredientEntity ingredient;

    @Column(name = "ingredient_amount")
    private String amount;
}
