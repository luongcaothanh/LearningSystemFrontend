import React from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getLecturerInfoThunk } from "../../redux/slices/personSlice";

function Lecturer () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { state } = location;

    const lecturers = useSelector((state) => state.lecturer.lecturers);

    const handleGetPerson = (personID, event) => {
        event.preventDefault();

        const arg = {
            personID
        }

        dispatch(getLecturerInfoThunk(arg));

        navigate("/person");
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
                        </tr>
                    </thead>
                    <tbody>
                        {lecturers && lecturers.map((lecturer, index) => {
                            return (
                                <tr key={lecturer.idCard} onClick={(e) => handleGetPerson(lecturer.idCard, e)} style={{cursor: "pointer"}}>
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
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Lecturer;