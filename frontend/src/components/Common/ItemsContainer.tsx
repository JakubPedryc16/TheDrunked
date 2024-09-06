import styled from "styled-components";

interface ItemContainerProps {
    title: string;
    children: React.ReactNode;
}
export const ItemContainer: React.FC<ItemContainerProps> = ({title, children}) => (
    <div>
        <div>{title}</div>
        <ItemContainerDiv>{children}</ItemContainerDiv>
    </div>
);

const ItemContainerDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    max-height: 300px;
    margin: 10px;

    overflow: auto;
    &::-webkit-scrollbar {
        display: none; 
    }
`