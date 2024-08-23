import styled from 'styled-components';
import {ReactNode} from "react";

interface MainContentProps {
    children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 90%;
    margin: 100px auto;
    
    display: flex;
    flex-direction: column;
    
    align-content: center;
    justify-content: center;
    
    align-items: center;
    text-align: center;
    
    gap: 20px;
`
