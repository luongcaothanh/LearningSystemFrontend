import React from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getLecturerInfoThunk } from "../../redux/slices/personSlice";
import { getSubclassOfLecturerThunk } from "../../redux/slices/subclassSlice";

function Lecturer () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { state } = location;

    const user = useSelector((state) => state.auth.user);
    const lecturers = useSelector((state) => state.lecturer.lecturers);

    const handleGetPerson = (personID, lecturerID, event) => {
        event.preventDefault();

        const arg = {
            personID
        }

        const arg2 = {
            lecturerID
        }

        dispatch(getLecturerInfoThunk(arg));
        dispatch(getSubclassOfLecturerThunk(arg2));

        navigate("/person");
    }

    const handleGetSubclassOfLecturer = (lName, fName, employeeID, event) => {
        event.preventDefault();

        const arg = {
            lecturerID: employeeID
        }

        dispatch(getSubclassOfLecturerThunk(arg)); 

        navigate("/lecturer/subclass",
            { state: {
                fullName: lName + " " + fName,
                lecturerID: employeeID
            }}
        );
    }

    return (
        <>
            <div className="mx-5">
                <h1 style={{marginTop: "80px", marginBottom: "20px"}}>Danh sách Giảng viên</h1>
                <h3 className="mb-3">{state && state.facultyName && "Khoa: " + state.facultyName}</h3>
                <Table striped bordered hover className="mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Họ và tên</th>
                            <th>CMND/CCCD</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>MSCB</th>
                            <th>Khoa</th>
                            <th>Email</th>
                            <th>MSCB Quản lý</th>
                            {user.roleName.includes("ROLE_MANAGER") ? <th>Lớp</th> : <></>}
                        </tr>
                    </thead>
                    <tbody>
                        {lecturers && lecturers.map((lecturer, index) => {
                            return (
                                user.roleName.includes("ROLE_AAO")
                                ? <tr key={lecturer.idCard} onClick={(e) => handleGetPerson(lecturer.idCard, lecturer.employeeID, e)} style={{cursor: "pointer"}}>
                                    <td>{index+1}</td>
                                    <td>{lecturer.lName} {lecturer.fName}</td>
                                    <td>{lecturer.idCard}</td>
                                    <td>{`${lecturer.doB[2]}/${lecturer.doB[1]}/${lecturer.doB[0]}`}</td>
                                    <td>{lecturer.gender === "Male" ? "Nam" : lecturer.gender === "Female" ? "Nữ" : "Không biết"}</td>
                                    <td>{lecturer.employeeID}</td>
                                    <td>{lecturer.facultyName}</td>
                                    <td>{lecturer.email}</td>
                                    <td>{lecturer.managerID === null ? "Không có" : lecturer.managerID}</td>
                                </tr>
                                : <tr key={lecturer.idCard}>
                                    <td>{index+1}</td>
                                    <td>{lecturer.lName} {lecturer.fName}</td>
                                    <td>{lecturer.idCard}</td>
                                    <td>{`${lecturer.doB[2]}/${lecturer.doB[1]}/${lecturer.doB[0]}`}</td>
                                    <td>{lecturer.gender === "Male" ? "Nam" : lecturer.gender === "Female" ? "Nữ" : "Không biết"}</td>
                                    <td>{lecturer.employeeID}</td>
                                    <td>{lecturer.facultyName}</td>
                                    <td>{lecturer.email}</td>
                                    <td>{lecturer.managerID === null ? "Không có" : lecturer.managerID}</td>
                                    {user.roleName.includes("ROLE_MANAGER")
                                    ? <td>
                                        <button className="btn btn-outline-primary" onClick={(e) => handleGetSubclassOfLecturer(lecturer.lName, lecturer.fName, lecturer.employeeID, e)}>Xem</button>
                                      </td>
                                    : <></>
                                    }
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Lecturer;