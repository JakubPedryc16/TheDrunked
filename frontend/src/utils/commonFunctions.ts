import api from "../utils/api";

export async function fetchUserData(setUserId: (id: number) => void, setUserRole: (role: string) => void) {
    try {
        const res = await api.get("user/me");
        if (res.data && res.data.id) {
            setUserId(res.data.id);
            setUserRole(res.data.role || "USER");
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error("Error fetching user", error);
    }
}

export async function fetchLikedIds(setLikedIds: (ids: number[]) => void) {
    try {
        const res = await api.get("user/liked-ids");
        setLikedIds(res.data);
    } catch (error) {
        console.error("Error fetching liked ids", error);
    }
}

export async function fetchCocktail(cocktailId: number, setSelectedCocktail: (cocktail: any) => void, setError: (error: string) => void) {
    try {
        const res = await api.get("user/cocktail", { params: { id: cocktailId } });
        if (res.data) {
            setSelectedCocktail(res.data);
        } else {
            console.log("Cocktail not found");
        }
    } catch (error) {
        setError("Error fetching cocktail");
        console.error(error);
    }
}

