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
    
    background-color: #2F333F;
    font-family: Inter,serif;
    font-size: 20px;
    color: white;
    
`
