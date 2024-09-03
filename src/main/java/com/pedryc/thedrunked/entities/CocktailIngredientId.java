package com.pedryc.thedrunked.entities;

import java.io.Serializable;
import java.util.Objects;

public class CocktailIngredientId implements Serializable {

    private Long cocktail;
    private Long ingredient;

    public CocktailIngredientId() {
    }

    public CocktailIngredientId(Long cocktail, Long ingredient) {
        this.cocktail = cocktail;
        this.ingredient = ingredient;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CocktailIngredientId that = (CocktailIngredientId) o;
        return Objects.equals(cocktail, that.cocktail) &&
               Objects.equals(ingredient, that.ingredient);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cocktail, ingredient);
    }
}
