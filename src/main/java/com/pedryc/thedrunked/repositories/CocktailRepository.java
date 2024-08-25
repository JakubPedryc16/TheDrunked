package com.pedryc.thedrunked.repositories;

import com.pedryc.thedrunked.entities.CocktailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CocktailRepository extends JpaRepository<CocktailEntity, Long> {
}
