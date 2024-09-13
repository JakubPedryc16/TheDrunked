import { useEffect } from "react";
import MainContent from "../components/Common/MainContent";
import { AddTagForm } from "../components/Forms/AddTagForm";
import {useNavigate } from "react-router-dom";


function AddTagPage() {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("role") !== "ADMIN"){
            navigate("/");
        }
    }, [])
    return (
        <MainContent>
            <AddTagForm/>
        </MainContent>
    );
}

export default AddTagPage