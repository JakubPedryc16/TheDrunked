package com.pedryc.thedrunked.controllers;

import com.pedryc.thedrunked.Dtos.CocktailDto;
import com.pedryc.thedrunked.Dtos.IngredientDto;
import com.pedryc.thedrunked.services.IngredientService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class IngredientController {
    private final IngredientService ingredientService;
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping("/user/ingredients")
    public List<IngredientDto> ingredients() {
        return ingredientService.getAllIngredients();
    }

}
