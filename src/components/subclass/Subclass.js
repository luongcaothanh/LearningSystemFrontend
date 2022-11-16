import React from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';

function Class () {
    const subclasses = useSelector((state) => state.subclass.subclasses);

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
                            <th>Tên môn học</th>
                            <th>Giảng viên</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subclasses && subclasses.map((subclass, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{subclass.id}</td>
                                    <td>{subclass.ctype}</td>
                                    <td>{subclass.csemester}</td>
                                    <td>{subclass.cyear}</td>
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