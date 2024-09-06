import { useEffect, useState } from "react";
import MainContent from "../components/Common/MainContent";
import { Column, Columns } from "../styled-components/Common";

import { Cocktail } from "../components/Entities/Cocktail";
import api from "../utils/api";

import { DetailedCocktail } from "../components/Entities/DetailedCocktail";
import styled from "styled-components";
import { CocktailFilter } from "../components/Other/CocktailFilter";
import { EditCocktailForm, SimpleCocktail } from "../components/Forms/EditCocktailForm";
import { CocktailWithIngredients, EditCocktailIngredientsForm } from "../components/Forms/EditCocktailIngredientsForm";
import { CocktailWithTags, EditCocktailTagsForm } from "../components/Forms/EditCocktailTagsForm";
import { EDIT_MODE, IDetailedCocktail } from "../components/Interfaces/IDetailedCocktail";
import { SearchSection } from "../components/Common/SearchSection";



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
  
    const [likedIds, setLikedIds] = useState<number[]>([]);

    const [editMode, setEditMode] = useState<number>(0);

    const [editable, setEditable] = useState<boolean>(false);

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

        async function getUserId() {
            try {
                const res = await api.get("user/me");
                if(res.data && res.data.id) {
                    setUserId(res.data.id);
                } else {
                    console.log("User not found")
                }
            } catch(error) {
                setError("Error fetching user");
                console.error(error)
            } 
        }

        void getCocktails();
        void getUserId();
        void getLikedIds();
    },[])

    useEffect(() => {
        void updateFilteredCocktails(searchText);
        void setSelectedCocktail(null);
    }, [filterMode]);

    function updateFilteredCocktails(inputValue: string){
        const shouldBeEditable = filterMode !== FILTER_MODE.ALL;
        setEditable(shouldBeEditable);
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
                //setFilteredCocktails(res.data);
            } else {
                console.log("Cocktails not found")
            } 
        } catch(error) {
            setError("Error fetching cocktails");
            console.error(error);
        }
    }

    async function getLikedIds() {
        try {
            const res = await api.get("user/liked-ids");
                setError('');
                setLikedIds(res.data);
        } catch(error) {
            setError("Error fetching liked ids");
            console.error(error);
        }
    }
   
    return (
        <MainContent>
            <CocktailFilter setFilter={setFilterMode}/>
            <Columns>
                <Column>
                 <CocktailsContainer>
                    <SearchSection<IDetailedCocktail>
                            placeholder="Search Cocktails"
                            onSearch={updateFilteredCocktails}
                            items={filteredCocktails}
                            renderItem={filteredCocktail => (
                                <Cocktail 
                                {...filteredCocktail}
                                key={filteredCocktail.id} 
                                clickEvent={() => setSelectedCocktail(filteredCocktail)} 
                                />
                            )}
                        />
                    </CocktailsContainer>
                </Column>


                <DetailColumn>
                    {selectedCocktail && (
                        <DetailedContainer>
                            <DetailedCocktail 
                                {...selectedCocktail}
                                handleLike={() => handleLike(selectedCocktail.id)}
                                setEditMode={setEditMode} 
                                editable={editable}
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

const CocktailsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    gap: 10px;

    overflow: auto;
    &::-webkit-scrollbar {
        display: none; 
    }
    height: 45vh;
    width: 35vw;
`

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