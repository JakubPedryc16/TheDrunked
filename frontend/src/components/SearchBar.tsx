
interface SearchBarProps{
    placeholder?: string;
    onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({placeholder = "Search...", onSearch}) => {


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <input placeholder={placeholder} onChange={handleInputChange}/>
    );
}