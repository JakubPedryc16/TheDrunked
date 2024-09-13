package com.pedryc.thedrunked.controllers;

import com.pedryc.thedrunked.Dtos.IngredientDto;
import com.pedryc.thedrunked.Dtos.TagDto;
import com.pedryc.thedrunked.services.IngredientService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class IngredientController {
    private final IngredientService ingredientService;
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping("/user/ingredients")
    public List<IngredientDto> getIngredients() {
        return ingredientService.getAllIngredients();
    }

    @PostMapping("/user/ingredient/add")
    public ResponseEntity<?> addIngredient(@RequestBody IngredientDto ingredient) {
        return ingredientService.addIngredient(ingredient);
    }
}


