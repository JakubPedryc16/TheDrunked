package com.pedryc.thedrunked.repositories;

import com.pedryc.thedrunked.entities.IngredientEntity;
import com.pedryc.thedrunked.entities.UserEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<IngredientEntity, Long> {
    List<IngredientEntity> findAllByUsers(UserEntity user);
}
