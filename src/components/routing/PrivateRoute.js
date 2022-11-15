import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../layout/Navbar";

function PrivateRoute ({children}) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? 
        <>
            <Navbar/>
            {children}
        </>
        :
        <Navigate to={"/login"}/>
    ;
}

export default PrivateRoute;