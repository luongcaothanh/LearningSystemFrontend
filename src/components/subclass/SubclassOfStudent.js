import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useLocation } from "react-router-dom";

function Class () {
    const location = useLocation();
    const { state } = location;

    const personSubclassStudent = useSelector((state) => state.subclass.subclassOfStudent);
    const authSubclassOfStudent = useSelector((state) => state.auth.subclassOfStudent);

    const [subclassOfStudent, setSubclassOfStudent] = useState(null);
    useEffect(() => {
        if (personSubclassStudent) {
            setSubclassOfStudent(personSubclassStudent);
        } else {
            setSubclassOfStudent(authSubclassOfStudent);
        }
    }, [personSubclassStudent, authSubclassOfStudent])

    return (
        <>
            <div className="mx-5">
                <h1 style={{marginTop: "80px", marginBottom: "20px"}}>Danh sách Lớp</h1>
                <h3 className="mb-3">{"Sinh viên: " + state.fullName + ", MSSV: " + state.studentID}</h3>
                <Table striped bordered hover className="mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã lớp học</th>
                            <th>Loại lớp</th>
                            <th>Học kỳ</th>
                            <th>Năm học</th>
                            <th>Mã môn học</th>
                            <th>Số tín chỉ</th>
                            <th>Tên môn học</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(subclassOfStudent && subclassOfStudent.length === 0)
                        ?   <tr><td colSpan="8">Không có lớp học</td></tr>
                        :   <>
                                {subclassOfStudent && subclassOfStudent.map((isubclassOfStudent, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{isubclassOfStudent.scid}</td>
                                            <td>{isubclassOfStudent.sctype}</td>
                                            <td>{isubclassOfStudent.scsemester}</td>
                                            <td>{isubclassOfStudent.scyear}</td>
                                            <td>{isubclassOfStudent.scsubjectID}</td>
                                            <td>{isubclassOfStudent.creditsNo}</td>
                                            <td>{isubclassOfStudent.subjectName}</td>
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