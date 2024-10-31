package com.pedryc.thedrunked.services;

import com.pedryc.thedrunked.Dtos.IngredientDto;
import com.pedryc.thedrunked.Dtos.UserDto;
import com.pedryc.thedrunked.entities.IngredientEntity;
import com.pedryc.thedrunked.entities.LikeEntity;
import com.pedryc.thedrunked.entities.UserEntity;
import com.pedryc.thedrunked.repositories.IngredientRepository;
import com.pedryc.thedrunked.repositories.LikeRepository;
import com.pedryc.thedrunked.repositories.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {
    UserRepository userRepository;
    LikeRepository likeRepository;
    IngredientRepository ingredientRepository;
    public UserService(UserRepository userRepository, LikeRepository likeRepository, IngredientRepository ingredientRepository) {
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public List<UserDto> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        return users.stream().map(UserDto::new).toList();
    }

    public UserDto getUser() throws ResponseStatusException, IllegalArgumentException{
        UserEntity user = getUserEntity();
        return new UserDto(user);
    }

    public List<Long> getLikedIds() {
        UserEntity user = getUserEntity();
        List<LikeEntity> likeEntities = likeRepository.findAllByUser(user);
        List<Long> likedIds = likeEntities.stream().map(likeEntity -> likeEntity.getCocktail().getId()).toList();
        return likedIds;
    }

    public List<IngredientDto> getUserIngredients() {
        UserEntity user = getUserEntity();
        List<IngredientEntity> ingredientEntities = ingredientRepository.findAllByUsers(user);
        List<IngredientDto> userIngredients = ingredientEntities.stream().map(ingredientEntity -> new IngredientDto(ingredientEntity)).toList();
        return userIngredients;
    }

    public void addUserIngredient(IngredientDto ingredientDto) {
        UserEntity user = getUserEntity();
        System.out.println(ingredientDto.getId());
        IngredientEntity ingredientEntity = ingredientRepository.findById(ingredientDto.getId())
            .orElseThrow(() -> new IllegalArgumentException());

        user.getIngredients().add(ingredientEntity);
        userRepository.save(user);
    }

    public void deleteUserIngredient(IngredientDto ingredientDto) {
        UserEntity user = getUserEntity();
        IngredientEntity ingredientEntity = ingredientRepository.findById(ingredientDto.getId())
            .orElseThrow(() -> new IllegalArgumentException());

        user.getIngredients().remove(ingredientEntity);
        userRepository.save(user);
    }

    private UserEntity getUserEntity() throws ResponseStatusException, IllegalArgumentException{
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken || authentication == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User Not Logged In");
        }
        String username= authentication.getName();;
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User Not Found"));

        return user;
    }



}
