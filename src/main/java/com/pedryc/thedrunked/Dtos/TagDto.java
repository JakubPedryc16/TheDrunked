package com.pedryc.thedrunked.Dtos;

import com.pedryc.thedrunked.entities.TagEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class TagDto {

    private long id;
    private String name;

    public TagDto(TagEntity tagEntity
    ) {
        this.id = tagEntity.getId();
        this.name = tagEntity.getName();
    }
    public TagDto() {

    }
}
