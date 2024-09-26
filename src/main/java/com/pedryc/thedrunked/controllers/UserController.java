package com.pedryc.thedrunked.controllers;

import com.pedryc.thedrunked.Dtos.IngredientDto;
import com.pedryc.thedrunked.Dtos.UserDto;
import com.pedryc.thedrunked.services.UserService;

import jakarta.transaction.Transactional;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/user/me")
    public ResponseEntity<?> getCurrentUser() {
        try{
            UserDto user = userService.getUser();
            return ResponseEntity.ok().body(user);
            
        } catch (ResponseStatusException error) {
            return ResponseEntity
                .status(error.getStatusCode())
                .body(error.getMessage());

        } catch (IllegalArgumentException error) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error.getMessage());

        } catch (Exception error) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error.getMessage());
        }
    }

    @GetMapping("/admin/users")
     public List<UserDto> getUsers() {
        return userService.getAllUsers();
    }

    @Transactional
    @GetMapping("/user/liked-ids")
    public List<Long> getLikedIds() {
        return userService.getLikedIds();
    }

    @GetMapping("user/user-ingredients")
    public List<IngredientDto> getUserIngredients() {
        return userService.getUserIngredients();
    }

    @PostMapping("/user/add-user-ingredient") 
    public ResponseEntity<?> addUserIngredient(@RequestBody IngredientDto ingredientDto) {
        try {
            userService.addUserIngredient(ingredientDto);
            return ResponseEntity.ok().body("User Ingredient Sucesfully added");
        } catch(Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    
    @PostMapping("/user/delete-user-ingredient") 
    public ResponseEntity<?> deleteUserIngredient(@RequestBody IngredientDto ingredientDto) {
        try {
            userService.deleteUserIngredient(ingredientDto);
            return ResponseEntity.ok().body("User Ingredient Sucesfully removed");
        } catch(Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
}
