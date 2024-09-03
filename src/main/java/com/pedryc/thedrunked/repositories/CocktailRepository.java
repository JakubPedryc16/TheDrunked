package com.pedryc.thedrunked.repositories;

import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.entities.UserEntity;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

public interface CocktailRepository extends JpaRepository<CocktailEntity, Long> {
    List<CocktailEntity> findAllByUser(UserEntity user);
}
