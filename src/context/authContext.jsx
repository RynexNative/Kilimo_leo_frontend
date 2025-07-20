import { useState, useEffect, useContext, createContext } from "react";
import axiosAuthApi from "../utils/http";
import { replace, useNavigate } from "react-router-dom";



export const Authcontext = createContext();
const navigate = useNavigate

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    



    const login = async (email, password) => {
        
        try {
            const response = await axiosAuthApi.post("/auth/login/", {
                email,
                password,
            });
            return response;
            // setIsAuthenticated(true)

        } catch (error) {
            return error
            // console.error("❌ Login failed:", error);
            setIsAuthenticated(false);
        }
    };

    

    const logout = async () => {
        try {
            const response = await axiosAuthApi.post("/auth/logout/", {});
            
            
        } catch (error) {
            console.error("❌ Logout failed:", error);
        } finally {
            setIsAuthenticated(false);
            // setLoading(false);
        }
    };


    return (
        <Authcontext.Provider value={{ login, logout, isAuthenticated}}>
            {children}
        </Authcontext.Provider>
    );
};

