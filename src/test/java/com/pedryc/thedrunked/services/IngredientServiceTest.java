package com.pedryc.thedrunked.services;

import com.pedryc.thedrunked.Dtos.IngredientDto;
import com.pedryc.thedrunked.entities.IngredientEntity;
import com.pedryc.thedrunked.repositories.IngredientRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class IngredientServiceTest {

    @Mock
    private IngredientRepository ingredientRepository;

    @InjectMocks
    private IngredientService ingredientService;

    @Test
    void getAllIngredientsShouldReturnListOfDto() {
        IngredientEntity ingredient1 = new IngredientEntity();
        ingredient1.setName("Vodka");
        ingredient1.setImage("vodka.png");

        IngredientEntity ingredient2 = new IngredientEntity();
        ingredient2.setName("Gin");
        ingredient2.setImage("gin.png");

        List<IngredientEntity> ingredientEntities = new ArrayList<>();
        ingredientEntities.add(ingredient1);
        ingredientEntities.add(ingredient2);

        when(ingredientRepository.findAll()).thenReturn(ingredientEntities);

        List<IngredientDto> ingredientDtos = ingredientService.getAllIngredients();

        assertEquals(2, ingredientDtos.size());
        assertEquals("Vodka", ingredientDtos.get(0).getName());
        assertEquals("gin.png", ingredientDtos.get(1).getImage());
    }

    @Test
    void addIngredientShouldReturnSuccessMessage() {
        IngredientDto ingredientDto = new IngredientDto();
        ingredientDto.setName("Rum");
        ingredientDto.setImage("rum.png");

        ResponseEntity<?> response = ingredientService.addIngredient(ingredientDto);

        assertEquals(ResponseEntity.ok("Succesfully added ingredient"), response);
        verify(ingredientRepository, times(1)).save(any(IngredientEntity.class));
    }

    @Test
    void addIngredientShouldReturnBadRequestOnError() {
        IngredientDto ingredientDto = new IngredientDto();
        ingredientDto.setName("Rum");
        ingredientDto.setImage("rum.png");

        doThrow(new RuntimeException("Database error")).when(ingredientRepository).save(any(IngredientEntity.class));

        ResponseEntity<?> response = ingredientService.addIngredient(ingredientDto);

        assertEquals(ResponseEntity.badRequest().body("Unable to create new ingredient: Database error"), response);
    }
}
