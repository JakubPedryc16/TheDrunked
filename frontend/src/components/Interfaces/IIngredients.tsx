export interface IIngredient{
    id: number;
    key?: number;
    name: string;
    image: string;
    amount: string;
    border?: Boolean;
    clickEffect?: () => void;
}
