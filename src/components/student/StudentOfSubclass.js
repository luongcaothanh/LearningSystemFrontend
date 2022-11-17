import React from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useLocation } from "react-router-dom";

function Student () {
    const students = useSelector((state) => state.subclass.students);
    const location = useLocation();
    const { state } = location;

    return (
        <>
            <div className="mx-5">
                <h1 style={{marginTop: "80px", marginBottom: "20px"}}>Danh sách Sinh viên</h1>
                <h3 className="mb-3">{state && state.subjectID && "Lớp: " + state.subclassID + ", Môn học: " + state.subjectID + ", Học kỳ: " + state.semester}</h3>
                <Table striped bordered hover className="mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>MSSV</th>
                            <th>Họ và tên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Email</th>
                            <th>Khoa</th>
                            <th>Lớp</th>
                            <th>Học kỳ</th>
                            <th>Năm học</th>
                            <th>Loại lớp</th>
                            <th>Mã môn học</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(students && students.length === 0)
                        ?   <tr><td colSpan="12">Không có sinh viên</td></tr>
                        :   <>
                                {students && students.map((student, index) => {
                                    return (
                                        <tr key={student.studentID}>
                                            <td>{index+1}</td>
                                            <td>{student.studentID}</td>
                                            <td>{student.fullName}</td>
                                            <td>{`${student.doB[2]}/${student.doB[1]}/${student.doB[0]}`}</td>
                                            <td>{student.gender === "Male" ? "Nam" : student.gender === "Female" ? "Nữ" : "Không biết"}</td>
                                            <td>{student.email}</td>
                                            <td>{student.facultyName}</td>
                                            <td>{student.scid}</td>
                                            <td>{student.scsemester}</td>
                                            <td>{student.scyear}</td>
                                            <td>{student.sctype}</td>
                                            <td>{student.scsubjectID}</td>
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

export default Student;