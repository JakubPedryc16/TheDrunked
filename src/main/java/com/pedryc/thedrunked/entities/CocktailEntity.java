package com.pedryc.thedrunked.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity(name = "cocktails")
@Setter
@Getter
public class CocktailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cocktail_id")
    private Long id;

    @Column(name = "cocktail_name")
    private String name;

    @Column(name = "cocktail_description")
    private String description;

    @Column(name = "cocktail_image")
    private String image;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "user_id")
    private UserEntity cocktailUser;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "cocktails_tags",
            joinColumns = { @JoinColumn(name = "cocktail_id")},
            inverseJoinColumns = { @JoinColumn(name = "tag_id")}
    )
    List<TagEntity> cocktailTags = new ArrayList<>();

    @OneToMany(mappedBy = "cocktail")
    private List<CocktailsIngredientsEntity> cocktailIngredients = new ArrayList<>();
}
