import { FormEvent, useEffect, useState } from "react";
import api from "../../utils/api";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";

import { ITag } from "../Interfaces/ITag";
import { Tag } from "../Entities/Tag";
import { SearchSection } from "../Common/SearchSection";
import { ItemContainer } from "../Common/ItemsContainer";

export interface CocktailWithTags {
    id: number,
    tags: ITag[],

}

export interface Props {

    setEditMode: () => void
    handleCocktailEdit: (cocktailId: CocktailWithTags) => void
}

export const EditCocktailTagsForm:React.FC<Props & CocktailWithTags> = ({id, tags, setEditMode, handleCocktailEdit}) => {

    const [newTags, setNewTags] = useState<ITag[]>(tags);
    const [allTags, setAllTags] = useState<ITag[]>([]);
    const [filteredTags, setFilteredTags] = useState<ITag[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    function deleteTag(tag: ITag) {
        const tagsWithoutDeleted = newTags.filter(currentTag => currentTag.id !== tag.id)
        setNewTags(tagsWithoutDeleted);
    }
    
    function addTag(tag: ITag) {
        
        const isAlreadyInAdded = newTags.some(currentTag => currentTag.id === tag.id);
        if(isAlreadyInAdded) { 
            setErrorMessage("Tag selected already");
            return;
        }
        let newTag = {...tag};
        setNewTags(selectedTags => [...selectedTags, newTag])
        setErrorMessage("");
        
    }
    
    function filterTags(value: string) {
        const filtered = allTags.filter(tag => (
            tag.name.toLowerCase().includes(value.toLowerCase())
        ));
        setFilteredTags(filtered);
    }

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        
        try {
            const editedCocktailTags = {
                id: id,
                tags: newTags
            }
            await api.put("user/cocktail/tags/edit", 
                editedCocktailTags
            )

            handleCocktailEdit(editedCocktailTags)
            setEditMode();

        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        async function fetchTags(): Promise<void> {
            try {
            const res = await api.get<ITag[]>("user/tags")
            setAllTags(res.data);
            setFilteredTags(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchTags();
    }, [])
    return (
        <ModalOverlay>
            <ModalContent>
                <ExitIcon onClick={setEditMode}/>
                
                {errorMessage}
                <Form onSubmit={handleFormSubmit}>

                    <ItemContainer 
                            title= "Selected Ingredients"
                            children = {Array.isArray(newTags) && newTags.map( tag => (
                                <Tag key={tag.id} clickEffect={() => deleteTag(tag)}  {...tag}/>
                            ))}
                        />

                    <SearchSection<ITag>
                        placeholder="Search Ingredients"
                        onSearch={filterTags}
                        items={filteredTags}
                        renderItem={tag => (
                            <Tag key={tag.id} clickEffect={() => addTag(tag)}  {...tag}/>
                            
                        )}
                    />
                    <button type="submit">Confirm</button>
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 600px; 
  z-index: 1001;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
