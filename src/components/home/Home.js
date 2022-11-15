import React from "react";
import authService from "../../services/authService";

function Home () {
    return (
        <>
            {authService.isAAO() && <><h1>AAO Page</h1></>}
            {authService.isManager() && <><h1>Manager Page</h1></>}
            {authService.isLecturer() && <><h1>Lecturer Page</h1></>}
            {authService.isStudent() && <><h1>Student Page</h1></>}
        </>
    );
}

export default Home;