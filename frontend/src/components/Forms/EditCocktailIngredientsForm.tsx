import { FormEvent, useEffect, useState } from "react";
import api from "../../utils/api";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import { IIngredient } from "../Interfaces/IIngredients";
import { Ingredient } from "../Entities/Ingredient";
import { SearchSection } from "../Common/SearchSection";
import { ItemContainer } from "../Common/ItemsContainer";
import { Button, Form, Input, ModalContent, ModalOverlay } from "../../styled-components/Common";

export interface CocktailWithIngredients {
    id: number,
    ingredients: IIngredient[],
}

export interface Props {
    setEditMode: () => void
    handleCocktailEdit: (cocktailId: CocktailWithIngredients) => void
}

export const EditCocktailIngredientsForm:React.FC<Props & CocktailWithIngredients> = ({id, ingredients, setEditMode, handleCocktailEdit}) => {

    const [newIngredients, setNewIngredients] = useState<IIngredient[]>(ingredients);
    const [allIngredients, setAllIngredients] = useState<IIngredient[]>([]);
    const [filteredIngredients, setFilteredIngredients] = useState<IIngredient[]>([]);
    const [amount, setAmount] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>('');

    function deleteIngredient(ingredient: IIngredient) {
        const ingredientsWithoutDeleted = newIngredients.filter(currentIngredient => currentIngredient.id !== ingredient.id)
        setNewIngredients(ingredientsWithoutDeleted);
    }
    
    function addIngredient(ingredient: IIngredient, amount:string) {
        
        if(!amount) {
            setErrorMessage("Please add ingredient amount");
            return;
        }

        const isAlreadyInAdded = newIngredients.some(currentIngredient => currentIngredient.id === ingredient.id);
        if(isAlreadyInAdded) { 
            setErrorMessage("Ingredient selected already");
            return;
        }
        let newIngredient = {...ingredient};
        newIngredient.amount = amount; 
        setNewIngredients(selectedIngredients => [...selectedIngredients, newIngredient])
        setErrorMessage("");
        
    }
    
    function filterIngredients(value: string) {
        const filtered = allIngredients.filter(ingredient => (
            ingredient.name.toLowerCase().includes(value.toLowerCase())
        ));
        setFilteredIngredients(filtered);
    }

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        
        try {
            const editedCocktailIngredients = {
                id: id,
                ingredients: newIngredients
            }
            await api.put("user/cocktail/ingredients/edit", 
                editedCocktailIngredients
            )

            handleCocktailEdit(editedCocktailIngredients)
            setEditMode();

        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        async function fetchIngredients(): Promise<void> {
            try {
            const res = await api.get<IIngredient[]>("user/ingredients")
            setAllIngredients(res.data);
            setFilteredIngredients(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchIngredients();
    }, [])
    return (
        <ModalOverlay>
            <ModalContent>
                <ExitIcon onClick={setEditMode}/>
                
                {errorMessage}
                <Form onSubmit={handleFormSubmit}>

                    <ItemContainer 
                            title= "Selected Ingredients"
                            children = {Array.isArray(newIngredients) && newIngredients.map( ingredient => (
                                <Ingredient key={ingredient.id} clickEffect={() => deleteIngredient(ingredient)}  {...ingredient}/>
                            ))}
                        />

                    <Input
                        value = {amount}
                        onChange={(event) => setAmount(event.target.value)}
                        placeholder="ecnter ingredient amount" 
                    />
                    <SearchSection<IIngredient>
                        placeholder="Search Ingredients"
                        onSearch={filterIngredients}
                        items={filteredIngredients}
                        renderItem={ingredient => (
                            <Ingredient key={ingredient.id} clickEffect={() => addIngredient(ingredient, amount)}  {...ingredient}/>
                            
                        )}
                        width="500px"
                        height="200px"
                    />
                    <Button type="submit">Confirm</Button>
                </Form>
            </ModalContent>
        </ModalOverlay>
    );
}

const ExitIcon = styled(AiFillCloseCircle)`
  position: absolute;
  top: 10px;
  right: 10px;  
`;

