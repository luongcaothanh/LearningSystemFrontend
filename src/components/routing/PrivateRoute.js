import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

function PrivateRoute ({children}) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? 
        <>
            <div style={{minHeight: "calc(100vh - 60px)"}}>
                <Navbar/>
                <div style={{marginTop: "60px", minHeight: "calc(100vh - 116px)"}}>{children}</div>
                <Footer/>
            </div>
        </>
        :
        <Navigate to={"/login"}/>
    ;
}

export default PrivateRoute;