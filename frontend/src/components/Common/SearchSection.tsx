import styled from "styled-components";
import { SearchBar } from "../Other/SearchBar";

import { Suspense, useRef } from "react";
import { UseFirstViewportEntry } from "../Other/UseFirstViewportEntry";




interface SearchSectionProps<T> {
    placeholder: string;
    onSearch: (value: string) => void;
    items: T[];
    renderItem: (item: T) => JSX.Element;
    children?: React.ReactNode;
    width?: string;  
    height?: string;
}



export const SearchSection = <T,>({ placeholder, onSearch, items, renderItem, width = "35vw", height = "60vh"  }: SearchSectionProps<T>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
  
    return (
      <Section>
        <SearchBar placeholder={placeholder} onSearch={onSearch} />
        <ItemContainerDiv ref={containerRef} width={width} height={height}>
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

    return (
      <Elem ref={itemRef}>
        {entered ? <Suspense fallback={<div>Loading...</div>}>{children}</Suspense> : null}
      </Elem>
    );
  };

interface ItemContainerProps {
  width: string;
  height: string;
}

const ItemContainerDiv = styled.div<ItemContainerProps>`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: min-content;

    height: ${(props) => props.height}; 
    width: ${(props) => props.width};   
    margin: 10px;
    gap: 10px;

    overflow: auto;
    &::-webkit-scrollbar {
        display: none; 
    }
`
const Section = styled.div`
    display: flex;
    flex-direction: column;

    margin: 10px;
`;

const Elem = styled.div`
  display: inline-block;

`