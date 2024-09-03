import { FormEvent, useEffect, useState } from "react";
import { IngredientDto } from "../Dtos/IngredientsDto";
import { TagDto } from "../Dtos/TagDto";

import api from "../utils/api";
import { Ingredient } from "../components/Entities/Ingredient";
import { Tag } from "../components/Entities/Tag";
import styled from "styled-components";
import { SearchBar } from "../components/Other/SearchBar";
import { Columns, Column } from "../styled-components/Common";

interface ItemContainerProps {
    title: string;
    children: React.ReactNode;
}

interface SearchSectionProps<T> {
    placeholder: string;
    onSearch: (value: string) => void;
    items: T[];
    renderItem: (item: T) => JSX.Element;
    children?: React.ReactNode;
}

const ItemContainer: React.FC<ItemContainerProps> = ({title, children}) => (
    <div>
        <div>{title}</div>
        <ItemContainerDiv>{children}</ItemContainerDiv>
    </div>
);

const SearchSection = <T,>({ placeholder, onSearch, items, renderItem, children}: SearchSectionProps<T>) => (
    <Section>
        <SearchBar placeholder={placeholder} onSearch={onSearch}/>
        {children}
        <ItemContainerDiv>
            {Array.isArray(items) && items.map(renderItem)}
        </ItemContainerDiv>
    </Section>

);

export const AddCocktailForm = () => {

    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [ingredients, setIngredients] = useState<IngredientDto[]>([]);
    const [tags, setTags] = useState<TagDto[]>([]);

    const [imageFile, setImageFile] = useState<File | null>(null);

    const [filteredIngredients, setFilteredIngredients] = useState<IngredientDto[]>([]);
    const [filteredTags, setFilteredTags] = useState<TagDto[]>([]);

    const [selectedIngredients, setSelectedIngredients] = useState<IngredientDto[]>([]);
    const [selectedTags, setSelectedTags] = useState<TagDto[]>([]);

    const [ingredientAmount, setIngredientAmount] = useState<string>('');

    const [errorMessage, setErrorMessage] = useState<string>('');


    useEffect(() => {
        async function fetchData() {
            try {
                const [ingredientsRes, tagsRes] = await Promise.all([
                    api.get("user/ingredients"),
                    api.get("user/tags")
                ]);
                setIngredients(ingredientsRes.data);
                setFilteredIngredients(ingredientsRes.data);
                setTags(tagsRes.data);
                setFilteredTags(tagsRes.data);
            } catch (error) {
                console.error(error);
            }
        }
    
        fetchData();
    }, []);


    function filterIngredients(value: string) {
        const filtered = ingredients.filter(ingredient => (
            ingredient.name.toLowerCase().includes(value.toLowerCase())
        ));
        setFilteredIngredients(filtered);
    }

    function filterTags(value: string) {
        const filtered = tags.filter(tag => (
            tag.name.toLowerCase().includes(value.toLowerCase())
        ));
        setFilteredTags(filtered);
    }
    
    function addTag(tag: TagDto){
        const isAlreadyInAdded = selectedTags.some(currentTag => currentTag.id === tag.id);
        if(!isAlreadyInAdded) {
            setSelectedTags (selectedTags => [...selectedTags, tag])
        }
    }

    function addIngredient(ingredient: IngredientDto, amount:string) {

        if(!amount) {
            setErrorMessage("Please add ingredient amount");
            return;
        }

        const isAlreadyInAdded = selectedIngredients.some(currentIngredient => currentIngredient.id === ingredient.id);
        if(isAlreadyInAdded) { 
            setErrorMessage("Ingredient selected already");
            return;
        }
        let newIngredient = {...ingredient};
        newIngredient.amount = amount; 
        setSelectedIngredients(selectedIngredients => [...selectedIngredients, newIngredient])
        setErrorMessage("");
        
    }

    function deleteTag(tag: TagDto) {
        const tagsWithoutDeleted = selectedTags.filter(currentTag => currentTag.id !== tag.id)
        setSelectedTags(tagsWithoutDeleted);
    }

    function deleteIngredient(ingredient: IngredientDto) {
        const ingredientsWithoutDeleted = selectedIngredients.filter(currentIngredient => currentIngredient.id !== ingredient.id)
        setSelectedIngredients(ingredientsWithoutDeleted);
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImage(file.name);
        }
    }

    async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!imageFile) {
            setErrorMessage("Please add image file to the cocktail");
            return;
        }
        if (!name || !image || !description) {
            setErrorMessage("Please fill all input fields\n");
            return;
        }
        if (selectedIngredients.length == 0) {
            setErrorMessage("Cocktail must have at least 1 ingredient");
            return;
        }
 
        if (imageFile.size > 5 * 1024 * 1024){
            setErrorMessage("File size exceeded, maximum size is 5MB");
            return;
        }

        if (!image.endsWith(".jpg") && !image.endsWith(".png") && !image.endsWith(".jpeg")) {
            setErrorMessage("File must be of type .jpg, .jpeg or .png");
            return;
        }
        try{
            const formData: FormData = new FormData();

            formData.append("file", imageFile)

                const responseImage = await api.post("user/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(responseImage.data);

            const response = await api.post("user/cocktail/add",
                 {
                    id: 0,
                    name: name,
                    description: description,
                    image: image,
                    tags: selectedTags,
                    ingredients: selectedIngredients
                 }
                )
            alert(response.data);
            setErrorMessage('');
        } catch(error) {
            console.error(error);
            setErrorMessage("Unable to add cocktail: " + error);
        }
    }

    return (
        <form onSubmit={handleSubmitForm}>
            <Columns>
                <Column>
                    {errorMessage}
                    <InputsContainer>
                        <input 
                            type="file"
                            onChange={handleFileChange}
                        />
                        <input 
                            value={name} 
                            onChange={(event) => setName(event.target.value)}
                            placeholder="name"
                        />
                        <input 
                            value={description} 
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="description"
                        />
                    </InputsContainer>

                    <ItemContainer 
                        title= "Selected Ingredients"
                        children = {Array.isArray(selectedIngredients) && selectedIngredients.map( ingredient => (
                            <Ingredient key={ingredient.id} clickEffect={() => deleteIngredient(ingredient)}  {...ingredient}/>
                        ))}
                    />
                    <ItemContainer
                        title= "Selected Tags"
                        children = {Array.isArray(selectedTags) && selectedTags.map( tag => (
                            <Tag key={tag.id} clickEffect={() => deleteTag(tag)} {...tag}/>
                        ))}
                    />
   
                    <button type="submit">Submit</button>
                </Column>

                <Column>
                    <input
                        value = {ingredientAmount}
                        onChange={(event) => setIngredientAmount(event.target.value)}
                        placeholder="ecnter ingredient amount" 
                    />
                    <SearchSection<IngredientDto>
                        placeholder="Search Ingredients"
                        onSearch={filterIngredients}
                        items={filteredIngredients}
                        renderItem={ingredient => (
                            <Ingredient key={ingredient.id} clickEffect={() => addIngredient(ingredient, ingredientAmount)}  {...ingredient}/>
                            
                        )}
                    />

                    <SearchSection<TagDto>
                        placeholder="Search Tags"
                        onSearch={filterTags}
                        items={filteredTags}
                        renderItem={tag => (
                            <Tag key={tag.id} clickEffect={() => addTag(tag)}  {...tag}/>
                            
                        )}
                    />
                </Column>
            </Columns>
        </form>
    );
}

const ItemContainerDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);

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
`
const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin: 10px;
`

