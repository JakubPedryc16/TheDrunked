import { useEffect } from "react";
import MainContent from "../components/Common/MainContent";
import { AddIngredientForm } from "../components/Forms/AddIngredientForm";
import { useNavigate } from "react-router-dom";


function AddIngredientPage() {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("role") !== "ADMIN"){
            navigate("/");
        }
    }, [])

    return (
        <MainContent>
            <AddIngredientForm />
        </MainContent>
    );
}

export default AddIngredientPage