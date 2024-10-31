package com.pedryc.thedrunked.services;

import com.pedryc.thedrunked.Dtos.DetailedCocktailDto;
import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.entities.UserEntity;
import com.pedryc.thedrunked.repositories.CocktailRepository;
import com.pedryc.thedrunked.repositories.IngredientRepository;
import com.pedryc.thedrunked.repositories.TagRepository;
import com.pedryc.thedrunked.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.access.AccessDeniedException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CocktailServiceTest {

    @Mock
    private CocktailRepository cocktailRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private IngredientRepository ingredientRepository;

    @Mock
    private TagRepository tagRepository;

    @InjectMocks
    private CocktailService cocktailService;

    @Test
    void getCocktailByIdShouldReturnDtoWhenCocktailExists() {
        CocktailEntity mockCocktail = new CocktailEntity();
        mockCocktail.setId(1L);
        when(cocktailRepository.findById(1L)).thenReturn(Optional.of(mockCocktail));

        DetailedCocktailDto dto = cocktailService.getCocktailById(1L);

        assertEquals(1L, dto.getId());
    }

    @Test
    void deleteCocktailShouldThrowAccessDeniedForUnauthorizedUser() {
        UserEntity currentUser = new UserEntity();
        currentUser.setId(1L);
        currentUser.setRole("USER");

        UserEntity cocktailOwner = new UserEntity();
        cocktailOwner.setId(2L);

        CocktailEntity cocktail = new CocktailEntity();
        cocktail.setUser(cocktailOwner);

        when(cocktailRepository.findById(anyLong())).thenReturn(Optional.of(cocktail));

        Authentication authentication = Mockito.mock(Authentication.class);
        when(authentication.getName()).thenReturn("currentUser");
        when(userRepository.findByUsername("currentUser")).thenReturn(Optional.of(currentUser));

        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        assertThrows(AccessDeniedException.class, () -> cocktailService.deleteCocktail(1L));
    }

    @Test
    void deleteCocktailShouldNotThrowExceptionForOwnerUser() throws AccessDeniedException {
        UserEntity currentUser = new UserEntity();
        currentUser.setId(1L);
        currentUser.setRole("USER");

        CocktailEntity cocktail = new CocktailEntity();
        cocktail.setUser(currentUser);

        when(cocktailRepository.findById(anyLong())).thenReturn(Optional.of(cocktail));

        Authentication authentication = Mockito.mock(Authentication.class);
        when(authentication.getName()).thenReturn("currentUser");
        when(userRepository.findByUsername("currentUser")).thenReturn(Optional.of(currentUser));

        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        cocktailService.deleteCocktail(1L);
    }
}
