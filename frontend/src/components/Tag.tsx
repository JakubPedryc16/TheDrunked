import { TagDto } from "../Dtos/TagDto";


export const Tag:React.FC<TagDto> = (({name}) => {
    return(
        <div>
            <div>{name}</div>
        </div>
    )
})