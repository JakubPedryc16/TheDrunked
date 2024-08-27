package com.pedryc.thedrunked.services;

import org.springframework.stereotype.Service;

import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.entities.LikeEntity;
import com.pedryc.thedrunked.entities.UserEntity;
import com.pedryc.thedrunked.repositories.CocktailRepository;
import com.pedryc.thedrunked.repositories.LikeRepository;
import com.pedryc.thedrunked.repositories.UserRepository;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final CocktailRepository cocktailRepository;

    public LikeService(
        LikeRepository likeRepository,
        UserRepository userRepository,
        CocktailRepository cocktailRepository
        ) {
        this.likeRepository = likeRepository;
        this.userRepository = userRepository;
        this.cocktailRepository = cocktailRepository;
    }

    public void likeCocktail(Long userId, Long cocktailId) throws IllegalArgumentException, IllegalStateException {
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User Not Found"));

        CocktailEntity cocktail = cocktailRepository.findById(cocktailId)
            .orElseThrow(() -> new IllegalArgumentException("Cocktail Not Found"));

        if (likeRepository.findByUserAndCocktail(user, cocktail).isPresent()) {
            throw new IllegalStateException("User Already Liked This Cocktail");
        }

        LikeEntity like = new LikeEntity();
        like.setCocktail(cocktail);
        like.setUser(user);
        likeRepository.save(like);
    }

    public void unlikeCocktail(Long userId, Long cocktailId) throws IllegalArgumentException, IllegalStateException {
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User Not Found"));

        CocktailEntity cocktail = cocktailRepository.findById(cocktailId)
            .orElseThrow(() -> new IllegalArgumentException("Cocktail Not Found"));

        LikeEntity like = likeRepository.findByUserAndCocktail(user, cocktail)
            .orElseThrow(() -> new IllegalStateException("Like Not Found"));

        likeRepository.delete(like);
    }

    public Long getCocktailLikesCount(Long cocktailId) throws IllegalArgumentException {
        CocktailEntity cocktail = cocktailRepository.findById(cocktailId)
            .orElseThrow(() -> new IllegalArgumentException("Cocktail Not Found"));

        return likeRepository.countByCocktail(cocktail);

    }


    
}
