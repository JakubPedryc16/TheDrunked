import {useNavigate } from "react-router-dom";
import styled from "styled-components";

interface CocktailFilterProps {
    setFilter: (value: string) => void;
}

export const CocktailFilter: React.FC<CocktailFilterProps> = ({setFilter}) => {
    const navigate = useNavigate();

    return (
        <FiltersContainer>
            <Filter onClick={() => setFilter("all")}>
                All Cocktails
            </Filter>

            <Filter onClick={() => setFilter("user")}>
                Your Cocktails
            </Filter>

            <Filter onClick={() => setFilter("manage")}>
                Manage Cocktails
            </Filter>

            
            <Filter onClick={() => navigate("/add-cocktail")}>
                Add Cocktails
            </Filter>
        </FiltersContainer>
    );
}

const FiltersContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-items: end;
    width: 83vw;
    margin: 10px;
    border-radius: 10px;

    padding: 10px;
    background-color: rgba(0,0,0, 0.2);
    gap: 20px;
`

const Filter = styled.div`
    border-radius: 10px;
    background-color: rgba(37, 126, 116);
    width: 12vw;
    height: 5vh;
    font-size: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

`