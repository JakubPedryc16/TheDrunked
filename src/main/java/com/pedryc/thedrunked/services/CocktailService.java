package com.pedryc.thedrunked.services;

import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.repositories.CocktailRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CocktailService {
    private final CocktailRepository cocktailRepository;

    public CocktailService(CocktailRepository cocktailRepository){
        this.cocktailRepository = cocktailRepository;
    }

    public List<CocktailEntity> getAllCocktails() {
        return cocktailRepository.findAll();
    }
}
