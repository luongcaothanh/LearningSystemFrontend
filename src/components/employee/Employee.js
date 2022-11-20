import React, { useState } from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAAOInfoThunk, getManagerInfoThunk, getLecturerInfoThunk } from "../../redux/slices/personSlice";
import { getSubclassOfLecturerThunk } from "../../redux/slices/subclassSlice";
import { getAllEmpThunk } from "../../redux/slices/employeeSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import employeeService from "../../services/employeeService";
import lecturerService from "../../services/lecturerService";
import ToastMessage from "../layout/ToastMessage";

function Employee () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const employees = useSelector((state) => state.employee.employees);
    const [show, setShow] = useState(false);
    const [empCreateState, setEmpCreateState] = useState({
        idCard: "",
        gender: "",
        fName: "",
        lName: "",
        doB:"",
        email: "",
        employeeID: "",
        facultyName: "",
        username: "",
        password: "",
        role: "",
    });
    const [toastState, setToastState] = useState(null);

    const handleChange = (event) => {
        setEmpCreateState({
            ...empCreateState,
            [event.target.name]: event.target.value
        });
    };

    // get person info
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

    const handleClose = () => {
        setEmpCreateState({
            idCard: "",
            gender: "",
            fName: "",
            lName: "",
            doB:"",
            email: "",
            employeeID: "",
            facultyName: "",
            username: "",
            password: "",
            role: "",
        });
        setShow(false);
    };

    const handleShow = () => setShow(true);

    // create employee
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (empCreateState.gender === "") {
            empCreateState.gender = "Male";
        }
        if (empCreateState.facultyName === "") {
            empCreateState.facultyName = "Bảo dưỡng công nghiệp";
        }
        if (empCreateState.role === "") {
            empCreateState.role = "AAO";
        }

        const paramEmpCreateState = {
            idCard: empCreateState.idCard,
            gender: empCreateState.gender,
            fName: empCreateState.fName,
            lName: empCreateState.lName,
            doB: empCreateState.doB,
            email: empCreateState.email,
            employeeID: empCreateState.employeeID,
            facultyName: empCreateState.facultyName,
            username: empCreateState.username,
            password: empCreateState.password,
        }

        const { role } = empCreateState;
        if (role === "AAO") {
            const response = await employeeService.createAAO(paramEmpCreateState);
            if (response.errorCode === 0) {
                setToastState({
                    message: "Tạo Phòng đào tạo thành công.",
                    fullName: empCreateState.lName + " " + empCreateState.fName,
                    facultyName: empCreateState.facultyName
                });
                setTimeout(() => {
                    setToastState(null);
                }, 5000);
            }
        } else if (role === "MANAGER") {
            const response = await employeeService.createManager(paramEmpCreateState);
            if (response.errorCode === 0) {
                setToastState({
                    message: "Tạo Quản lý khoa thành công.",
                    fullName: empCreateState.lName + " " + empCreateState.fName,
                    facultyName: empCreateState.facultyName
                });
                setTimeout(() => {
                    setToastState(null);
                }, 5000);
            }
        } else {
            const response = await lecturerService.createLecturer(paramEmpCreateState);
            if (response.errorCode === 0) {
                setToastState({
                    message: "Tạo Giảng viên thành công.",
                    fullName: empCreateState.lName + " " + empCreateState.fName,
                    facultyName: empCreateState.facultyName
                });
                setTimeout(() => {
                    setToastState(null);
                }, 5000);
            }
        }

        dispatch(getAllEmpThunk());

        handleClose();
    }

    return (
        <>
            <div className="mx-5">
                <div style={{marginTop: "80px", marginBottom: "20px"}}>
                    <div className="d-flex flex-row-reverse">
                        <ToastMessage object={toastState}></ToastMessage>
                    </div>

                    <h1>Danh sách Nhân viên</h1>
                    <Button onClick={handleShow}>Tạo nhân viên</Button>

                    {/* Modal */}
                    <Modal show={show} onHide={handleClose} centered size="lg">
                        <Modal.Header>
                            <Modal.Title>Tạo nhân viên</Modal.Title>
                        </Modal.Header>

                        <form className="card-body p-2 text-center" onSubmit={handleSubmit}>
                            <Modal.Body>
                                <div className="form-outline mb-2 d-flex">
                                    <div className="w-100 me-2">
                                        <label className="form-label text-start w-100" htmlFor="lName">Họ + Tên đệm</label>
                                        <input type="text" id="lName" className="form-control form-control-lg" 
                                                name="lName" value={empCreateState.lName} onChange={handleChange}/> 
                                    </div>

                                    <div className="w-100 ms-2">
                                        <label className="form-label text-start w-100" htmlFor="fName">Tên</label>    
                                        <input type="text" id="fName" className="form-control form-control-lg"
                                                name="fName" value={empCreateState.fName} onChange={handleChange}/>
                                    </div>
                                </div>

                                <div className="form-outline mb-2 d-flex">
                                    <div className="w-100 me-2">
                                        <label className="form-label text-start w-100" htmlFor="idCard">CMND/CCCD</label>
                                        <input type="text" id="idCard" className="form-control form-control-lg" 
                                                name="idCard" value={empCreateState.idCard} onChange={handleChange}/> 
                                    </div>

                                    <div className="w-100 ms-2">
                                        <label className="form-label text-start w-100" htmlFor="email">Email</label>
                                        <input type="text" id="email" className="form-control form-control-lg" 
                                                name="email" value={empCreateState.email} onChange={handleChange}/> 
                                    </div>
                                </div>

                                <div className="form-outline mb-2 d-flex">
                                    <div className="w-100 me-2">
                                        <label className="form-label text-start w-100" htmlFor="doB">Ngày/Tháng/Năm sinh</label>
                                        <input type="text" id="doB" className="form-control form-control-lg" 
                                                name="doB" value={empCreateState.doB} onChange={handleChange}/>
                                    </div> 

                                    <div className="w-100 mx-2">
                                        <label className="form-label text-start w-100" htmlFor="gender">Giới tính</label>
                                        <select id="gender" className="form-control form-control-lg" 
                                                name="gender" value={empCreateState.gender} onChange={handleChange}
                                                >
                                            <option value="Male">Nam</option>
                                            <option value="Female">Nữ</option>
                                            <option value="Unknown">Không xác định</option>
                                        </select>
                                    </div>

                                    <div className="w-100 ms-2">
                                        <label className="form-label text-start w-100" htmlFor="role">Vai trò</label>
                                        <select id="role" className="form-control form-control-lg" 
                                                name="role" value={empCreateState.role} onChange={handleChange}
                                                >
                                            <option value="AAO">Phòng đào tạo</option>
                                            <option value="MANAGER">Quản lý khoa</option>
                                            <option value="LECTURER">Giảng viên</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-outline mb-2 d-flex">
                                    <div className="w-100 me-2">
                                        <label className="form-label text-start w-100" htmlFor="employeeID">MSCB</label>
                                        <input type="text" id="employeeID" className="form-control form-control-lg" 
                                                name="employeeID" value={empCreateState.employeeID} onChange={handleChange}/>
                                    </div>

                                    <div className="w-100 ms-2">
                                        <label className="form-label text-start w-100" htmlFor="facultyName">Khoa</label>
                                        <select id="facultyName" className="form-control form-control-lg" 
                                                name="facultyName" value={empCreateState.facultyName} onChange={handleChange}
                                                >
                                            <option value="Bảo dưỡng công nghiệp">Bảo dưỡng công nghiệp</option>
                                            <option value="Cơ khí">Cơ khí</option>
                                            <option value="Công nghệ vật liệu">Công nghệ vật liệu</option>
                                            <option value="Điện - Điện tử">Điện - Điện tử</option>
                                            <option value="Khoa học ứng dụng">Khoa học ứng dụng</option>
                                            <option value="Khoa học và Kỹ thuật máy tính">Khoa học và Kỹ thuật máy tính</option>
                                            <option value="Kỹ thuật địa chất và dầu khí">Kỹ thuật địa chất và dầu khí</option>
                                            <option value="Kỹ thuật giao thông">Kỹ thuật giao thông</option>
                                            <option value="Kỹ thuật hóa học">Kỹ thuật hóa học</option>
                                            <option value="Kỹ thuật xây dựng">Kỹ thuật xây dựng</option>
                                            <option value="Môi trường và tài nguyên">Môi trường và tài nguyên</option>
                                            <option value="Quản lý công nghiệp">Quản lý công nghiệp</option>
                                        </select>
                                    </div> 
                                </div>

                                <div className="form-outline mb-2 d-flex">
                                    <div className="w-100 me-2">
                                        <label className="form-label text-start w-100" htmlFor="username">Username</label>
                                        <input type="text" id="username" className="form-control form-control-lg" 
                                                name="username" value={empCreateState.username} onChange={handleChange}/> 
                                    </div>

                                    <div className="w-100 ms-2">
                                        <label className="form-label text-start w-100" htmlFor="password">Password</label>
                                        <input type="text" id="password" className="form-control form-control-lg" 
                                                name="password" value={empCreateState.password} onChange={handleChange}/> 
                                    </div>
                                </div>
                            </Modal.Body>
                            
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                                <Button type="submit" variant="primary">
                                    Tạo
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                </div>

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