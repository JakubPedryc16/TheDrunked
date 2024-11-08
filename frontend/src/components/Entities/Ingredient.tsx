import { useEffect, useState } from "react";

import styled from "styled-components";
import { IIngredient } from "../Interfaces/IIngredients";
import getImageData from "../../utils/fileUtils";

import { borderInteractiveStyle } from "../../styled-components/Common";

export const Ingredient:React.FC<IIngredient> = (({image, name, amount, clickEffect, border=false}) => {

    const [imageData, setImageData] = useState<string>("")

    useEffect(() => {
        getImageData(image, "ingredient", setImageData);
    }, []);

    return(
        <IngredientContainer onClick={() => clickEffect && clickEffect()} border={border || undefined}>
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
    border-radius: 5px 5px 0px 10px;
    
`
interface IngredientContainerProps {
    border?: Boolean;
}
const IngredientContainer = styled.div<IngredientContainerProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgba(49, 86, 89, 0.7);
    border-radius: 0px 5px 0px 10px;
    width: 150px;

    ${(props) => (props?.border ? borderInteractiveStyle : "")}

`

const NameDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    height: 42px;
    width: 100%;


    text-align: start;
    padding: 12px;
    font-size: 16px;

    overflow: auto;
    &::-webkit-scrollbar {
        display: none; 
    }
`

const AmountDiv = styled.div`
    font-size: 12px;
    margin-left: auto;
    text-align: center;
`