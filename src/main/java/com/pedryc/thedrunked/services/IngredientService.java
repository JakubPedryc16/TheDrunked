package com.pedryc.thedrunked.services;

import com.pedryc.thedrunked.Dtos.IngredientDto;
import com.pedryc.thedrunked.entities.IngredientEntity;
import com.pedryc.thedrunked.repositories.IngredientRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;
    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public List<IngredientDto> getAllIngredients() {
        List<IngredientEntity> ingredients = ingredientRepository.findAll();
        return ingredients.stream().map(IngredientDto::new).toList();
    }

    public ResponseEntity<?> addIngredient(IngredientDto ingredient) {
        try {
            IngredientEntity newIngredient = new IngredientEntity();
            newIngredient.setImage(ingredient.getImage());
            newIngredient.setName(ingredient.getName());

            ingredientRepository.save(newIngredient);
            return ResponseEntity.ok("Succesfully added ingredient");
        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Unable to create new ingredient: " + error.getMessage());
        }
    }
    
}
