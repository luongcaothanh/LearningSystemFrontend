import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginThunk } from "../../redux/slices/authSlice";
import AlertMessage from "../layout/AlertMessage";

function Login () {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const [loginState, setLoginState] = useState({
        username: "",
        password: ""
    });

    const [alertState, setAlertState] = useState(null);

    const handleChange = (event) => {
        setLoginState({
            ...loginState,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginForm = {
            username: loginState.username,
            password: loginState.password
        }
        
        const response = await dispatch(loginThunk(loginForm));
        if (response.payload.errorCode !== 0) {
            setAlertState({ message: response.payload.message });
                setTimeout(() => {
                    setAlertState(null);
                }, 5000);
        }
    };

    if (isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    return (
        <div>
            <section className="vh-100" style={{backgroundColor: "#508bfc"}}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
                                <form className="card-body p-5 text-center" onSubmit={handleSubmit}>
                                    <h3 className="mb-5">Login</h3>

                                    <AlertMessage info={alertState}></AlertMessage>

                                    <div className="form-outline mb-4">
                                        <label className="form-label text-start w-100" htmlFor="typeEmailX-2">Username</label>
                                        <input type="text" id="typeEmailX-2" className="form-control form-control-lg" 
                                                name="username" value={loginState.username} onChange={handleChange}/> 
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label text-start w-100" htmlFor="typePasswordX-2">Password</label>    
                                        <input type="password" id="typePasswordX-2" className="form-control form-control-lg"
                                                name="password" value={loginState.password} onChange={handleChange}/>
                                    </div>

                                    <button className="btn btn-primary btn-lg btn-block w-100" type="submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;