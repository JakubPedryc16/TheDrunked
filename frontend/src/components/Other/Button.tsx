import React from "react"
import styled from "styled-components";


interface ButtonProps {
    onClick: any
    label: string
}

export const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
    return (
        <StyledButton onClick={onClick}>{label}</StyledButton>
    );
}


const StyledButton = styled.button`
    
    width: 10vw;
    height: 10vh;
    background-color: #089C8F;
    border-radius: 20px;
    border: none;
    

    font-family: Inter,serif;
    font-size: 32px;
    color: white;
`

