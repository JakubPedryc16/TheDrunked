import styled from "styled-components";

interface ItemContainerProps {
    title: string;
    children: React.ReactNode;
    width?: string;
}
export const ItemContainer: React.FC<ItemContainerProps> = ({title, children, width = "30vw"}) => (
    <div>
        <div>{title}</div>
        <ItemContainerDiv width={width}> {children} </ItemContainerDiv>
    </div>
);

interface ItemContainerDivProps {
    width: string;
}

const ItemContainerDiv = styled.div<ItemContainerDivProps>`
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    max-height: 300px;
    margin: 10px;
    gap: 10px;
    margin: 20px;
    width: ${(props) => props.width};

    overflow: auto;
    &::-webkit-scrollbar {
        display: none; 
    }
`