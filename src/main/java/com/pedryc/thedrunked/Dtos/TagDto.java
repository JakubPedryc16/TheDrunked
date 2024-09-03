package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.TagEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class TagDto {

    private final long id;
    private final String name;

    public TagDto(TagEntity tagEntity
    ) {
        this.id = tagEntity.getId();
        this.name = tagEntity.getName();
    }
}
