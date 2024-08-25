import React from "react";


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
    return (
        <div>
            <img src={image} alt="Cocktail Image"/>
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