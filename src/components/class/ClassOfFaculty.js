import React from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getSubclassOfClassThunk } from "../../redux/slices/subclassSlice";

function Class () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { state } = location;

    const classes = useSelector((state) => state.class.classes);

    const handleGetSubclassOfClass = (subjectID, semester, event) => {
        event.preventDefault();

        const arg = {
            subjectID,
            semester
        }

        dispatch(getSubclassOfClassThunk(arg));

        navigate("/subclass", { state: {subjectID, semester}});
    }

    return (
        <>
            <div className="mx-5">
                <h1 style={{marginTop: "80px", marginBottom: "20px"}}>Danh sách loại Lớp</h1>
                <h3 className="mb-3">{state && state.facultyName && "Khoa: " + state.facultyName}</h3>
                <Table striped bordered hover className="mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Học kỳ</th>
                            <th>Năm học</th>
                            <th>Loại lớp</th>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Số tín chỉ</th>
                            <th>Trạng thái</th>
                            <th>Khoa</th>
                            <th>Giảng viên phụ trách</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes && classes.map((iclass, index) => {
                            return (
                                <tr onClick={(e) => handleGetSubclassOfClass(iclass.subjectID, iclass.semester, e)} key={index} style={{cursor: "pointer"}}>
                                    <td>{index+1}</td>
                                    <td>{iclass.semester}</td>
                                    <td>{iclass.classYear}</td>
                                    <td>{iclass.classType}</td>
                                    <td>{iclass.subjectID}</td>
                                    <td>{iclass.subjectName}</td>
                                    <td>{iclass.creditsNo}</td>
                                    <td>{iclass.subjectStatus}</td>
                                    <td>{iclass.facultyName}</td>
                                    <td>{iclass.lecturerName}</td>
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