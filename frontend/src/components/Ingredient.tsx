import { IngredientDto } from "../Dtos/IngredientsDto";

export const Ingredient:React.FC<IngredientDto> = (({image, name, amount}) => {
    return(
        <div>
            <div>{image}</div>
            <div>{name}</div>
            <div>{amount}</div>
        </div>
    )
})