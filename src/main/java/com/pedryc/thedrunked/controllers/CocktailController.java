package com.pedryc.thedrunked.controllers;

import com.pedryc.thedrunked.Dtos.FormCocktailDto;
import com.pedryc.thedrunked.Dtos.DetailedCocktailDto;
import com.pedryc.thedrunked.services.CocktailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class CocktailController {

    private final CocktailService cocktailService;
    public CocktailController(CocktailService cocktailService){
        this.cocktailService = cocktailService;
    }

    @GetMapping("/user/me/cocktails")
    public ResponseEntity<DetailedCocktailDto> getUserCocktails() {
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/user/cocktails")
    public List<DetailedCocktailDto> getCocktails() {
        return cocktailService.getAllCocktails();
    }

    @GetMapping("/user/cocktail")
    public DetailedCocktailDto getCocktailById(@RequestParam long id) {
        return cocktailService.getCocktailById(id);
    }

    @DeleteMapping("/user/cocktail/delete")
    public ResponseEntity<?> deleteCocktail(@RequestParam long cocktailId) {
        try {
            cocktailService.deleteCocktail(cocktailId);
            return ResponseEntity.noContent().build();
        } catch(IllegalArgumentException error) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }

    @PostMapping("/user/cocktail/add")
    public ResponseEntity<?> addCocktail(@RequestBody FormCocktailDto newCocktail) {
        try {
            cocktailService.addCocktail(newCocktail);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Cocktail Successfully Created");

        } catch(ResponseStatusException error) {
            return ResponseEntity
                    .status(error.getStatusCode())
                    .body(error.getMessage());
        } catch (IllegalArgumentException error){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }
}
