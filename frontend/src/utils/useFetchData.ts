import { useState, useEffect } from "react";
import api from "./api"; 

export function useFetchData<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get(url);
            setData(response.data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]); 

    return { data, error, loading, refetch: fetchData }; 
}