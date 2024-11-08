import { Navigate, useNavigate } from "react-router-dom";

import MainContent from "../components/Common/MainContent.tsx";
import { useEffect, useState } from "react";
import api from "../utils/api.ts";

import {Column, Columns } from "../styled-components/Common.tsx";
import { ICocktail } from "../components/Interfaces/ICocktail.tsx";
import styled from "styled-components";
import Cocktail from "../components/Entities/Cocktail.tsx";
import { ImageButton } from "../components/Other/ImageButton.tsx";


function Home() {
    const navigate = useNavigate();

    const [likedIds, setLikedIds] = useState<number[]>([]);
    const [cocktails, setCocktails] = useState<ICocktail[]>([]);
    const [error, setError] = useState<string | null> (null)
    const sortedCocktails = [...cocktails].sort((a, b) => b.likes - a.likes);

    useEffect (() => {

        async function getCocktails() {
            try {
                const res = await api.get("user/cocktails");
                if (res.data) {
                    setCocktails(res.data)
                }
                else {
                    console.error("No Cocktails Found!")
                }
            }
            catch(err) {
                setError("Failed to fetch data")
                console.error(err)
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
        void getLikedIds();
        void getCocktails();
    }, []);



    return (
        <MainContent>
            <Columns>
                <Column>
                    <RowPlacement>
                        <ColumnPlacement>
                            <ImageButton onClick={() => (navigate('/cocktails'))} label="Search Cocktails" imageSrc="pic1.jpg" size="M"/>
                            <ImageButton onClick={() => (navigate('/my-bar' ))} label="My Bar" imageSrc="pic2.jpg" size="M"/>
                        </ColumnPlacement>
                        <ColumnPlacement>
                            <ImageButton onClick={() => (navigate('/cocktails' , {state: {searchValue: "sweet"}}))} label="Sweet Cocktails" imageSrc="pic3.jpg"/>
                            <ImageButton onClick={() => (navigate('/cocktails' , {state: {searchValue: "sour"}}))} label="Sour Cocktails" imageSrc="pic4.jpg"/>
                        </ColumnPlacement>
                    </RowPlacement>
                </Column>
                <Column>
                    {error}
                    <CocktailsContainer>
                        { sortedCocktails.map( cocktail => (
                            <Cocktail 
                            key={cocktail.id} 
                            clickEvent={() => navigate(`/cocktail`, { state: { cocktailId: cocktail.id } })} 
                            isLiked = {likedIds.some(id => id === cocktail.id)} 
                            {...cocktail}
                            />
                        ))}
                    </CocktailsContainer>
                </Column>
            </Columns>
        </MainContent>
    );


}

export default Home;

const CocktailsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;

    overflow: auto;
    height: 70vh;
    width: 35vw;

    padding-top: 50px;
    &::-webkit-scrollbar {
        display: none; 
    }
`

const RowPlacement = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3vw;
`
const ColumnPlacement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3vw;
`

