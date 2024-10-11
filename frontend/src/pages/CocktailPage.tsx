
import { lazy, Suspense, useEffect, useState } from "react";
import MainContent from "../components/Common/MainContent";
import { Column, Columns } from "../styled-components/Common";


import api from "../utils/api";

import { DetailedCocktail } from "../components/Entities/DetailedCocktail";
import styled from "styled-components";
import { CocktailFilter } from "../components/Other/CocktailFilter";
import { EditCocktailForm, SimpleCocktail } from "../components/Forms/EditCocktailForm";
import { CocktailWithIngredients, EditCocktailIngredientsForm } from "../components/Forms/EditCocktailIngredientsForm";
import { CocktailWithTags, EditCocktailTagsForm } from "../components/Forms/EditCocktailTagsForm";
import { EDIT_MODE, IDetailedCocktail } from "../components/Interfaces/IDetailedCocktail";
import { SearchSection } from "../components/Common/SearchSection";
import { useLocation } from "react-router-dom";
import { fetchLikedIds, fetchUserData } from "../utils/commonFunctions";

const Cocktail = lazy(() => import("../components/Entities/Cocktail"))

export enum FILTER_MODE {
    ALL,
    USER
}

function CocktailPage() {

    const [cocktails, setCocktails] = useState<IDetailedCocktail[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    const [selectedCocktail, setSelectedCocktail] = useState<IDetailedCocktail | null>(null);
    const [error, setError] = useState<string>("");
    const [filterMode, setFilterMode] = useState<FILTER_MODE>(FILTER_MODE.ALL);

    const [userId, setUserId] = useState<number>(0);
    const [userRole, setUserRole] = useState<string>('');
  
    const [likedIds, setLikedIds] = useState<number[]>([]);

    const [editMode, setEditMode] = useState<number>(0);

    const [editable, setEditable] = useState<boolean>(false);

    const location = useLocation();
    const {searchValue} = location.state ? location.state : {searchValue: ""};


    const filteredCocktails = cocktails
        .filter(cocktail => (
            filterMode === FILTER_MODE.ALL ? true : cocktail.user.id === userId
            )
        )
        .filter(cocktail => 
            cocktail.name.toLowerCase().includes(searchText.toLowerCase()) ||
            cocktail.tags.some(tag => 
                tag.name.toLowerCase().includes(searchText.toLowerCase())
            )
        );

    useEffect(() => {
        void updateFilteredCocktails(searchText);
        void setSelectedCocktail(null);
    }, [filterMode, userRole]);

    useEffect(() => {
        void getCocktails();
        void fetchUserData(setUserId, setUserRole);
        void fetchLikedIds(setLikedIds);
        setSearchText(searchValue);
    },[])



    function updateFilteredCocktails(inputValue: string){
        if(userRole === "ADMIN"){
            setEditable(true);
        } else {
            const shouldBeEditable = filterMode !== FILTER_MODE.ALL;
            setEditable(shouldBeEditable);
        }
        setSearchText(inputValue);
    }

    function handleCocktailEdit(cocktail: SimpleCocktail) {
        setCocktails(cocktails.map( prevCocktail => 
            prevCocktail.id === cocktail.id 
            ? {...prevCocktail, ...cocktail}
            : prevCocktail
            )
        )

        setSelectedCocktail(prevCocktail => 
            prevCocktail 
            ? {...prevCocktail, ...cocktail}
            : null
        )
    }

    function handleCocktailIngredientsEdit(cocktail: CocktailWithIngredients) {
       setCocktails(cocktails.map( prevCocktail =>
            prevCocktail.id === cocktail.id 
            ? {...prevCocktail, ingredients: [...cocktail.ingredients]}
            : prevCocktail
            )
        )

        setSelectedCocktail(prevCocktail =>
            prevCocktail
                ? {...prevCocktail, ingredients: [...cocktail.ingredients]} 
                : null
        );
    } 

    function handleCocktailTagsEdit(cocktail: CocktailWithTags) {
        setCocktails(cocktails.map( prevCocktail =>
            prevCocktail.id === cocktail.id 
            ? {...prevCocktail, tags: [...cocktail.tags]}
            : prevCocktail
            )
        )

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
        setCocktails(cocktails.filter( prevCocktail =>
            prevCocktail.id !== cocktailId)
        )
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
 
            setCocktails(prevCocktails => 
                prevCocktails.map(cocktail => 
                    cocktail.id === cocktailId
                    ? { ...cocktail, likes: shouldLike? cocktail.likes + 1 : cocktail.likes - 1}
                    : cocktail
                )
            );

        } catch (error) {
            setError("Unable to handle like");
            console.error(error);
            console.log(likedIds, cocktailId);
        }
    }
    async function getCocktails() {
        try {
            const res = await api.get("user/cocktails");
            if (res.data) {
                setError('');
                setCocktails(res.data);
            } else {
                console.log("Cocktails not found")
            } 
        } catch(error) {
            setError("Error fetching cocktails");
            console.error(error);
        }
    }
   
    return (
        <MainContent>
            <CocktailFilter setFilter={setFilterMode}/>
            <Columns>
            {error}
                <Column>
                    <SearchSection<IDetailedCocktail>
                            placeholder="Search Cocktails"
                            onSearch={updateFilteredCocktails}
                            items={filteredCocktails}
                            value={searchValue}
                            renderItem={filteredCocktail => (
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Cocktail 
                                    {...filteredCocktail}
                                    key={filteredCocktail.id} 
                                    clickEvent={() => setSelectedCocktail(filteredCocktail)} 
                                    isLiked = {likedIds.some(id => id === filteredCocktail.id)}
                                    />
                                </Suspense>
                            )}
                        />
                </Column>


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
            </Columns>

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

export default CocktailPage


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

    background-color: ${(props) => props.theme.colors.secondary};
    padding: 20px;
    border-radius: 20px;
`

