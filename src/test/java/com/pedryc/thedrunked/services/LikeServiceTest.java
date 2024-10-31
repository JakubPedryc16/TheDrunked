package com.pedryc.thedrunked.services;

import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.entities.LikeEntity;
import com.pedryc.thedrunked.entities.UserEntity;
import com.pedryc.thedrunked.repositories.CocktailRepository;
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
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LikeServiceTest {

    @Mock
    private LikeRepository likeRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CocktailRepository cocktailRepository;

    @InjectMocks
    private LikeService likeService;

    @BeforeEach
    void setUp() {
        SecurityContextHolder.clearContext();
    }


    @Test
    void likeCocktailShouldThrowExceptionWhenCocktailNotFound() {
        UserEntity user = new UserEntity();
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("username");
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));

        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(cocktailRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> likeService.likeCocktail(1L));
    }


    @Test
    void likeCocktailShouldThrowExceptionWhenUserAlreadyLiked() {
        UserEntity user = new UserEntity();
        CocktailEntity cocktail = new CocktailEntity();

        when(userRepository.findByUsername(any())).thenReturn(Optional.of(user));
        when(cocktailRepository.findById(anyLong())).thenReturn(Optional.of(cocktail));
        when(likeRepository.findByUserAndCocktail(user, cocktail)).thenReturn(Optional.of(new LikeEntity()));

        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("username");
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        assertThrows(IllegalStateException.class, () -> likeService.likeCocktail(1L));
    }

    @Test
    void likeCocktailShouldAddLike() {
        UserEntity user = new UserEntity();
        CocktailEntity cocktail = new CocktailEntity();

        when(userRepository.findByUsername(any())).thenReturn(Optional.of(user));
        when(cocktailRepository.findById(anyLong())).thenReturn(Optional.of(cocktail));
        when(likeRepository.findByUserAndCocktail(user, cocktail)).thenReturn(Optional.empty());

        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("username");
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        likeService.likeCocktail(1L);

        verify(likeRepository, times(1)).save(any(LikeEntity.class));
    }

    @Test
    void unlikeCocktailShouldThrowExceptionWhenLikeNotFound() {
        UserEntity user = new UserEntity();
        CocktailEntity cocktail = new CocktailEntity();

        when(userRepository.findByUsername(any())).thenReturn(Optional.of(user));
        when(cocktailRepository.findById(anyLong())).thenReturn(Optional.of(cocktail));
        when(likeRepository.findByUserAndCocktail(user, cocktail)).thenReturn(Optional.empty());

        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("username");
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        assertThrows(IllegalStateException.class, () -> likeService.unlikeCocktail(1L));
    }

    @Test
    void getCocktailLikesCountShouldReturnCount() {
        CocktailEntity cocktail = new CocktailEntity();
        when(cocktailRepository.findById(anyLong())).thenReturn(Optional.of(cocktail));
        when(likeRepository.countByCocktail(cocktail)).thenReturn(5L);

        Long count = likeService.getCocktailLikesCount(1L);

        assertEquals(5L, count);
    }

    @Test
    void getUserEntityShouldThrowUnauthorizedException() {
        SecurityContextHolder.getContext().setAuthentication(
                new AnonymousAuthenticationToken("key", "anonymous", Collections.singletonList(() -> "ROLE_ANONYMOUS"))
        );

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> likeService.likeCocktail(1L));
        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatusCode());
        assertEquals("User Not Logged In", exception.getReason());
    }
}
