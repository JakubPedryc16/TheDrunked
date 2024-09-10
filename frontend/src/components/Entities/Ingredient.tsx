import { useEffect, useState } from "react";

import styled from "styled-components";
import { IIngredient } from "../Interfaces/IIngredients";
import getImageData from "../../utils/fileUtils";

export const Ingredient:React.FC<IIngredient> = (({image, name, amount, clickEffect}) => {

    const [imageData, setImageData] = useState<string>("")

    useEffect(() => {
        getImageData(image, "ingredient", setImageData);
    }, []);

    return(
        <IngredientContainer onClick={() => clickEffect && clickEffect()}>
            <Image src={imageData} alt="ingredient image"/>
            <NameDiv>{name}</NameDiv>
            <AmountDiv>{amount}</AmountDiv>
        </IngredientContainer>
    )
})

const Image = styled.img`
    object-fit: cover;
    width: 64px;
    border-radius: 10px;
`

const IngredientContainer = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(49, 86, 89);


    width: 100%;
`

const NameDiv = styled.div`
    font-size: 16px;
`

const AmountDiv = styled.div`
    font-size: 12px;
`