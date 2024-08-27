package com.pedryc.thedrunked.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

import java.util.List;

@Entity(name = "ingredients")
@Getter
@Setter
public class IngredientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private long id;

    @Column(name = "ingredient_name")
    private String name;

    @Column(name = "ingredient_image")
    private String image;

    @OneToMany(mappedBy = "ingredient")
    private List<CocktailsIngredientsEntity> cocktails = new ArrayList<>();
}
