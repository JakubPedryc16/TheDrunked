import { IIngredient } from "./IIngredients";
import { ITag } from "./ITag";
import { IUser } from "./IUser";

export interface IDetailedCocktail{
    id: number;
    name: string;
    image: string;
    description: string;
    likes: number;
    user: IUser;
    ingredients: IIngredient[];
    tags: ITag[];

    editable: boolean; 

    handleLike: () => void;
    setEditMode: (mode: EDIT_MODE) => void;
    handleDelete: () => void;
}

export enum EDIT_MODE {
    NONE,
    DETAILS,
    TAGS,
    INGREDIENTS
}