import React from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';

function Lecturer () {
    const lecturers = useSelector((state) => state.lecturer.lecturers);

    return (
        <>
            <div className="mx-5">
                <h1 style={{marginTop: "80px", marginBottom: "20px"}}>Danh sách Giảng viên</h1>
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
                                <tr key={lecturer.idCard}>
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