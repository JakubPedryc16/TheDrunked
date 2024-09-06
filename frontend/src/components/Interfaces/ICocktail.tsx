import { ITag } from "./ITag";

export interface ICocktail{
    id: number;
    key?: number;
    image: string;
    name: string;
    likes: number;
    tags: ITag[];
}