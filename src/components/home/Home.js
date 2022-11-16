import React from "react";
import authService from "../../services/authService";
import background from "../../background.jpg";
import Image from 'react-bootstrap/Image'; 
import AAOHome from "./AAOHome";
import ManagerHome from "./ManagerHome";
import LecturerHome from "./LecturerHome";
import StudentHome from "./StudentHome";

function Home () {
    return (
        <>
            <Image src={background} className="w-100"/>
            <h1 className="my-5">Ho Chi Minh City University of Technology</h1>
            {authService.isAAO() && <AAOHome/>}
            {authService.isManager() && <ManagerHome/>}
            {authService.isLecturer() && <LecturerHome/>}
            {authService.isStudent() && <StudentHome/>}
        </>
    );
}

export default Home;