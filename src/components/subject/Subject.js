import React from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getClassOfSubjectThunk } from "../../redux/slices/classSlice";

function Subject () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { state } = location;

    const subjects = useSelector((state) => state.subject.subjects);

    const handleGetClassOfSubject = (subjectID, event) => {
        event.preventDefault();

        const arg = {
            subjectID
        }

        dispatch(getClassOfSubjectThunk(arg));

        navigate("/class", { state: {subjectID}} );
    }

    return (
        <>
            <div className="mx-5">
                <h1 style={{marginTop: "80px", marginBottom: "20px"}}>Danh sách Môn học</h1>
                <h3 className="mb-3">{state && state.facultyName && "Khoa: " + state.facultyName}</h3>
                <Table striped bordered hover className="mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Số tín chỉ</th>
                            <th>Trạng thái</th>
                            <th>Khoa</th>
                            <th>Giảng viên phụ trách</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects && subjects.map((subject, index) => {
                            return (
                                <tr onClick={(e) => handleGetClassOfSubject(subject.id, e)} key={subject.id} style={{cursor: "pointer"}}>
                                    <td>{index+1}</td>
                                    <td>{subject.id}</td>
                                    <td>{subject.subjectName}</td>
                                    <td>{subject.creditsNo}</td>
                                    <td>{subject.subjectStatus === "OPEN" ? "Mở" : "Đóng"}</td>
                                    <td>{subject.facultyName}</td>
                                    <td>{subject.lecturerName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Subject;