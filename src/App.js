import './App.css';
import { Routes, Route,  } from 'react-router-dom';
import PrivateRoute from "./components/routing/PrivateRoute";
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import Home from "./components/home/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserThunk } from "./redux/slices/authSlice";
import authService from "./services/authService";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (authService.isUserLogged()) {
            dispatch(loadUserThunk());
        }
    }, [dispatch]);

    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
            </Routes>
        </div>
    );
}

export default App;
