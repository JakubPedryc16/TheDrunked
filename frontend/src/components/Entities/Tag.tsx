import styled from "styled-components";
import { ITag } from "../Interfaces/ITag";

export const Tag:React.FC<ITag> = (({name, clickEffect}) => {
    return(
        <TagContainer onClick={() => clickEffect && clickEffect()}>
            <div>{name}</div>
        </TagContainer>
    )
})


const TagContainer = styled.div`

    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 8px 5px 8px 5px;
    font-size: 12px;


`