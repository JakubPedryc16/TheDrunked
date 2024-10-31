package com.pedryc.thedrunked.services;

import com.pedryc.thedrunked.Dtos.DetailedCocktailDto;
import com.pedryc.thedrunked.Dtos.TagDto;
import com.pedryc.thedrunked.entities.TagEntity;
import com.pedryc.thedrunked.repositories.TagRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TagServiceTest {

    @Mock
    private TagRepository tagRepository;

    @InjectMocks
    private TagService tagService;

    @Test
    void getAllTagsShouldReturnListOfTags() {
        TagEntity tagEntity = new TagEntity();
        tagEntity.setName("Test Tag");

        when(tagRepository.findAll()).thenReturn(Collections.singletonList(tagEntity));

        List<TagDto> tags = tagService.getAllTags();

        assertEquals(1, tags.size());
        assertEquals("Test Tag", tags.get(0).getName());
    }

    @Test
    void getCocktailsByTagIdShouldReturnListOfCocktailsWhenTagExists() {
        TagEntity tagEntity = new TagEntity();
        tagEntity.setName("Test Tag");
        tagEntity.setCocktails(Collections.emptyList());

        when(tagRepository.findById(1L)).thenReturn(Optional.of(tagEntity));

        List<DetailedCocktailDto> cocktails = tagService.getCocktailsByTagId(1L);

        assertNotNull(cocktails);
        assertTrue(cocktails.isEmpty());
    }

    @Test
    void getCocktailsByTagIdShouldReturnNullWhenTagDoesNotExist() {
        when(tagRepository.findById(1L)).thenReturn(Optional.empty());

        List<DetailedCocktailDto> cocktails = tagService.getCocktailsByTagId(1L);

        assertNull(cocktails);
    }

    @Test
    void addTagShouldReturnOkResponseWhenTagIsAddedSuccessfully() {
        TagDto tagDto = new TagDto();
        tagDto.setName("New Tag");

        ResponseEntity<?> response = tagService.addTag(tagDto);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Succesfully added tag", response.getBody());
    }

    @Test
    void addTagShouldReturnBadRequestResponseWhenExceptionOccurs() {
        TagDto tagDto = new TagDto();
        tagDto.setName("Invalid Tag");

        when(tagRepository.save(any(TagEntity.class))).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<?> response = tagService.addTag(tagDto);

        assertEquals(400, response.getStatusCodeValue());
        assertTrue(response.getBody().toString().contains("Unable to create new tag"));
    }
}
