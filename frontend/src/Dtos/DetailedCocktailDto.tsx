import { IngredientDto } from "./IngredientsDto";
import { TagDto } from "./TagDto";
import { UserDto } from "./UserDto";

export interface DetailedCocktailDto{
    id: number;
    name: string;
    image: string;
    description: string;
    likes: number;
    user: UserDto;
    ingredients: IngredientDto[];
    tags: TagDto[];

    handleLike?: () => void;
}