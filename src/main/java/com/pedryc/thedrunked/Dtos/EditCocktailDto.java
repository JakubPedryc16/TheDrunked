package com.pedryc.thedrunked.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class EditCocktailDto {

    private long id;
    private String name;
    private String description;
    private String image;
}

