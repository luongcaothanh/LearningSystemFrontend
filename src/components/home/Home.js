import React from "react";
import background from "../../background.jpg";
import Image from 'react-bootstrap/Image'; 
import AAOHome from "./AAOHome";
import ManagerHome from "./ManagerHome";
import LecturerHome from "./LecturerHome";
import StudentHome from "./StudentHome";
import { useSelector } from "react-redux";

function Home () {
    const user = useSelector((state) => state.auth.user);

    return (
        <>
            <Image src={background} className="w-100"/>
            <h1 className="my-5">Ho Chi Minh City University of Technology</h1>
            {user.roleName.includes("ROLE_AAO") && <AAOHome/>}
            {user.roleName.includes("ROLE_MANAGER") && <ManagerHome/>}
            {user.roleName.includes("ROLE_LECTURER") && <LecturerHome/>}
            {user.roleName.includes("ROLE_STUDENT") && <StudentHome/>}
        </>
    );
}

export default Home;