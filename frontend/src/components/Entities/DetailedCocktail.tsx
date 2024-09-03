import styled from "styled-components";

import { useEffect, useState } from "react";
import { DetailedCocktailDto } from "../../Dtos/DetailedCocktailDto";
import { Ingredient } from "./Ingredient";
import { Tag } from "./Tag";
import { FaHeart } from "react-icons/fa";
import getImageData from "../../utils/fileUtils";



export const DetailedCocktail:React.FC<DetailedCocktailDto> = (({name, image, description, likes, ingredients, tags, handleLike}) => {
    const [imageData, setImageData] = useState<string>("")

    useEffect(() => {
        getImageData(image, "cocktail", setImageData);
    }, []);
    
    return(
        <CocktailDiv>
            <DetailsDiv>
                <CocktailName>{name}</CocktailName>
                <Image src={imageData} alt="Cocktail Image"/>
                <CocktailDescription>{description}</CocktailDescription>
                <div onClick={handleLike}>
                <FaHeart color="aqua"/>
                {likes}
            </div>
            </DetailsDiv>
            <TagDiv>
                {Array.isArray(tags) && tags.map(tag => (
                    <Tag key={tag.id} {...tag}/>
                ))}
            </TagDiv>
            <IngredientDiv>
                {Array.isArray(ingredients) && ingredients.map(ingredient => (
                    <Ingredient key={ingredient.id} {...ingredient}/>
                ))}
            </IngredientDiv>
        </CocktailDiv>
    );
})
const CocktailDiv = styled.div`

    border-radius: 10px;
    height: 450px;
    width: 400px;

    padding: 10px;
`

const IngredientDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
    justify-items: center;

    column-gap: 10px;
    border-radius: 10px;
    padding: 10px;

    height: 180px;
    overflow: auto;
`


const TagDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 2px;
    border-radius: 10px;
    height: 50px;
    overflow: auto;
`

const DetailsDiv = styled.div`
    border-radius: 10px;
`

const CocktailName = styled.div`
    font-size: 32px;
    margin-bottom: 10px;
`

const CocktailDescription = styled.div`
    font-size: 16px;

`

const Image = styled.img`
    object-fit: cover;
    width: 64px;
    border-radius: 10px;
`

