import { Navigate } from "react-router-dom";
import {Button} from "../components/Button.tsx";
import MainContent from "../components/MainContent.tsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import api from "../utils/api.ts";
import { Cocktail } from "../components/Cocktail.tsx";


function Home() {
    
    interface TagData {
        id: number;
        name: string;
    }

    interface CocktailData{
        id: string;
        image: string;
        name: string;
        tags: TagData[];
    }
    const [cocktails, setCocktails] = useState<CocktailData[]>([]);
    const [error, setError] = useState<string | null> (null)

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

        void getCocktails();
    });

    return (
        <MainContent>
            <h1>HOME</h1>
            <Columns>
                <Column>
                    <Button onClick={() => (<Navigate to="chuj"/>)} label={"meow"}/>
                    <Button onClick={() => (<Navigate to="chuj"/>)} label={"meow"}/>

                </Column>
                <Column>
                    {error}
                    {Array.isArray(cocktails) && cocktails.map( (cocktail) => (
                        <Cocktail key={cocktail.id} {...cocktail}/>
                    ))}
                </Column>
            </Columns>
        </MainContent>
    );


}

export default Home;

const Columns = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;

`
const Column = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    gap: 50px;
    width: 30vw;

    background-color: rgba(0,0,0,0.2);
    padding: 50px;
    border-radius: 20px;
`

