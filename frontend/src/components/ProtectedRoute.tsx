import { Navigate } from "react-router-dom";
import { ReactNode, useState, useEffect } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        auth().catch((error) => {setIsAuthorized(false); console.log(error);});
    }, []);

    const auth = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        setIsAuthorized(true);
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
