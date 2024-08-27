package com.pedryc.thedrunked.controllers;

import com.pedryc.thedrunked.Dtos.ComplexCocktailDto;
import com.pedryc.thedrunked.services.CocktailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CocktailController {

    private final CocktailService cocktailService;
    public CocktailController(CocktailService cocktailService){
        this.cocktailService = cocktailService;
    }

    @GetMapping("/user/cocktails")
    public List<ComplexCocktailDto> cocktails() {
        return cocktailService.getAllCocktails();
    }
}
