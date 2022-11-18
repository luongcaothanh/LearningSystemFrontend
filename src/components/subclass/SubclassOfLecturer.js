import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useLocation } from "react-router-dom";

function Class () {
    const location = useLocation();
    const { state } = location;

    const personSubclassOfLecturer = useSelector((state) => state.subclass.subclassOfLecturer);
    const authSubclassOfLecturer = useSelector((state) => state.auth.subclassOfLecturer);

    const [subclassOfLecturer, setSubclassOfLecturer] = useState(null);
    useEffect(() => {
        if (personSubclassOfLecturer) {
            setSubclassOfLecturer(personSubclassOfLecturer);
        } else {
            setSubclassOfLecturer(authSubclassOfLecturer);
        }
    }, [personSubclassOfLecturer, authSubclassOfLecturer])

    return (
        <>
            <div className="mx-5">
                <h1 style={{marginTop: "80px", marginBottom: "20px"}}>Danh sách Lớp</h1>
                <h3 className="mb-3">{"Giảng viên: " + state.fullName + ", MSCB: " + state.lecturerID}</h3>
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
                        </tr>
                    </thead>
                    <tbody>
                        {(subclassOfLecturer && subclassOfLecturer.length === 0)
                        ?   <tr><td colSpan="8">Không có lớp học</td></tr>
                        :   <>
                                {subclassOfLecturer && subclassOfLecturer.map((isubclassOfLecturer, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{isubclassOfLecturer.id}</td>
                                            <td>{isubclassOfLecturer.ctype}</td>
                                            <td>{isubclassOfLecturer.csemester}</td>
                                            <td>{isubclassOfLecturer.cyear}</td>
                                            <td>{isubclassOfLecturer.csubjectID}</td>
                                            <td>{isubclassOfLecturer.subjectName}</td>
                                        </tr>
                                    );
                                })}
                            </>
                        }
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Class;