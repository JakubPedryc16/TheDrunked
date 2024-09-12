import { FormEvent, useEffect, useState } from "react";
import { IIngredient } from "../Interfaces/IIngredients";
import { ITag } from "../Interfaces/ITag";

import api from "../../utils/api";
import { Ingredient } from "../Entities/Ingredient";
import { Tag } from "../Entities/Tag";
import styled from "styled-components";

import { Columns, Column, FileInput, InputsContainer, Input, Image, TextArea, Button } from "../../styled-components/Common";
import { SearchSection } from "../Common/SearchSection";
import { ItemContainer } from "../Common/ItemsContainer";


export const AddCocktailForm = () => {

    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);
    const [tags, setTags] = useState<ITag[]>([]);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageBlob, setImageBlob] = useState<string>()

    const [filteredIngredients, setFilteredIngredients] = useState<IIngredient[]>([]);
    const [filteredTags, setFilteredTags] = useState<ITag[]>([]);

    const [selectedIngredients, setSelectedIngredients] = useState<IIngredient[]>([]);
    const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

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
    
    function addTag(tag: ITag){
        const isAlreadyInAdded = selectedTags.some(currentTag => currentTag.id === tag.id);
        if(!isAlreadyInAdded) {
            setSelectedTags (selectedTags => [...selectedTags, tag])
        }
    }

    function addIngredient(ingredient: IIngredient, amount:string) {
        
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

    function deleteTag(tag: ITag) {
        const tagsWithoutDeleted = selectedTags.filter(currentTag => currentTag.id !== tag.id)
        setSelectedTags(tagsWithoutDeleted);
    }

    function deleteIngredient(ingredient: IIngredient) {
        const ingredientsWithoutDeleted = selectedIngredients.filter(currentIngredient => currentIngredient.id !== ingredient.id)
        setSelectedIngredients(ingredientsWithoutDeleted);

    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if(file){
            setImageFile(file)
            setImage(file.name)
            setImageBlob(URL.createObjectURL(file));
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


            const response = await api.post("user/cocktail/add",
                 {
                    id: 0,
                    name: name,
                    description: description,
                    image: responseImage.data,
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
                       
                        <FileInput 
                            type="file"
                            onChange={handleFileChange}
                        />
                        <Image src={imageBlob} alt="Cocktail Image"/>

                        <Input 
                            value={name} 
                            onChange={(event) => setName(event.target.value)}
                            placeholder="name"
                        />
                        <TextArea 
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
   
                    <Button type="submit">Submit</Button>
                </Column>

                <Column>
   
                    <SearchSection<IIngredient>
                        placeholder="Search Ingredients"
                        onSearch={filterIngredients}
                        items={filteredIngredients}
                        renderItem={ingredient => (
                            <Ingredient key={ingredient.id} clickEffect={() => addIngredient(ingredient, ingredientAmount)}  {...ingredient}/>
                        )}
                        height="30vh"       
                    />
                    <Input
                        value = {ingredientAmount}
                        onChange={(event) => setIngredientAmount(event.target.value)}
                        placeholder="Enter ingredient amount" 
                    />

                    <SearchSection<ITag>
                        placeholder="Search Tags"
                        onSearch={filterTags}
                        items={filteredTags}
                        renderItem={tag => (
                            <Tag key={tag.id} clickEffect={() => addTag(tag)}  {...tag}/>
                        )}
                        height="30vh"
                    />
                </Column>
            </Columns>
        </form>
    );
}


