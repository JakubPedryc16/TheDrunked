import { IngredientDto } from "./IngredientsDto";
import { TagDto } from "./TagDto";

export interface DetailedCocktailDto{
    id: number;
    name: string;
    image: string;
    description: string;
    likes: number;
    ingredients: IngredientDto[];
    tags: TagDto[];
}