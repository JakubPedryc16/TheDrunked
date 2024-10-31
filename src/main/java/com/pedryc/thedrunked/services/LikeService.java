package com.pedryc.thedrunked.services;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public void likeCocktail(long cocktailId) throws IllegalArgumentException, IllegalStateException {
        UserEntity user = getUserEntity();

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

    public void unlikeCocktail(long cocktailId) throws IllegalArgumentException, IllegalStateException {
        UserEntity user = getUserEntity();

        CocktailEntity cocktail = cocktailRepository.findById(cocktailId)
            .orElseThrow(() -> new IllegalArgumentException("Cocktail Not Found"));

        LikeEntity like = likeRepository.findByUserAndCocktail(user, cocktail)
            .orElseThrow(() -> new IllegalStateException("Like Not Found"));

        likeRepository.delete(like);
    }

    public Long getCocktailLikesCount(long cocktailId) throws IllegalArgumentException {
        CocktailEntity cocktail = cocktailRepository.findById(cocktailId)
            .orElseThrow(() -> new IllegalArgumentException("Cocktail Not Found"));

        return likeRepository.countByCocktail(cocktail);

    }

    private UserEntity getUserEntity() throws ResponseStatusException, IllegalArgumentException{
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken || authentication == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User Not Logged In");
        }
        String username= authentication.getName();
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User Not Found"));

        return user;
    }

    
}
