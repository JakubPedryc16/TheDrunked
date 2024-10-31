package com.pedryc.thedrunked.services;

import com.pedryc.thedrunked.Dtos.*;
import com.pedryc.thedrunked.entities.*;
import com.pedryc.thedrunked.repositories.CocktailRepository;
import com.pedryc.thedrunked.repositories.IngredientRepository;
import com.pedryc.thedrunked.repositories.TagRepository;
import com.pedryc.thedrunked.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import org.apache.tomcat.util.http.fileupload.MultipartStream.IllegalBoundaryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Service
public class CocktailService {

    @Autowired
    private final CocktailRepository cocktailRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final IngredientRepository ingredientRepository;

    @Autowired
    private final TagRepository tagRepository;


    public List<DetailedCocktailDto> getAllCocktails() {
        List<CocktailEntity> cocktailEntities = cocktailRepository.findAll();
        return cocktailEntities.stream().map(DetailedCocktailDto::new).toList();

    }

    public DetailedCocktailDto getCocktailById(long id) throws IllegalArgumentException {
        CocktailEntity cocktailEntity = cocktailRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Cocktail Not Found"));
        return new DetailedCocktailDto(cocktailEntity);

    }

    public List<DetailedCocktailDto> getUserCocktails() {

        UserEntity user = getCurrentUser();
        List<CocktailEntity> cocktailEntities;

        cocktailEntities = cocktailRepository.findAllByUser(user);
        
        
        return cocktailEntities.stream().map(DetailedCocktailDto::new).toList();
    }

    public void deleteCocktail(long cocktailId) throws IllegalArgumentException {
        CocktailEntity targetCocktail = cocktailRepository.findById(cocktailId)
                .orElseThrow(() -> new IllegalArgumentException("Cocktail Not Found"));

        UserEntity user = getCurrentUser();
        if(!Objects.equals(user.getId(), targetCocktail.getUser().getId()) && !user.getRole().equals("ADMIN")){
            throw new AccessDeniedException("You do not have permission to edit this cocktail.");
        }

        cocktailRepository.delete(targetCocktail);
    }
    @Transactional
    public void addCocktail(FormCocktailDto cocktailDto) throws ResponseStatusException, IllegalArgumentException {

        CocktailEntity newCocktail = new CocktailEntity();

        UserEntity user = getCurrentUser();

        List<CocktailIngredientEntity> ingredients = getCocktailsIngredients(cocktailDto, newCocktail);

        List<TagEntity> tags = getTags(cocktailDto);

        newCocktail.setName(cocktailDto.getName());
        newCocktail.setImage(cocktailDto.getImage());
        newCocktail.setDescription(cocktailDto.getDescription());
        newCocktail.setUser(user);
        newCocktail.setIngredients(ingredients);
        newCocktail.setTags(tags);
        cocktailRepository.save(newCocktail);
    }
    
    @Transactional
    public void editCocktail(EditCocktailDto cocktailDto) throws IllegalArgumentException {

        CocktailEntity cocktail = cocktailRepository.findById(cocktailDto.getId())
            .orElseThrow(() -> new IllegalArgumentException("Cocktail Not Found"));
    
        UserEntity user = getCurrentUser();
        if(!Objects.equals(user.getId(), cocktail.getUser().getId()) && !user.getRole().equals("ADMIN")){
            throw new AccessDeniedException("You do not have permission to edit this cocktail.");
        }

            cocktail.setName(cocktailDto.getName());
            cocktail.setImage(cocktailDto.getImage());
            cocktail.setDescription(cocktailDto.getDescription());  
            
            cocktailRepository.save(cocktail);
    }

    @Transactional
    public void editCocktailIngredients(EditCocktailIngredientsDto cocktailDto) throws IllegalArgumentException {
        CocktailEntity cocktail = cocktailRepository.findById(cocktailDto.getId())
        .orElseThrow(() -> new IllegalArgumentException("Cocktail Not Found"));

        List<CocktailIngredientEntity> ingredients = getCocktailsIngredients(cocktailDto, cocktail);

        UserEntity user = getCurrentUser();
        if(!Objects.equals(user.getId(), cocktail.getUser().getId()) && !user.getRole().equals("ADMIN")){
            throw new AccessDeniedException("You do not have permission to edit this cocktail.");
        }

        cocktail.getIngredients().clear();
        cocktail.getIngredients().addAll(ingredients);
        cocktailRepository.save(cocktail);
        
    }

    @Transactional
    public void editCocktailTags(EditCocktailTagsDto cocktailDto) throws IllegalArgumentException {
        CocktailEntity cocktail = cocktailRepository.findById(cocktailDto.getId())
        .orElseThrow(() -> new IllegalArgumentException("Cocktail Not Found"));

        List<TagEntity> tags = getTags(cocktailDto);

        UserEntity user = getCurrentUser();
        if(!Objects.equals(user.getId(), cocktail.getUser().getId()) && !user.getRole().equals("ADMIN")){
            throw new AccessDeniedException("You do not have permission to edit this cocktail.");
        }

        cocktail.getTags().clear();
        cocktail.getTags().addAll(tags);
        cocktailRepository.save(cocktail);
    }

    private UserEntity getCurrentUser() throws ResponseStatusException, IllegalArgumentException{
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken || authentication == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User Not Logged In");
        }
        String username= authentication.getName();;
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User Not Found"));

        return user;
    }

    private List<CocktailIngredientEntity> getCocktailsIngredients (
            HasIngredients cocktailDto,
            CocktailEntity newCocktail
         ) {

        List<CocktailIngredientDto> ingredientDtos = cocktailDto.getIngredients();
        if (ingredientDtos == null) {
            return new ArrayList<>();
        }
        List<CocktailIngredientEntity> ingredients = ingredientDtos.stream()
            .map(ingredientDto -> {
                IngredientEntity ingredient = ingredientRepository.findById(ingredientDto.getId())
                        .orElseThrow(() -> new IllegalArgumentException("Ingredient Not Found"));
                   
                CocktailIngredientEntity cocktailsIngredients = new CocktailIngredientEntity();

                cocktailsIngredients.setCocktail(newCocktail);
                cocktailsIngredients.setIngredient(ingredient);
                cocktailsIngredients.setAmount(ingredientDto.getAmount());

                return cocktailsIngredients;
            })
            .toList();

        return ingredients;
    }

    private List<TagEntity> getTags(HasTags cocktailDto){

        List<TagDto> tagDtos = cocktailDto.getTags();
        if (tagDtos == null) {
            tagDtos = new ArrayList<>();
        }
        List<TagEntity> tags = tagDtos.stream()
        .map(tagDto -> {
            TagEntity newTag = tagRepository.findById(tagDto.getId())
                .orElseThrow(() -> new IllegalArgumentException("Ingredient Not Found"));

            return newTag;
        })
        .toList();

        return tags;
    }
}
