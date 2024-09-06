import styled from "styled-components";
import { SearchBar } from "../Other/SearchBar";



interface SearchSectionProps<T> {
    placeholder: string;
    onSearch: (value: string) => void;
    items: T[];
    renderItem: (item: T) => JSX.Element;
    children?: React.ReactNode;
}



export const SearchSection = <T,>({ placeholder, onSearch, items, renderItem, children}: SearchSectionProps<T>) => (
    <Section>
        <SearchBar placeholder={placeholder} onSearch={onSearch}/>
        <ItemContainerDiv>
            {Array.isArray(items) && items.map(renderItem)}
        </ItemContainerDiv>
    </Section>

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
const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
`;
