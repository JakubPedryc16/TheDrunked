package com.pedryc.thedrunked.repositories;

import com.pedryc.thedrunked.entities.IngredientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<IngredientEntity, Long> {

}
