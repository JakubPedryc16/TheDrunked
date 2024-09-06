export interface IIngredient{
    id: number;
    key?: number;
    name: string;
    image: string;
    amount: string;
    clickEffect?: () => void;
}
