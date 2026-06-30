import { Navigate } from "react-router-dom";
import { FidgetSpinner } from 'react-loader-spinner';


function ProtectedRoute({ children }) {

    const token =
        localStorage.getItem("token");

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;