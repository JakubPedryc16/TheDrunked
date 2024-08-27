package com.pedryc.thedrunked.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "likes")
public class LikeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long likeId;

    @ManyToOne()
    @JoinColumn(name = "like_user_id")
    private UserEntity user;

    @ManyToOne()
    @JoinColumn(name = "like_cocktail_id")
    private CocktailEntity cocktail;
}