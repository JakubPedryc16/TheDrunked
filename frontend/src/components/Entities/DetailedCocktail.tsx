import styled from "styled-components";

import { useEffect, useState } from "react";
import { IDetailedCocktail, EDIT_MODE } from "../Interfaces/IDetailedCocktail";
import { Ingredient } from "./Ingredient";
import { Tag } from "./Tag";
import { FaEdit, FaHeart } from "react-icons/fa";
import getImageData from "../../utils/fileUtils";



export const DetailedCocktail:React.FC<IDetailedCocktail> = (({name, image, description, likes, ingredients, tags, editable, handleLike, setEditMode, handleDelete}) => {
    const [imageData, setImageData] = useState<string>("")

    useEffect(() => {
        getImageData(image, "cocktail", setImageData);
    }, [image]);
    
    return(
        <CocktailDiv>
            <DetailsDiv>
                {editable && <EditIcon onClick={() => setEditMode(EDIT_MODE.DETAILS)}/>}
                <CocktailName>
                    {name}
                </CocktailName>
                <Image src={imageData} alt="Cocktail Image" loading = "lazy"/>
                <LikesDiv onClick={handleLike}>
                    <FaHeart color="red"/>
                    {likes}
                </LikesDiv>
            </DetailsDiv>
            <DescriptionDiv>
                {description}
            </DescriptionDiv>
            <TagDiv>
                {editable && <EditIcon onClick={() => setEditMode(EDIT_MODE.TAGS)}/>}
                {Array.isArray(tags) && tags.map(tag => (
                    <Tag key={tag.id} {...tag}/>
                ))}
            </TagDiv>
            <IngredientDiv>
                {editable && <EditIcon onClick={() => setEditMode(EDIT_MODE.INGREDIENTS)}/>}
                {Array.isArray(ingredients) && ingredients.map(ingredient => (
                    <Ingredient key={ingredient.id} {...ingredient}/>
                ))}
            </IngredientDiv>
            <Button onClick={handleDelete}>Delete Cocktail</Button>
        </CocktailDiv>
    );
})

const EditIcon = styled(FaEdit)`
    position: absolute;
    top: 10px;   
    right: 10px;

`

const LikesDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;
const CocktailDiv = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-items: start;
    align-items: center;

    gap: 5px;
    border-radius: 10px;
    height: 70vh;
    width: 35vw;


`

const IngredientDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    gap: 10px;
    column-gap: 10px;
    border-radius: 10px;
    padding: 10px;


    height: 200px;
    overflow: auto;

    position: relative;
    width: 90%;
    background-color:  rgba(0,0,0, 0.2);
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

    position: relative;
    width: 90%;
    background-color:  rgba(0,0,0, 0.2);
`

const DetailsDiv = styled.div`
    border-radius: 10px;

    position: relative;
    width: 90%;
    background-color:  rgba(0,0,0, 0.2);

`
const DescriptionDiv = styled.div`
    border-radius: 10px;
    font-size: 16px;
    position: relative;
    width: 90%;
    background-color: rgba(0,0,0, 0.2);
    max-height: 200px;
    overflow: auto;
    white-space: pre-wrap; 
`;

const CocktailName = styled.div`
    font-size: 32px;
    margin-bottom: 10px;
`


const Image = styled.img`
    object-fit: cover;
    width: 128px;
    border-radius: 10px;
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;