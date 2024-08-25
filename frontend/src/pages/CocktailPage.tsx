import { useEffect, useState } from "react";
import MainContent from "../components/MainContent";
import { Column, Columns } from "../styled-components/Common";
import { SearchBar } from "../components/SearchBar";
import { Cocktail } from "../components/Cocktail";
import api from "../utils/api";

function CocktailPage() {

    interface IngredientProps{
        id: number;
        name: string;
        image: string;
        amount: string;
    }

    interface TagProps{
        id: number;
        name: string;
    }

    interface CocktailProps{
        id: number;
        name: string;
        image: string;
        description: string;
        ingredients: IngredientProps[];
        tags: TagProps[];
    }

    const [cocktails, setCocktails] = useState<CocktailProps[]>([]);
    const [filteredCocktails, setFilteredCocktails] = useState<CocktailProps[]>([]);
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
                        <Cocktail key={filteredCocktail.id} {...filteredCocktail}/>
                    ))}
                </Column>

                <Column>
  
                </Column>
            </Columns>
        </MainContent>
    );
}

export default CocktailPage