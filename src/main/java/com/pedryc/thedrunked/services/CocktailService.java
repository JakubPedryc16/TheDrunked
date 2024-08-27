package com.pedryc.thedrunked.services;

import com.pedryc.thedrunked.Dtos.ComplexCocktailDto;
import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.repositories.CocktailRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CocktailService {
    private final CocktailRepository cocktailRepository;

    public CocktailService(CocktailRepository cocktailRepository){
        this.cocktailRepository = cocktailRepository;
    }

    public List<ComplexCocktailDto> getAllCocktails() {
        List<CocktailEntity> cocktailEntities = cocktailRepository.findAll();
        return cocktailEntities.stream().map(ComplexCocktailDto::new).toList();

    }
}
