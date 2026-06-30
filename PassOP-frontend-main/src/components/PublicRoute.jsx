import { Navigate } from "react-router-dom";
import { useAuth } from "../context_api/AuthContext";

function PublicRoute({ children }) {

    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/manager" replace />;
    }

    return children;
}

export default PublicRoute;