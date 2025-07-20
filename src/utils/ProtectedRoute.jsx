import { useContext, useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Authcontext } from "../context/authContext";
import axiosAuthApi from "./http";
// import { useAuthStatus } from "./AuthBus"


export const redirectToDashboard = (role) => {
    switch (role) {
        case "Cadmin":
            return "/admin/dashboard";
        case "Farmer":
            return "/farmer/dashboard";
        case "Expert":
            return "/expert/dashboard";
        default:
            return "/unauthorized";
    }
};




const ProtectedRoute = ({ allowedRoles = [] }) => {
    // const navigate = useNavigate()

    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState(null)

    const CheckAuth = async () => {
        try {
            setLoading(true); // Start loading

            const response = await axiosAuthApi.post("/auth/check-auth/");
            console.log(response)

            if (response.isAuthenticated == true) {
                const authStatus = response?.isAuthenticated;
                setLoading(false)

                setIsAuthenticated(!!authStatus);
                setRole(response.role)
                // setAuth(!!authStatus);

            } else {
                setIsAuthenticated(false)
                navigate('/')
            }

        } catch (error) {
            setIsAuthenticated(false);
            // setAuth(false);
            setLoading(false)
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        CheckAuth();
    }, []);

    if (loading) {
        // You can return a spinner or loader here
        return <div>Checking authentication...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to={redirectToDashboard(role)} replace />;
    }

    return <Outlet context ={role} replace />;
}


export default ProtectedRoute;