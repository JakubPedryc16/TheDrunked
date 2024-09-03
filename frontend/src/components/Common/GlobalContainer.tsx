import styled from 'styled-components';
import {ReactNode} from "react";

interface GlobalContainerProps {
    children: ReactNode;
}

export default function GlobalContainer({ children }: GlobalContainerProps) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
    background-color: rgb(37, 48, 49);
    font-family: Inter, serif;
    font-size: 20px;
    color: rgb(240, 237, 238);
    overflow: auto; 

    &::-webkit-scrollbar {
        display: none; 
    }
`;
