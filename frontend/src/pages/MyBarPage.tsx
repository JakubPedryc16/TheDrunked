
import { lazy, Suspense, useEffect, useState } from "react";
import MainContent from "../components/Common/MainContent";
import { Column, Columns } from "../styled-components/Common";


import api from "../utils/api";

import { IDetailedCocktail } from "../components/Interfaces/IDetailedCocktail";
import { SearchSection } from "../components/Common/SearchSection";
import { useNavigate } from "react-router-dom";
import { ItemContainer } from "../components/Common/ItemsContainer";
import { Ingredient } from "../components/Entities/Ingredient";
import { IIngredient } from "../components/Interfaces/IIngredients";
import { useFetchData } from "../utils/useFetchData";

const Cocktail = lazy(() => import("../components/Entities/Cocktail"))

export enum FILTER_MODE {
    ALL,
    USER
}

function MyBarPage() {

    const {data: cocktails, error: cocktailsError } = useFetchData<IDetailedCocktail[]>("user/cocktails");
    const {data: likedIds} = useFetchData<number[]>("user/liked-ids");
    const {data: selectedIngredients, refetch: refetchSelectedIngredients} = useFetchData<IIngredient[]>("user/user-ingredients");
    const {data: ingredients, error: ingredientsError } = useFetchData<IIngredient[]>("user/ingredients");

    const [searchText, setSearchText] = useState<string>("");
    const [ingredientsSearch, setingredientsSearch] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
  
    const filteredIngredients: IIngredient[] = ingredients 
    ? ingredients
        .filter(ingredient => (
            ingredient.name.toLowerCase().includes(ingredientsSearch.toLowerCase())
        ))
    : [];

    const navigate = useNavigate();

    const filteredCocktails: IDetailedCocktail[] = cocktails 
    ? cocktails
        .filter(cocktail => 
            cocktail.name.toLowerCase().includes(searchText.toLowerCase()) ||
            cocktail.tags.some(tag => 
                tag.name.toLowerCase().includes(searchText.toLowerCase())
            )
        )
        .filter(cocktail => {
            const selectedIngredientIds = selectedIngredients 
                ? new Set(selectedIngredients.map(ingredient => ingredient.id))
                : new Set();
            return cocktail.ingredients.every(cocktailIngredient =>
                selectedIngredientIds.has(cocktailIngredient.id)
            );
        })
    : [];

    async function addIngredient(ingredient: IIngredient) {
        
        const ingredientData = {
            id: ingredient.id,
            name: ingredient.name,
            image: ingredient.image
        }
        try {
            await api.post("user/add-user-ingredient", 
                ingredientData
            );
            await refetchSelectedIngredients();
        } catch (error) {
            console.log(error);
            setErrorMessage("Unable to add user ingredient");
        }
    }

    async function deleteIngredient(ingredient: IIngredient) {

        const ingredientData = {
            id: ingredient.id,
            name: ingredient.name,
            image: ingredient.image
        }
        try {
            await api.post("user/delete-user-ingredient", ingredientData);
            await refetchSelectedIngredients();
        } catch (error) {
            console.log(error);
            setErrorMessage("Unable to remove user ingredient");
        }
    }

    return (
        <MainContent>
            <Columns>
            {errorMessage}
                <Column>

                    <SearchSection<IIngredient>
                            placeholder="Search Ingredients"
                            onSearch={setingredientsSearch}
                            items={filteredIngredients}
                            renderItem={ingredient => (
                                <Ingredient key={ingredient.id} clickEffect={() => addIngredient(ingredient)}  {...ingredient}/>
                            )}
                            height="30vh"       
                        />
                    <ItemContainer 
                            title= "Selected Ingredients"
                            children = {Array.isArray(selectedIngredients) && selectedIngredients.map( ingredient => (
                                <Ingredient key={ingredient.id} clickEffect={() => deleteIngredient(ingredient)}  {...ingredient}/>
                            ))}
                        />
                </Column>
                <Column>
                    <SearchSection<IDetailedCocktail>
                            placeholder="Search Cocktails"
                            onSearch={setSearchText}
                            items={filteredCocktails}
              
                            renderItem={filteredCocktail => (
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Cocktail 
                                    {...filteredCocktail}
                                    key={filteredCocktail.id} 
                                    clickEvent={() => navigate(`/cocktail`, { state: { cocktailId: filteredCocktail.id } })} 
                                    isLiked={likedIds ? likedIds.some(id => id === filteredCocktail.id) : false}
                                    />
                                </Suspense>
                            )}
                        />
                </Column>



            </Columns>

        </MainContent>
    );
}

export default MyBarPage