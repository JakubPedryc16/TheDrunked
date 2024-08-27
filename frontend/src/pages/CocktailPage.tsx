import { useEffect, useState } from "react";
import MainContent from "../components/MainContent";
import { Column, Columns } from "../styled-components/Common";
import { SearchBar } from "../components/SearchBar";
import { Cocktail } from "../components/Cocktail";
import api from "../utils/api";
import { DetailedCocktailDto } from "../Dtos/DetailedCocktailDto";
import { DetailedCocktail } from "../components/DetailedCocktail";

function CocktailPage() {

    const [cocktails, setCocktails] = useState<DetailedCocktailDto[]>([]);
    const [filteredCocktails, setFilteredCocktails] = useState<DetailedCocktailDto[]>([]);
    const [selectedCocktail, setSelectedCocktail] = useState<DetailedCocktailDto | null>(null);
    const [error, setError] = useState<string>("");
    
    function filterCocktails(inputValue: string){
        if(Array.isArray(cocktails)) {
            const filtered = cocktails.filter((cocktail) => 
                cocktail.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                cocktail.tags.some((tag) => 
                    tag.name.toLowerCase().includes(inputValue.toLowerCase())
                )
            );
            setFilteredCocktails(filtered);
        };
    }

    useEffect(() => {

        async function getCocktails() {
            try {
                const res = await api.get("user/cocktails");
                if (res.data) {
                    setError('');
                    setCocktails(res.data);
                    setFilteredCocktails(res.data);
                }
                else {
                    console.log("Cocktails not found")
                } 
            } catch(error) {
                setError("Error fetching cocktails");
                console.error(error);
            }
        }

        void getCocktails();

    },[])

 

    return (
        <MainContent>
            <Columns>
                <Column>
                    <SearchBar onSearch={filterCocktails}/>
                    {error}
                    {Array.isArray(filteredCocktails) && filteredCocktails.map(filteredCocktail => (
                        <Cocktail key={filteredCocktail.id} clickEvent={() => setSelectedCocktail(filteredCocktail)} {...filteredCocktail}/>
                    ))}
                </Column>

                <Column>
                    {selectedCocktail && <DetailedCocktail {...selectedCocktail}/>}
                </Column>
            </Columns>
        </MainContent>
    );
}

export default CocktailPage