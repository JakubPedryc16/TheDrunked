import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { ITag } from "../Interfaces/ITag";
import { Tag } from "./Tag";
import getImageData from "../../utils/fileUtils";

import { borderInteractiveStyle } from "../../styled-components/Common";
import { HeartIcon, LikesDiv, LikesText } from "../../styled-components/Icons";


interface CocktailProps{
    id: number;
    key?: number;
    image: string;
    name: string;
    likes: number;
    tags: ITag[];
    clickEvent: () => void;

   isLiked: boolean;
}

const Cocktail: React.FC<CocktailProps> = ({image, name, likes, tags, clickEvent, isLiked}) => {

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
        <BackgroundDiv onClick={clickEvent}>
            <NameDiv>
                {name}
            </NameDiv>
            <Image src={imageData} alt="Cocktail Image" loading = "lazy"/>
    
            <TagDiv>
                <LikesDiv>
                    <HeartIcon $isLiked={isLiked} />
                    <LikesText $isLiked={isLiked}>{likes}</LikesText>
                </LikesDiv>
                {displayedTags.map((tag) => (
                    <Tag key={tag.id} {...tag} />
                ))}
                {remainingTagsCount > 0 && (
                    <RemainingTags>{`+${remainingTagsCount}`}</RemainingTags>
                )}
            </TagDiv>

            
        </BackgroundDiv>
    );
}

export default Cocktail;


const Image = styled.img`
    object-fit: cover;
    width: 194px;
    height: 150px;

`
const TagDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;

    border-radius: 10px;
    gap: 5px;
    padding: 0 15px 0 10px;
    background-color: rgba(0, 0, 0, 0.2);

    border-radius: 0px 0px 0px 00px;

    width: 194px;
    height: 50px;

`

const NameDiv = styled.div`
    display: flex;
    align-items: center;

    height: 45px;
    width: 194px;
    /* border-radius: 10px 10px 0 0; */
    background-color: rgba(0, 0, 0, 0.2);
    text-align: start;
    padding-left: 20px;
    font-size: 16px;

`

const RemainingTags = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    padding: 8px;
    font-size: 12px;
    border-radius: 5px;

`;

const BackgroundDiv = styled.div`

    width: 200px;
    height: 250px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${borderInteractiveStyle}

`;

