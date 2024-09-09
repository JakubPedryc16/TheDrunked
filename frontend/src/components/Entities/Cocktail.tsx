import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { ITag } from "../Interfaces/ITag";
import { FaHeart } from "react-icons/fa";
import { Tag } from "./Tag";
import getImageData from "../../utils/fileUtils";

interface CocktailProps{
    id: number;
    key?: number;
    image: string;
    name: string;
    likes: number;
    tags: ITag[];

    clickEvent: () => void;
}

const Cocktail: React.FC<CocktailProps> = ({image, name, likes, tags, clickEvent}) => {

    const [imageData, setImageData] = useState<string>("")

    useEffect(() => {
        getImageData(image, "cocktail", setImageData);
        if (imageData) {
            URL.revokeObjectURL(imageData);
          }
    }, [image]);
    
    const displayedTags = tags.slice(0, 2); 
    const remainingTagsCount = tags.length - 2; 

    return (
        <CocktailContainer onClick={clickEvent}>
            <DetailsDiv>
                <Image src={imageData} alt="Cocktail Image" loading = "lazy"/>
                <CocktailName>{name}</CocktailName>
            </DetailsDiv>
            <TagDiv>
                {displayedTags.map((tag) => (
                    <Tag key={tag.id} {...tag} />
                ))}
                {remainingTagsCount > 0 && (
                    <RemainingTags>{`+${remainingTagsCount}`}</RemainingTags>
                )}
            </TagDiv>
            <LikesDiv>
                <FaHeart color="red"/>
                {likes}
            </LikesDiv>

        </CocktailContainer>
    );
}

export default Cocktail;

const LikesDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const Image = styled.img`
    object-fit: cover;
    width: 50px;
    height: 70px;
    border-radius: 10px;
`

const CocktailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 10px;

    width: 150px;
    height: 200px;

    background-color: rgb(49, 86, 89);
    padding: 5px;
`

const TagDiv = styled.div`
    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: center;
    gap: 3px;

    border-radius: 10px;

    height: 50px;
    width: 150px;
    padding: 5px;
`

const DetailsDiv = styled.div`
    /* background-color: green; */
    border-radius: 10px;
    padding: 5px;
`

const CocktailName = styled.div`
    font-size: 16px;

`

const RemainingTags = styled.div`
    background-color: rgb(0, 122, 86); 
    padding: 8px;
    font-size: 12px;
    border-radius: 5px;
`;

