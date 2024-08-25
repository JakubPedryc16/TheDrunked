import React, { useEffect, useState } from "react";
import api from "../utils/api";


interface TagData {
    id: number;
    name: string;
}

interface CocktailProps{
    key: number;
    image: string;
    name: string;
    tags: TagData[];
}

export const Cocktail: React.FC<CocktailProps> = ({image, name, tags}) => {

    const [imageData, setImageData] = useState<string>("")

    useEffect(() => {
        async function getImage(image: string) {
            try {
                const res = await api.get<Blob>("user/file/" + image,{
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
    }, [])

    
    return (
        <div>
            <img src={imageData} alt="Cocktail Image"/>
            <div>{name}</div>
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