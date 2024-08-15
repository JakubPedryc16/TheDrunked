package com.pedryc.thedrunked.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userId;

}
