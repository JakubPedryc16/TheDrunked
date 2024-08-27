import { Navigate } from "react-router-dom";
import {Button} from "../components/Button.tsx";
import MainContent from "../components/MainContent.tsx";
import { useEffect, useState } from "react";
import api from "../utils/api.ts";
import { Cocktail } from "../components/Cocktail.tsx";
import { Column, Columns } from "../styled-components/Common.tsx";
import { CocktailDto } from "../Dtos/CocktailDto.tsx";


function Home() {
    

    const [cocktails, setCocktails] = useState<CocktailDto[]>([]);
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
                    {Array.isArray(cocktails) && cocktails.map( cocktail => (
                        <Cocktail key={cocktail.id} clickEvent={() => (console.log("CHUJ"))} {...cocktail} />
                    ))}
                </Column>
            </Columns>
        </MainContent>
    );


}

export default Home;



