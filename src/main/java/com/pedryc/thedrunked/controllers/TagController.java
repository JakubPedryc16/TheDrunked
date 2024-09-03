package com.pedryc.thedrunked.controllers;

import com.pedryc.thedrunked.Dtos.DetailedCocktailDto;
import com.pedryc.thedrunked.Dtos.TagDto;
import com.pedryc.thedrunked.services.TagService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TagController {
    private final TagService tagService;
    public TagController(final TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping("/user/tags")
    public List<TagDto> getTags() {
        return tagService.getAllTags();
    }

    @GetMapping("/user/tags/cocktail/{id}")
    public List<DetailedCocktailDto> getCocktail(@PathVariable int id) {
        return tagService.getCocktailsByTagId(id);
    }
}
