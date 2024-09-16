import React, { useState, useEffect } from "react";
import { Input } from "../../styled-components/Common";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  initialValue?: string; 
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch, initialValue = "" }) => {
  const [searchValue, setSearchValue] = useState(initialValue);

  useEffect(() => {
    setSearchValue(initialValue); 
  }, [initialValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value); 
  };

  return (
    <Input value={searchValue} placeholder={placeholder} onChange={handleInputChange} />
  );
};
