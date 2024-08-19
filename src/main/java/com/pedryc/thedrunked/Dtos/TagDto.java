package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.CocktailEntity;
import com.pedryc.thedrunked.entities.IngredientEntity;
import com.pedryc.thedrunked.entities.TagEntity;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class TagDto {

    private final int tagId;
    private final String tagName;

    public TagDto(TagEntity tagEntity
    ) {
        this.tagId = tagEntity.getTagId();
        this.tagName = tagEntity.getTagName();
    }
}
