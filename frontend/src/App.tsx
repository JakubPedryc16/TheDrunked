import {BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";
import Login from "./pages/Login.tsx"
import Register from "./pages/Register.tsx"
import Home from "./pages/Home.tsx"
import NotFound from "./pages/NotFound.tsx"
import ProtectedRoute from "./components/Common/ProtectedRoute.tsx";
import {Navbar} from "./components/Common/Navbar.tsx";
import GlobalContainer from "./components/Common/GlobalContainer.tsx";
import CocktailPage from "./pages/CocktailPage.tsx";
import AddCocktailPage from "./pages/AddCocktailPage.tsx";
import AddTagPage from "./pages/AddTagPage.tsx";
import AddIngredientPage from "./pages/AddIngredientPage.tsx";




function Logout() {
    localStorage.clear();
    return <Navigate to="/auth/login" />;
}

function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
}

const AppContent = () => {
    const location = useLocation();
    const isAuthPath = location.pathname.startsWith('/auth');

    return (
        <GlobalContainer>
            {!isAuthPath && <Navbar/>}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home/>
                            </ProtectedRoute>
                    }/>

                    <Route
                        path="/cocktails"
                        element={
                            <ProtectedRoute>
                                <CocktailPage/>
                            </ProtectedRoute>
                    }/>

                    <Route
                        path="/add-cocktail"
                        element={
                            <ProtectedRoute>
                                <AddCocktailPage/>
                            </ProtectedRoute>
                    }/>

                    <Route
                        path="/add-ingredient"
                        element={
                            <ProtectedRoute>
                                <AddIngredientPage/>
                            </ProtectedRoute>
                    }/>

                    <Route
                        path="/add-tag"
                        element={
                            <ProtectedRoute>
                                <AddTagPage/>
                            </ProtectedRoute>
                    }/>

                    <Route path="/auth/logout" element={<Logout />} />
                    <Route path="/auth/login" element={<Login/>}/>
                    <Route path="/auth/register" element={<RegisterAndLogout/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
        </GlobalContainer>
    );
};

function App() {

    return (
        <BrowserRouter>
            <AppContent/>
        </BrowserRouter>
    );
}


export default App
