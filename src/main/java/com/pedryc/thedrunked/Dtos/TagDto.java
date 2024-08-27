package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.TagEntity;
import lombok.Getter;

@Getter
public class TagDto {

    private final int id;
    private final String name;

    public TagDto(TagEntity tagEntity
    ) {
        this.id = tagEntity.getId();
        this.name = tagEntity.getName();
    }
}
