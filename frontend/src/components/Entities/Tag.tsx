import styled from "styled-components";
import { TagDto } from "../../Dtos/TagDto";



export const Tag:React.FC<TagDto> = (({name, clickEffect}) => {
    return(
        <TagContainer onClick={() => clickEffect && clickEffect()}>
            <div>{name}</div>
        </TagContainer>
    )
})


const TagContainer = styled.div`
    border-radius: 5px;
    background-color: rgb(37, 126, 116);
    padding: 8px 5px 8px 5px;
    font-size: 12px;
`