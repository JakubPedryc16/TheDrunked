import React from "react";
import styled from "styled-components";
import { borderInteractiveStyle } from "../../styled-components/Common";

interface ButtonProps {
    onClick: () => void;
    label: string;
    imageSrc: string;
}

export const ImageButton: React.FC<ButtonProps> = ({ onClick, label, imageSrc }) => {
    return (
        <StyledButton onClick={onClick}>
            <NameDiv>{label}</NameDiv>
            <ButtonImage src={imageSrc} alt="Button Icon" />
        </StyledButton>
    );
};

const ButtonImage = styled.img`
    object-fit: cover;
    width: 194px;
    height: 150px;

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



const StyledButton = styled.div`

    width: 200px;
    height: 250px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${borderInteractiveStyle}

`;

