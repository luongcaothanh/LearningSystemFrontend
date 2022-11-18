import React from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getStudentInfoThunk, getStudentStatusThunk } from "../../redux/slices/personSlice";

function Student () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { state } = location;

    const students = useSelector((state) => state.student.students);

    const handleGetPerson = (personID, studentID, event) => {
        event.preventDefault();

        const arg = {
            personID
        }

        const arg2 = {
            studentID
        }

        dispatch(getStudentInfoThunk(arg));
        dispatch(getStudentStatusThunk(arg2));

        navigate("/person");
    }

    return (
        <>
            <div className="mx-5">
                <h1 style={{marginTop: "80px", marginBottom: "20px"}}>Danh sách Sinh viên</h1>
                <h3 className="mb-3">{state && state.facultyName && "Khoa: " + state.facultyName}</h3>
                <Table striped bordered hover className="mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Họ và tên</th>
                            <th>CMND/CCCD</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>MSSV</th>
                            <th>Năm nhập học</th>
                            <th>Khoa</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students && students.map((student, index) => {
                            return (
                                <tr key={student.idCard} onClick={(e) => handleGetPerson(student.idCard, student.studentID, e)} style={{cursor: "pointer"}}>
                                    <td>{index+1}</td>
                                    <td>{student.lName} {student.fName}</td>
                                    <td>{student.idCard}</td>
                                    <td>{`${student.doB[2]}/${student.doB[1]}/${student.doB[0]}`}</td>
                                    <td>{student.gender === "Male" ? "Nam" : student.gender === "Female" ? "Nữ" : "Không biết"}</td>
                                    <td>{student.studentID}</td>
                                    <td>{student.admissionYear}</td>
                                    <td>{student.facultyName}</td>
                                    <td>{student.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Student;