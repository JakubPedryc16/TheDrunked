import {useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FILTER_MODE } from "../../pages/CocktailPage";
import { borderInteractiveStyle } from "../../styled-components/Common";

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
    background-color:rgba(37, 48, 49, 1);
    width: 12vw;
    height: 5vh;
    font-size: 16px;

    display: flex;
    align-items: center;
    justify-content: center;


    border: 2px solid rgba(37, 126, 116, 0.25);
    border-radius: 5px;
    box-sizing: border-box;
    
    &:hover {
        border-color: rgba(37, 126, 116, 0.5);
    }

    &:active {
        border-color: rgba(37, 126, 116, 0.75);
    }
`;
