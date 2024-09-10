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
        <BackgroundDiv onClick={clickEvent}>
                <NameDiv>
                    <CocktailName>{name}</CocktailName>
                </NameDiv>

                <Image src={imageData} alt="Cocktail Image" loading = "lazy"/>

            <ItemContainerDiv>
                    <TagDiv>
                        {displayedTags.map((tag) => (
                            <Tag key={tag.id} {...tag} />
                        ))}
                        {remainingTagsCount > 0 && (
                            <RemainingTags>{`+${remainingTagsCount}`}</RemainingTags>
                        )}
                        <LikesDiv>
                            <FaHeart color="red"/>
                            {likes}
                        </LikesDiv>
                    </TagDiv>

                </ItemContainerDiv>
        </BackgroundDiv>
    );
}

export default Cocktail;

const LikesDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto; 
  padding-right: 20px;
`;

const Image = styled.img`
    object-fit: cover;
    width: 200px;
    height: 150px;

`

const CocktailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    background-color: rgb(49, 86, 89);
`

const TagDiv = styled.div`
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    border-radius: 10px;
    gap: 5px;
    padding-left: 20px;
    height: 50px;
    width: 200px;

`

const NameDiv = styled.div`
    display: flex;
    align-items: center;

    height: 30px;
    width: 200px;
    border-radius: 10px 10px 0 0;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: start;
    padding-left: 20px;


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

const ItemContainerDiv = styled.div`
    background-color: rgba(0, 0, 0, 0.2);

    border-radius: 0px 0px 10px 10px;

    width: 200px;
    height: 50px;


`;

const BackgroundDiv = styled.div`

    width: 200px;
    height: 250px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;

