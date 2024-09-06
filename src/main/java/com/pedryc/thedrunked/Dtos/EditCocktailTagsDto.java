package com.pedryc.thedrunked.Dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class EditCocktailTagsDto implements HasTags{

    private long id;
    private List<TagDto> tags;
}

