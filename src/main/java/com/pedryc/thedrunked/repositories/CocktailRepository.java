package com.pedryc.thedrunked.repositories;

import com.pedryc.thedrunked.entities.CocktailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CocktailRepository extends JpaRepository<CocktailEntity, Long> {
}
