package com.pedryc.thedrunked.services;

import com.pedryc.thedrunked.Dtos.CocktailDto;
import com.pedryc.thedrunked.Dtos.IngredientDto;
import com.pedryc.thedrunked.Dtos.TagDto;
import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.entities.IngredientEntity;
import com.pedryc.thedrunked.entities.TagEntity;
import com.pedryc.thedrunked.repositories.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {
    private final TagRepository tagRepository;
    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<TagDto> getAllTags() {
        List<TagEntity> tagEntities = tagRepository.findAll();
        return tagEntities.stream().map(TagDto::new).toList();
    }

    public List<CocktailDto> getCocktailsByTagId(long tagId) {
        Optional<TagEntity> tagEntity = tagRepository.findById(tagId);
        return tagEntity.map(entity -> entity.getCocktails().stream()
                .map(CocktailDto::new)
                .toList())
                .orElse(null);
    }
}
