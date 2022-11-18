import React from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAAOInfoThunk, getManagerInfoThunk, getLecturerInfoThunk } from "../../redux/slices/personSlice";
import { getSubclassOfLecturerThunk } from "../../redux/slices/subclassSlice";

function Employee () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const employees = useSelector((state) => state.employee.employees);

    const handleGetPerson = (personID, roleName, lecturerID, event) => {
        event.preventDefault();

        const arg = {
            personID,
            roleName
        }

        if (roleName.includes("ROLE_AAO")) {
            dispatch(getAAOInfoThunk(arg));
        } else if (roleName.includes("ROLE_MANAGER")) {
            dispatch(getManagerInfoThunk(arg));
        } else {
            const arg2 = {
                lecturerID
            }
            dispatch(getLecturerInfoThunk(arg));
            dispatch(getSubclassOfLecturerThunk(arg2));
        }

        navigate("/person");
    }

    return (
        <>
            <div className="mx-5">
                <h1 style={{marginTop: "80px", marginBottom: "20px"}}>Danh sách Nhân viên</h1>
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
                            <th>Chức vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees && employees.map((employee, index) => {
                            return (
                                <tr key={employee.idCard} onClick={(e) => handleGetPerson(employee.idCard, employee.roleName, employee.employeeID, e)} style={{cursor: "pointer"}}>
                                    <td>{index+1}</td>
                                    <td>{employee.lName} {employee.fName}</td>
                                    <td>{employee.idCard}</td>
                                    <td>{`${employee.doB[2]}/${employee.doB[1]}/${employee.doB[0]}`}</td>
                                    <td>{employee.gender === "Male" ? "Nam" : employee.gender === "Female" ? "Nữ" : "Không biết"}</td>
                                    <td>{employee.employeeID}</td>
                                    <td>{employee.facultyName}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.roleName.includes("ROLE_AAO") ? "Phòng đạo tạo" : employee.roleName.includes("ROLE_MANAGER") ? "Khoa" : "Giảng viên"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Employee;