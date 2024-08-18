package com.pedryc.thedrunked.controllers;

import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.services.CocktailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CocktailController {

    CocktailService cocktailService;
    public CocktailController(CocktailService cocktailService){
        this.cocktailService = cocktailService;
    }

    @GetMapping("/user/cocktails")
    public List<CocktailEntity> cocktails() {
        return cocktailService.getAllCocktails();
    }
}
