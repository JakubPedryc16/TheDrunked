import { TagDto } from "./TagDto";


export interface CocktailDto{
    id: number;
    key?: number;
    image: string;
    name: string;
    likes: number;
    tags: TagDto[];
}