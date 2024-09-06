import styled from "styled-components";
import { SearchBar } from "../Other/SearchBar";

import { Suspense, useEffect, useRef } from "react";
import { UseFirstViewportEntry } from "../Other/UseFirstViewportEntry";




interface SearchSectionProps<T> {
    placeholder: string;
    onSearch: (value: string) => void;
    items: T[];
    renderItem: (item: T) => JSX.Element;
    children?: React.ReactNode;
}



export const SearchSection = <T,>({ placeholder, onSearch, items, renderItem }: SearchSectionProps<T>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
  
    return (
      <Section>
        <SearchBar placeholder={placeholder} onSearch={onSearch} />
        <ItemContainerDiv ref={containerRef}>
          {Array.isArray(items) &&
            items.map((item, index) => (
              <LazyItem key={index} containerRef={containerRef}>
                {renderItem(item)}
              </LazyItem>
            ))}
        </ItemContainerDiv>
      </Section>
    );
  };
  

  const LazyItem: React.FC<{ children: React.ReactNode, containerRef: React.RefObject<HTMLDivElement> }> = ({ children, containerRef }) => {
    const itemRef = useRef<HTMLDivElement | null>(null);
    const entered = UseFirstViewportEntry(itemRef, containerRef);
    useEffect(() => {
        console.log('Element visible:', entered); // Dodaj to, aby zobaczyć, kiedy element staje się widoczny
      }, [entered]);
    return (
      <div ref={itemRef}>
        {entered ? <Suspense fallback={<div>Loading...</div>}>{children}</Suspense> : null}
      </div>
    );
  };

const ItemContainerDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    height: 300px;
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
