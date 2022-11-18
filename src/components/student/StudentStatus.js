import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useLocation } from "react-router-dom";

function Student () {
    const location = useLocation();
    const { state } = location;

    const personStudentStatus = useSelector((state) => state.person.studentStatus);
    const authStudentStatus = useSelector((state) => state.auth.studentStatus);

    const [studentStatus, setStudentStatus] = useState(null);
    useEffect(() => {
        if (personStudentStatus) {
            setStudentStatus(personStudentStatus);
        } else {
            setStudentStatus(authStudentStatus);
        }
    }, [personStudentStatus, authStudentStatus])

    return (
        <>
            <div className="mx-5">
                <h1 style={{marginTop: "80px", marginBottom: "20px"}}>Trạng thái của Sinh viên</h1>
                <h3 className="mb-3">{"Họ và tên: " + state.fullName + ", MSSV: " + state.studentID}</h3>
                <Table striped bordered hover className="mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Học kỳ</th>
                            <th>Trạng thái</th>
                            <th>Số tín chỉ đăng ký</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentStatus && studentStatus.map((istudentStatus, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{istudentStatus.semester}</td>
                                    <td>{istudentStatus.learningStatus}</td>
                                    <td>{istudentStatus.registeredCreditsNo}</td>
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