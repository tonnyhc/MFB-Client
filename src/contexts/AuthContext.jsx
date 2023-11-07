import { useState } from "react";
import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authData, setAuthData] = useLocalStorage('userData', {});

    function userLogin(authData){
        setAuthData(authData);
    };

    function userLogout(){
        setAuthData({});
    };

    const context = {
        authData,
        isAuth: authData.token ? true : false,
        userLogin,
        userLogout,

    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}