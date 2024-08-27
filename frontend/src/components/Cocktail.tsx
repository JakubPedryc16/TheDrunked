import React, { useEffect, useState } from "react";
import api from "../utils/api";
import styled from "styled-components";
import { TagDto } from "../Dtos/TagDto";

interface CocktailProps{
    id: number;
    key?: number;
    image: string;
    name: string;
    likes: number;
    tags: TagDto[];

    clickEvent: () => void;
}

export const Cocktail: React.FC<CocktailProps> = ({image, name, likes, tags, clickEvent}) => {

    const [imageData, setImageData] = useState<string>("")

    useEffect(() => {
        async function getImage(image: string) {
            try {
                const res = await api.get<Blob>(`user/file/cocktail/` + image,{
                    responseType: "blob",
                });
                if(res.data){
                    const blob = URL.createObjectURL(res.data);
                    setImageData(blob);
                } else {
                    console.log("Unable to load cocktail image");
                }
           } catch(error) {
            console.error("Error fetching cocktail image", error);
           }
        }
        void getImage(image);
    }, []);

    
    return (
        <div onClick={clickEvent}>
            <Image src={imageData} alt="Cocktail Image"/>
            <div>{name}</div>
            <div>{likes}</div>
            <div>
                {tags.map((tag) => (
                    <div key={tag.id}>
                        <span>{tag.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}


const Image = styled.img`
    object-fit: cover;
    width: 100px;
    border-radius: 10px;
`