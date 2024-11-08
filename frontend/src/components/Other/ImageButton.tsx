import React from "react";
import styled from "styled-components";
import { borderInteractiveStyle } from "../../styled-components/Common";

interface ButtonProps {
    onClick: () => void;
    label: string;
    imageSrc: string;
    size?: string;
}

export const ImageButton: React.FC<ButtonProps> = ({ onClick, label, imageSrc, size = "S" }) => {
    return (
        <StyledButton onClick={onClick} size={size}>
            <NameDiv>{label}</NameDiv>
            <ButtonImage src={imageSrc} alt="Button Icon" />
        </StyledButton>
    );
};

const ButtonImage = styled.img`
    object-fit: cover;
    width: 100%;
    height: 80%;
    border-radius: 0px 0px 10px 0px;

`
const NameDiv = styled.div`
    display: flex;
    align-items: center;
    height: 20%;
    width: 100%;
    border-radius: 10px 0 0 0;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: start;
    padding-left: 20px;


`
interface StyledButtonProps {
    size: string;
}
const StyledButton = styled.div<StyledButtonProps>`

    width: ${(props) => props.size == "S" ? "200px" : props.size == "M" ? "400px" : "400px"};
    height: ${(props) => props.size == "S" ? "250px" : props.size == "M" ? "250px" : "600px"};
    font-size: ${(props) => props.size == "S" ? "16px" : props.size == "M" ? "24px" : "32px"};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${borderInteractiveStyle}

`;

