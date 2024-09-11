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
            <NameDiv>
                {name}
                <AmountDiv>{amount}</AmountDiv>
                </NameDiv>
            <Image src={imageData} alt="ingredient image"/>

        </IngredientContainer>
    )
})

const Image = styled.img`
    object-fit: cover;
    width: 100%;
    height: 150px;
    border-radius: 0 0 10px 10px;
`

const IngredientContainer = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    background-color: rgb(49, 86, 89);


    width: 150px;
`

const NameDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 30px;
    width: 100%;
    border-radius: 10px 10px 0 0;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: start;
    padding: 15px;
    font-size: 16px;

`

const AmountDiv = styled.div`
    font-size: 12px;
`