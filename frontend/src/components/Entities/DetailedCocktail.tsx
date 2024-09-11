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
            
            
            <NameDiv>
                {editable && <EditIcon onClick={() => setEditMode(EDIT_MODE.DETAILS)}/>}
                {name}
            </NameDiv>
            <ImageContainerDiv>
                <Image src={imageData} alt="Cocktail Image" loading = "lazy"/>
            </ImageContainerDiv>
        
            <DescriptionDiv>
                {description}
            </DescriptionDiv>
            <TagDiv>
                {editable && <EditIcon onClick={() => setEditMode(EDIT_MODE.TAGS)}/>}
                {Array.isArray(tags) && tags.map(tag => (
                    <Tag key={tag.id} {...tag}/>
                ))}
                <LikesDiv onClick={handleLike}>
                    <FaHeart color="red"/>
                    <LikesText>{likes}</LikesText>
                </LikesDiv>
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
    top: 5px;
    right: 10px;

`
const LikesText = styled.div`
    font-size: 14px;
    color: white;
    margin-left: 5px;
`

const LikesDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto; 
  padding-right: 20px;
`;

const CocktailDiv = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-items: start;
    align-items: center;
    gap: 5px;
 
    border-radius: 10px;
    height: 75vh;
    width: 35vw;

    overflow: auto;
    &::-webkit-scrollbar {
        display: none; 
    }
`

const IngredientDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    gap: 10px;
    border-radius: 10px;
    padding: 10px;

    position: relative;
    width: 90%;
    background-color:  rgba(0,0,0, 0.2);
    padding: 20px 30px 20px 20px;
`


const TagDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;

    justify-content: start;
    align-items: center;

    border-radius: 10px;
    gap: 5px;
    padding: 20px 30px 20px 20px;

    background-color: rgba(0, 0, 0, 0.2);

    border-radius: 0px 0px 10px 10px;
    width: 90%;

`

const ImageContainerDiv = styled.div`
    position: relative;
    width: 90%;
    background-color:  rgba(0,0,0, 0.2);

`
const DescriptionDiv = styled.div`

    font-size: 14px;
    position: relative;
    width: 90%;
    background-color: rgba(0,0,0, 0.3);

    text-align: left;
    white-space: pre-wrap; 
    padding: 15px;
`;

const Image = styled.img`
    object-fit: cover;
    width: 40%;
    height: 200px;
    border-radius: 10px;
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: rgba(37, 126, 116);
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

const NameDiv = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    height: 40px;
    width: 90%;
    border-radius: 10px 10px 0 0;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: start;
    padding: 20px 30px 20px 20px;
    font-size: 24px;



`