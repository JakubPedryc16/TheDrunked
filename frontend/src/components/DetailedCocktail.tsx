import styled from "styled-components";
import { DetailedCocktailDto } from "../Dtos/DetailedCocktailDto";
import { Ingredient } from "./Ingredient";
import { Tag } from "./Tag";


export const DetailedCocktail:React.FC<DetailedCocktailDto> = (({name, image, description, likes, ingredients, tags}) => {
    return(
        <div>
            <div>{name}</div>
            <div>{image}</div>
            <div>{description}</div>
            <div>{likes}</div>
            <IngredientDiv>
                {Array.isArray(ingredients) && ingredients.map(ingredient => (
                    <Ingredient key={ingredient.id} {...ingredient}/>
                ))}
            </IngredientDiv>
            <TagDiv>
                {Array.isArray(tags) && tags.map(tag => (
                    <Tag key={tag.id} {...tag}/>
                ))}
            </TagDiv>
        </div>
    );
})


const IngredientDiv = styled.div`
    background-color: red;
`


const TagDiv = styled.div`
    background-color: green;
`