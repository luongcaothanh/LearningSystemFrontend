import React from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStudentOfSubclassThunk } from "../../redux/slices/subclassSlice";

function Class () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const subclasses = useSelector((state) => state.subclass.subclasses);

    const handleGetStudentOfSubclass = (subclassID, semester, subjectID, event) => {
        event.preventDefault();

        const arg = {
            subclassID,
            semester,
            subjectID
        }

        dispatch(getStudentOfSubclassThunk(arg));

        navigate("/subclass/student");
    }

    return (
        <>
            <div className="mx-5">
                <h1 style={{marginTop: "80px", marginBottom: "20px"}}>Danh sách Lớp</h1>
                <Table striped bordered hover className="mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã lớp học</th>
                            <th>Loại lớp</th>
                            <th>Học kỳ</th>
                            <th>Năm học</th>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Giảng viên</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subclasses && subclasses.map((subclass, index) => {
                            return (
                                <tr key={index} onClick={(e) => handleGetStudentOfSubclass(subclass.id, subclass.csemester, subclass.csubjectID, e)} style={{cursor: "pointer"}}>
                                    <td>{index+1}</td>
                                    <td>{subclass.id}</td>
                                    <td>{subclass.ctype}</td>
                                    <td>{subclass.csemester}</td>
                                    <td>{subclass.cyear}</td>
                                    <td>{subclass.csubjectID}</td>
                                    <td>{subclass.subjectName}</td>
                                    <td>{subclass.lecturer}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Class;