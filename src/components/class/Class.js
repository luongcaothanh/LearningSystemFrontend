import React from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSubclassOfClassThunk } from "../../redux/slices/subclassSlice";

function Class () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const classes = useSelector((state) => state.class.classes);

    const handleGetSubclassOfClass = (subjectID, semester, event) => {
        event.preventDefault();

        const arg = {
            subjectID,
            semester
        }

        dispatch(getSubclassOfClassThunk(arg));

        navigate("/subclass");
    }

    return (
        <>
            <div className="mx-5">
                <h1 style={{marginTop: "80px", marginBottom: "20px"}}>Danh sách loại Lớp</h1>
                <Table striped bordered hover className="mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Học kỳ</th>
                            <th>Năm học</th>
                            <th>Loại lớp</th>
                            <th>Mã môn học</th>
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