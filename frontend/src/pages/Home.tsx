import { Navigate } from "react-router-dom";
import {Button} from "../components/Other/Button.tsx";
import MainContent from "../components/Common/MainContent.tsx";
import { useEffect, useState } from "react";
import api from "../utils/api.ts";

import { Column, Columns } from "../styled-components/Common.tsx";
import { ICocktail } from "../components/Interfaces/ICocktail.tsx";
import styled from "styled-components";
import Cocktail from "../components/Entities/Cocktail.tsx";


function Home() {
    

    const [cocktails, setCocktails] = useState<ICocktail[]>([]);
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
            <Columns>
                <Column>
                    <Button onClick={() => (<Navigate to="chuj"/>)} label={"meow"}/>
                    <Button onClick={() => (<Navigate to="chuj"/>)} label={"meow"}/>

                </Column>
                <Column>
                    {error}
                    <CocktailsContainer>
                        {Array.isArray(cocktails) && cocktails.map( cocktail => (
                            <Cocktail key={cocktail.id} clickEvent={() => (console.log("CHUJ"))} {...cocktail} />
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
    height: 60vh;
    width: 35vw;
`

