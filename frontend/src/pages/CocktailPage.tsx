import { useEffect, useState } from "react";
import MainContent from "../components/Common/MainContent";
import { Column, Columns } from "../styled-components/Common";
import { SearchBar } from "../components/Other/SearchBar";
import { Cocktail } from "../components/Entities/Cocktail";
import api from "../utils/api";
import { DetailedCocktailDto } from "../Dtos/DetailedCocktailDto";
import { DetailedCocktail } from "../components/Entities/DetailedCocktail";
import styled from "styled-components";
import { CocktailFilter } from "../components/Other/CocktailFilter";


function CocktailPage() {

    const [cocktails, setCocktails] = useState<DetailedCocktailDto[]>([]);
    const [filteredCocktails, setFilteredCocktails] = useState<DetailedCocktailDto[]>([]);
    const [selectedCocktail, setSelectedCocktail] = useState<DetailedCocktailDto | null>(null);
    const [error, setError] = useState<string>("");
    const [filter, setFilter] = useState<string>("all");

    const [searchText, setSearchText] = useState<string>("");
    const [userId, setUserId] = useState<number>(0);
  
    const [likedIds, setLikedIds] = useState<number[]>([]);

    function filterCocktails(inputValue: string){
        if(Array.isArray(cocktails)) {
            let filtered;
            if(filter === "all"){
                filtered = cocktails;
            }
            else{
                filtered = cocktails.filter(cocktail => cocktail.user.id === userId);
            }

            filtered = filtered.filter((cocktail) => 
                cocktail.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                cocktail.tags.some((tag) => 
                    tag.name.toLowerCase().includes(inputValue.toLowerCase())
                )
            );
            setSearchText(inputValue);
            setFilteredCocktails(filtered);
        };
    }

    async function refreshSelectedCocktail() {
        if (selectedCocktail) {
            try {
                const res = await api.get(`user/cocktail`, {
                    params: {
                        id: selectedCocktail.id
                    }
                });
                if (res.data) {
                    setSelectedCocktail(res.data);
                } else {
                    console.log("Cocktail not found");
                }
            } catch (error) {
                setError("Error fetching selected cocktail");
                console.error(error);
            }
        }
    }

    async function handleLike(cocktailId: number) {
        try {
            const url = likedIds.some(likedId => (likedId === cocktailId))
                ? "user/unlike"
                : "user/like";
    
            await api.post(url, null, { 
                params: {cocktailId}
             });
             void getCocktails();
             void getLikedIds();
             void refreshSelectedCocktail();

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
                setFilteredCocktails(res.data);
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
        void filterCocktails(searchText);
        setSelectedCocktail(null);
    },[filter]);

 

    return (
        <MainContent>
            <CocktailFilter setFilter={setFilter}/>
            <Columns>
                <Column>
                    <SearchBar onSearch={filterCocktails}/>
                    {error}
                    <CocktailsContainer>
                    {Array.isArray(filteredCocktails) && filteredCocktails.map(filteredCocktail => (
                        <Cocktail key={filteredCocktail.id} clickEvent={() => setSelectedCocktail(filteredCocktail)} {...filteredCocktail}/>
                    ))}
                    </CocktailsContainer>
                </Column>

                <DetailColumn>
                    {selectedCocktail && (
                        <DetailedContainer>
                            <DetailedCocktail handleLike={() => handleLike(selectedCocktail.id)}{...selectedCocktail} />
                        </DetailedContainer>
                    )}
                </DetailColumn>
            </Columns>
        </MainContent>
    );
}

export default CocktailPage


const CocktailsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
    gap: 3vw;
    width: 40vw;
    width: 80vh;

    background-color: rgba(0,0,0,0.2);
    padding: 20px;
    border-radius: 20px;
`