import {useEffect, useState } from "react";
import MainContent from "../components/Common/MainContent";


import api from "../utils/api";

import { DetailedCocktail } from "../components/Entities/DetailedCocktail";
import styled from "styled-components";

import { EditCocktailForm, SimpleCocktail } from "../components/Forms/EditCocktailForm";
import { CocktailWithIngredients, EditCocktailIngredientsForm } from "../components/Forms/EditCocktailIngredientsForm";
import { CocktailWithTags, EditCocktailTagsForm } from "../components/Forms/EditCocktailTagsForm";
import { EDIT_MODE, IDetailedCocktail } from "../components/Interfaces/IDetailedCocktail";

import { useLocation } from "react-router-dom";
import { fetchCocktail, fetchLikedIds, fetchUserData } from "../utils/commonFunctions";

function SelectedCocktailPage() {

    const [selectedCocktail, setSelectedCocktail] = useState<IDetailedCocktail | null>();
    const [error, setError] = useState<string>("");

    const [userId, setUserId] = useState<number>(0);
    const [userRole, setUserRole] = useState<string>('');
  
    const [likedIds, setLikedIds] = useState<number[]>([]);

    const [editMode, setEditMode] = useState<number>(0);

    const [editable, setEditable] = useState<boolean>(false);

    const location = useLocation();
    const { cocktailId } = location.state || {};

    useEffect(() => {
        void fetchCocktail(cocktailId, setSelectedCocktail, setError);
        void fetchUserData(setUserId, setUserRole);
        void fetchLikedIds(setLikedIds);
    },[])

    useEffect(() => {
        void updateEditable();
    }, [userRole]);

    function updateEditable(){
        if(userRole === "ADMIN"){
            setEditable(true);
        } else if(selectedCocktail){
            const shouldBeEditable = selectedCocktail.id === userId;
            setEditable(shouldBeEditable);
        }
    }

    function handleCocktailEdit(cocktail: SimpleCocktail) {
        setSelectedCocktail(prevCocktail => 
            prevCocktail 
            ? {...prevCocktail, ...cocktail}
            : null
        )
    }

    function handleCocktailIngredientsEdit(cocktail: CocktailWithIngredients) {

        setSelectedCocktail(prevCocktail =>
            prevCocktail
                ? {...prevCocktail, ingredients: [...cocktail.ingredients]} 
                : null
        );
    } 

    function handleCocktailTagsEdit(cocktail: CocktailWithTags) {

        setSelectedCocktail(prevCocktail =>
            prevCocktail
                ? {...prevCocktail, tags: [...cocktail.tags]} 
                : null
        );
    }

    async function handleCocktailDelete(cocktailId: number) {
        const isConfirmed = window.confirm("Czy na pewno chcesz usunąć ten element?");
        if (!isConfirmed) {
            return;
        }
        try {
            await api.delete("user/cocktail/delete", {
                params: {cocktailId: cocktailId}
            });
        } catch(error) {
            setError("Error deleting cocktail");
            console.error(error)
        } 

        setSelectedCocktail(null);

    }

    async function handleLike(cocktailId: number) {
        try {
            const shouldLike = !likedIds.some(likedId => (likedId === cocktailId));

            const url = shouldLike ? "user/like" : "user/unlike";
    
            await api.post(url, null, { 
                params: {cocktailId}
             });

            setLikedIds(prevLikedIds => 
                shouldLike 
                    ? [...prevLikedIds, cocktailId]
                    : prevLikedIds.filter(likedId => likedId !== cocktailId 
                )
            );

            setSelectedCocktail(prevCocktail =>
                prevCocktail
                    ? {...prevCocktail, likes: shouldLike ? prevCocktail.likes + 1 : prevCocktail.likes - 1} 
                    : null
            );

        } catch (error) {
            setError("Unable to handle like");
            console.error(error);
            console.log(likedIds, cocktailId);
        }
    }
   
    return (
        <MainContent>
            {error}
                <DetailColumn>
                    {selectedCocktail && (
                        <DetailedContainer>
                            <DetailedCocktail 
                                {...selectedCocktail}
                                handleLike={() => handleLike(selectedCocktail.id)}
                                setEditMode={setEditMode} 
                                editable={editable}
                                handleDelete={() => handleCocktailDelete(selectedCocktail.id)}
                                isLiked = {likedIds.some(id => id === selectedCocktail.id)}
                            />
                        </DetailedContainer>
                    )}
                </DetailColumn>

            { selectedCocktail && (
            <>
                {editMode === EDIT_MODE.DETAILS && 
                    <EditCocktailForm {...selectedCocktail} setEditMode={() => setEditMode(EDIT_MODE.NONE)} handleCocktailEdit={handleCocktailEdit}/>}
                {editMode === EDIT_MODE.TAGS && 
                    <EditCocktailTagsForm {...selectedCocktail} setEditMode={() => setEditMode(EDIT_MODE.NONE)} handleCocktailEdit={handleCocktailTagsEdit}/>}
                {editMode === EDIT_MODE.INGREDIENTS && 
                    <EditCocktailIngredientsForm {...selectedCocktail} setEditMode={() => setEditMode(EDIT_MODE.NONE)} handleCocktailEdit={handleCocktailIngredientsEdit}/>}
            </>
            )}

        </MainContent>
    );
}

export default SelectedCocktailPage

const DetailedContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const DetailColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3vw;
    width: 40vw;
    height: 80vh;

    background-color: rgba(0,0,0,0.2);
    padding: 20px;
    border-radius: 20px;
`