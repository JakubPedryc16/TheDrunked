import {useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FILTER_MODE } from "../../pages/CocktailPage";

interface CocktailFilterProps {
    setFilter: (mode: FILTER_MODE) => void;
}

export const CocktailFilter: React.FC<CocktailFilterProps> = ({setFilter}) => {
    const navigate = useNavigate();

    return (
        <FiltersContainer>
            <Filter onClick={() => setFilter(FILTER_MODE.ALL)}>
                All Cocktails
            </Filter>

            <Filter onClick={() => setFilter(FILTER_MODE.USER)}>
                Your Cocktails
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

    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: rgba(37, 126, 116, 0.8); 
    }

    &:active {
        background-color: rgba(37, 126, 116, 0.6); 
        transform: scale(0.95); 
    }
`;
