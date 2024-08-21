import styled from 'styled-components';

export default function MainContent({ children }) {
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
