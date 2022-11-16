import './App.css';
import { Routes, Route,  } from 'react-router-dom';
import PrivateRoute from "./components/routing/PrivateRoute";
import Login from './components/auth/Login';
import Profile from './components/auth/Profile';
import Home from "./components/home/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserThunk } from "./redux/slices/authSlice";
import ScrollToTop from "./components/routing/ScrollToTop";
import authService from "./services/authService";
import Employee from "./components/employee/Employee";
import Faculty from "./components/faculty/Faculty";
import Lecturer from "./components/lecturer/Lecturer";
import Student from "./components/student/Student";
import Subject from "./components/subject/Subject";
import Class from "./components/class/Class";
import Subclass from "./components/subclass/Subclass";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (authService.isUserLogged()) {
            dispatch(loadUserThunk());
        }
    }, [dispatch]);

    return (
        <div className="App">
            <ScrollToTop />
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
                <Route path="/employee" element={<PrivateRoute><Employee/></PrivateRoute>} />
                <Route path="/faculty" element={<PrivateRoute><Faculty/></PrivateRoute>} />
                <Route path="/lecturer" element={<PrivateRoute><Lecturer/></PrivateRoute>} />
                <Route path="/student" element={<PrivateRoute><Student/></PrivateRoute>} />
                <Route path="/subject" element={<PrivateRoute><Subject/></PrivateRoute>} />
                <Route path="/class" element={<PrivateRoute><Class/></PrivateRoute>} />
                <Route path="/subclass" element={<PrivateRoute><Subclass/></PrivateRoute>} />
            </Routes>
        </div>
    );
}

export default App;
