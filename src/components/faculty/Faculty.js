import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { getSubjectOfFacultyThunk } from "../../redux/slices/subjectSlide";
import { getStudentOfFacultyThunk } from "../../redux/slices/studentSlice";
import { getLecturerOfFacultyThunk } from "../../redux/slices/lecturerSlice";
import { getClassOfFacultyThunk } from "../../redux/slices/classSlice";

function Faculty () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const faculties = useSelector((state) => state.faculty.faculties);

    const handleGetSubjectOfFaculty = (facultyName, event) => {
        event.preventDefault();

        const arg = {
            facultyName
        }

        dispatch(getSubjectOfFacultyThunk(arg));

        navigate("/subject", { state: {facultyName} });
    }

    const handleGetStudentOfFaculty = (facultyName, event) => {
        event.preventDefault();

        const arg = {
            facultyName
        }

        dispatch(getStudentOfFacultyThunk(arg));

        navigate("/student", { state: {facultyName} });
    }

    const handleGetLecturerOfFaculty = (facultyName, event) => {
        event.preventDefault();

        const arg = {
            facultyName
        }

        dispatch(getLecturerOfFacultyThunk(arg));

        navigate("/lecturer", { state: {facultyName} });
    }

    const handleGetClassOfFaculty = (facultyName, event) => {
        event.preventDefault();

        const arg = {
            facultyName
        }

        dispatch(getClassOfFacultyThunk(arg));

        navigate("/class/faculty", { state: {facultyName} });
    }

    return (
        <>
            <div className="mx-5">
                <h1 style={{marginTop: "80px", marginBottom: "20px"}}>Danh sách Khoa</h1>
                <Table striped bordered hover className="mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Khoa</th>
                            <th>Thông tin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faculties && faculties.map((faculty, index) => {
                            return (
                                <tr key={faculty.facultyName}>
                                    <td>{index+1}</td>
                                    <td>{faculty.facultyName}</td>
                                    <td>
                                        <button className="btn btn-outline-primary" onClick={(e) => handleGetSubjectOfFaculty(faculty.facultyName, e)}>Môn học</button>
                                        {(user.roleName.includes("ROLE_AAO") || user.roleName.includes("ROLE_MANAGER"))
                                        &&  <>
                                                <button className="btn btn-outline-secondary ms-5" onClick={(e) => handleGetClassOfFaculty(faculty.facultyName, e)}>Loại lớp</button>
                                                <button className="btn btn-outline-success ms-5" onClick={(e) => handleGetLecturerOfFaculty(faculty.facultyName, e)}>Giảng viên</button>
                                                <button className="btn btn-outline-danger ms-5" onClick={(e) => handleGetStudentOfFaculty(faculty.facultyName, e)}>Sinh viên</button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Faculty;