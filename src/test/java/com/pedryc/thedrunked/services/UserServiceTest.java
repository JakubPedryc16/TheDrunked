package com.pedryc.thedrunked.services;

import com.pedryc.thedrunked.Dtos.IngredientDto;
import com.pedryc.thedrunked.Dtos.UserDto;
import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.entities.IngredientEntity;
import com.pedryc.thedrunked.entities.LikeEntity;
import com.pedryc.thedrunked.entities.UserEntity;
import com.pedryc.thedrunked.repositories.IngredientRepository;
import com.pedryc.thedrunked.repositories.LikeRepository;
import com.pedryc.thedrunked.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private LikeRepository likeRepository;

    @Mock
    private IngredientRepository ingredientRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void getAllUsersShouldReturnListOfUsers() {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("TestUser");

        when(userRepository.findAll()).thenReturn(Collections.singletonList(userEntity));

        List<UserDto> users = userService.getAllUsers();

        assertEquals(1, users.size());
        assertEquals("TestUser", users.get(0).getUsername());
    }

    @Test
    void getUserShouldReturnUserDtoWhenUserExists() {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("TestUser");

        setUpAuthentication("TestUser");

        when(userRepository.findByUsername("TestUser")).thenReturn(Optional.of(userEntity));

        UserDto userDto = userService.getUser();

        assertNotNull(userDto);
        assertEquals("TestUser", userDto.getUsername());
    }

    @Test
    void getUserShouldThrowUnauthorizedExceptionWhenUserNotLoggedIn() {
        SecurityContextHolder.clearContext();

        assertThrows(ResponseStatusException.class, () -> userService.getUser());
    }

    @Test
    void getUserShouldThrowExceptionWhenUserNotFound() {
        setUpAuthentication("NonExistentUser");

        when(userRepository.findByUsername("NonExistentUser")).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> userService.getUser());
    }

    @Test
    void getLikedIdsShouldReturnListOfLikedIds() {
        UserEntity userEntity = new UserEntity();
        LikeEntity likeEntity = new LikeEntity();
        likeEntity.setCocktail(new CocktailEntity()); // Assume CocktailEntity has an ID

        setUpAuthentication("TestUser");

        when(userRepository.findByUsername("TestUser")).thenReturn(Optional.of(userEntity));
        when(likeRepository.findAllByUser(userEntity)).thenReturn(Collections.singletonList(likeEntity));

        List<Long> likedIds = userService.getLikedIds();

        assertNotNull(likedIds);
        assertEquals(1, likedIds.size());
        // Assert that the correct cocktail ID is present; adjust as needed
    }

    @Test
    void getUserIngredientsShouldReturnListOfUserIngredients() {
        UserEntity userEntity = new UserEntity();
        IngredientEntity ingredientEntity = new IngredientEntity();
        ingredientEntity.setId(1L);

        setUpAuthentication("TestUser");

        when(userRepository.findByUsername("TestUser")).thenReturn(Optional.of(userEntity));
        when(ingredientRepository.findAllByUsers(userEntity)).thenReturn(Collections.singletonList(ingredientEntity));

        List<IngredientDto> ingredients = userService.getUserIngredients();

        assertNotNull(ingredients);
        assertEquals(1, ingredients.size());
        assertEquals(1L, ingredients.get(0).getId());
    }

    @Test
    void addUserIngredientShouldAddIngredientSuccessfully() {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("TestUser");
        IngredientEntity ingredientEntity = new IngredientEntity();
        ingredientEntity.setId(1L);

        setUpAuthentication("TestUser");

        when(userRepository.findByUsername("TestUser")).thenReturn(Optional.of(userEntity));
        when(ingredientRepository.findById(1L)).thenReturn(Optional.of(ingredientEntity));

        IngredientDto ingredientDto = new IngredientDto();
        ingredientDto.setId(1L);

        userService.addUserIngredient(ingredientDto);

        assertTrue(userEntity.getIngredients().contains(ingredientEntity));
    }

    @Test
    void addUserIngredientShouldThrowExceptionWhenIngredientNotFound() {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("TestUser");

        setUpAuthentication("TestUser");

        when(userRepository.findByUsername("TestUser")).thenReturn(Optional.of(userEntity));
        IngredientDto ingredientDto = new IngredientDto();
        ingredientDto.setId(1L);

        assertThrows(IllegalArgumentException.class, () -> userService.addUserIngredient(ingredientDto));
    }

    @Test
    void deleteUserIngredientShouldRemoveIngredientSuccessfully() {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("TestUser");
        IngredientEntity ingredientEntity = new IngredientEntity();
        ingredientEntity.setId(1L);
        userEntity.getIngredients().add(ingredientEntity);

        setUpAuthentication("TestUser");

        when(userRepository.findByUsername("TestUser")).thenReturn(Optional.of(userEntity));
        when(ingredientRepository.findById(1L)).thenReturn(Optional.of(ingredientEntity));

        IngredientDto ingredientDto = new IngredientDto();
        ingredientDto.setId(1L);

        userService.deleteUserIngredient(ingredientDto);

        assertFalse(userEntity.getIngredients().contains(ingredientEntity));
    }

    @Test
    void deleteUserIngredientShouldThrowExceptionWhenIngredientNotFound() {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("TestUser");

        setUpAuthentication("TestUser");

        when(userRepository.findByUsername("TestUser")).thenReturn(Optional.of(userEntity));
        IngredientDto ingredientDto = new IngredientDto();
        ingredientDto.setId(1L);

        assertThrows(IllegalArgumentException.class, () -> userService.deleteUserIngredient(ingredientDto));
    }

    private void setUpAuthentication(String username) {
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(username);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
