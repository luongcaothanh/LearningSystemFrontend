import React, { useState } from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getStudentInfoThunk, getStudentStatusThunk } from "../../redux/slices/personSlice";
import { getSubclassOfStudentThunk } from "../../redux/slices/subclassSlice";
import { getAllStudentThunk } from "../../redux/slices/studentSlice";
import ToastMessage from "../layout/ToastMessage";
import studentService from "../../services/studentService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Student () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { state } = location;

    const user = useSelector((state) => state.auth.user);
    const students = useSelector((state) => state.student.students);
    const [show, setShow] = useState(false);
    const [studentCreatedState, setStudentCreatedState] = useState({
        idCard: "",
        gender: "",
        fName: "",
        lName: "",
        doB:"",
        email: "",
        studentID: "",
        admissionYear: "",
        facultyName: "",
        username: "",
        password: "",
    });
    const [toastState, setToastState] = useState(null);

    const handleChange = (event) => {
        setStudentCreatedState({
            ...studentCreatedState,
            [event.target.name]: event.target.value
        });
    };

    // get person info
    const handleGetPerson = (personID, studentID, event) => {
        event.preventDefault();

        const arg = {
            personID
        }

        const arg2 = {
            studentID
        }

        dispatch(getStudentInfoThunk(arg));
        dispatch(getStudentStatusThunk(arg2));
        dispatch(getSubclassOfStudentThunk(arg2));

        navigate("/person");
    }

    // get student status
    const handleGetStudentStatus = (lName, fName, studentID, event) => {
        event.preventDefault();

        const arg = {
            studentID
        }

        dispatch(getStudentStatusThunk(arg));

        navigate("/student/status",
            { state: {
                fullName: lName + " " + fName,
                studentID: studentID
            }}
        );
    }

    // get subclass of student
    const handleGetSubclassOfStudent = (lName, fName, studentID, event) => {
        event.preventDefault();

        const arg = {
            studentID
        }

        dispatch(getSubclassOfStudentThunk(arg));

        navigate("/student/subclass",
            { state: {
                fullName: lName + " " + fName,
                studentID: studentID
            }}
        );
    }

    const handleClose = () => {
        setStudentCreatedState({
            idCard: "",
            gender: "",
            fName: "",
            lName: "",
            doB:"",
            email: "",
            studentID: "",
            admissionYear: "",
            facultyName: "",
            username: "",
            password: "",
        });
        setShow(false);
    };

    const handleShow = () => setShow(true);

    // creat student
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (studentCreatedState.gender === "") {
            studentCreatedState.gender = "Male";
        }
        if (studentCreatedState.facultyName === "") {
            studentCreatedState.facultyName = "Bảo dưỡng công nghiệp";
        }
        if (studentCreatedState.admissionYear === "") {
            studentCreatedState.admissionYear = new Date().getFullYear().toString();
        }

        const response = await studentService.createStudent(studentCreatedState);
        if (response.errorCode === 0) {
            setToastState({
                message: "Tạo Sinh viên thành công.",
                fullName: studentCreatedState.lName + " " + studentCreatedState.fName,
                facultyName: studentCreatedState.facultyName
            });
            setTimeout(() => {
                setToastState(null);
            }, 5000);
        }

        dispatch(getAllStudentThunk());

        handleClose();
    }

    return (
        <>
            <div className="mx-5">
                <div style={{marginTop: "80px", marginBottom: "20px"}}>
                    <div className="d-flex flex-row-reverse">
                        <ToastMessage object={toastState}></ToastMessage>
                    </div>

                    <h1>Danh sách Sinh viên</h1>

                    {user.roleName.includes("ROLE_AAO") && <>
                        <Button onClick={handleShow}>Tạo sinh viên</Button>

                        {/* Modal */}
                        <Modal show={show} onHide={handleClose} centered size="lg">
                            <Modal.Header>
                                <Modal.Title>Tạo sinh viên</Modal.Title>
                            </Modal.Header>

                            <form className="card-body p-2 text-center" onSubmit={handleSubmit}>
                                <Modal.Body>
                                    <div className="form-outline mb-2 d-flex">
                                        <div className="w-100 me-2">
                                            <label className="form-label text-start w-100" htmlFor="lName">Họ + Tên đệm</label>
                                            <input type="text" id="lName" className="form-control form-control-lg" 
                                                    name="lName" value={studentCreatedState.lName} onChange={handleChange}/> 
                                        </div>

                                        <div className="w-100 ms-2">
                                            <label className="form-label text-start w-100" htmlFor="fName">Tên</label>    
                                            <input type="text" id="fName" className="form-control form-control-lg"
                                                    name="fName" value={studentCreatedState.fName} onChange={handleChange}/>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-2 d-flex">
                                        <div className="w-100 me-2">
                                            <label className="form-label text-start w-100" htmlFor="idCard">CMND/CCCD</label>
                                            <input type="text" id="idCard" className="form-control form-control-lg" 
                                                    name="idCard" value={studentCreatedState.idCard} onChange={handleChange}/> 
                                        </div>

                                        <div className="w-100 ms-2">
                                            <label className="form-label text-start w-100" htmlFor="email">Email</label>
                                            <input type="text" id="email" className="form-control form-control-lg" 
                                                    name="email" value={studentCreatedState.email} onChange={handleChange}/> 
                                        </div>
                                    </div>

                                    <div className="form-outline mb-2 d-flex">
                                        <div className="w-100 me-2">
                                            <label className="form-label text-start w-100" htmlFor="doB">Ngày/Tháng/Năm sinh</label>
                                            <input type="text" id="doB" className="form-control form-control-lg" 
                                                    name="doB" value={studentCreatedState.doB} onChange={handleChange}/>
                                        </div> 

                                        <div className="w-100 mx-2">
                                            <label className="form-label text-start w-100" htmlFor="gender">Giới tính</label>
                                            <select id="gender" className="form-control form-control-lg" 
                                                    name="gender" value={studentCreatedState.gender} onChange={handleChange}
                                                    >
                                                <option value="Male">Nam</option>
                                                <option value="Female">Nữ</option>
                                                <option value="Unknown">Không xác định</option>
                                            </select>
                                        </div>

                                        <div className="w-100 ms-2">
                                            <label className="form-label text-start w-100" htmlFor="admissionYear">Năm nhập học</label>
                                            <select id="admissionYear" className="form-control form-control-lg" 
                                                    name="admissionYear" value={studentCreatedState.admissionYear} onChange={handleChange}
                                                    >
                                                <option value="2022">2022</option>
                                                <option value="2021">2021</option>
                                                <option value="2020">2020</option>
                                                <option value="2019">2019</option>
                                                <option value="2018">2018</option>
                                                <option value="2017">2017</option>
                                                <option value="2016">2016</option>
                                                <option value="2015">2015</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-2 d-flex">
                                        <div className="w-100 me-2">
                                            <label className="form-label text-start w-100" htmlFor="studentID">MSSV</label>
                                            <input type="text" id="studentID" className="form-control form-control-lg" 
                                                    name="studentID" value={studentCreatedState.studentID} onChange={handleChange}/>
                                        </div>

                                        <div className="w-100 ms-2">
                                            <label className="form-label text-start w-100" htmlFor="facultyName">Khoa</label>
                                            <select id="facultyName" className="form-control form-control-lg" 
                                                    name="facultyName" value={studentCreatedState.facultyName} onChange={handleChange}
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
                                                    name="username" value={studentCreatedState.username} onChange={handleChange}/> 
                                        </div>

                                        <div className="w-100 ms-2">
                                            <label className="form-label text-start w-100" htmlFor="password">Password</label>
                                            <input type="text" id="password" className="form-control form-control-lg" 
                                                    name="password" value={studentCreatedState.password} onChange={handleChange}/> 
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
                    </>}
                </div>

                <h3 className="mb-3">{state && state.facultyName && "Khoa: " + state.facultyName}</h3>
                
                <Table striped bordered hover className="mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Họ và tên</th>
                            <th>CMND/CCCD</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>MSSV</th>
                            <th>Năm nhập học</th>
                            <th>Khoa</th>
                            <th>Email</th>
                            {user.roleName.includes("ROLE_MANAGER") ? <th>Trạng thái</th> : <></>}
                            {user.roleName.includes("ROLE_MANAGER") ? <th>Lớp</th> : <></>}
                        </tr>
                    </thead>
                    <tbody>
                        {students && students.map((student, index) => {
                            return (
                                user.roleName.includes("ROLE_AAO")
                                ? <tr key={student.idCard} onClick={(e) => handleGetPerson(student.idCard, student.studentID, e)} style={{cursor: "pointer"}}>
                                    <td>{index+1}</td>
                                    <td>{student.lName} {student.fName}</td>
                                    <td>{student.idCard}</td>
                                    <td>{`${student.doB[2]}/${student.doB[1]}/${student.doB[0]}`}</td>
                                    <td>{student.gender === "Male" ? "Nam" : student.gender === "Female" ? "Nữ" : "Không biết"}</td>
                                    <td>{student.studentID}</td>
                                    <td>{student.admissionYear}</td>
                                    <td>{student.facultyName}</td>
                                    <td>{student.email}</td>
                                </tr>
                                : <tr key={student.idCard}>
                                    <td>{index+1}</td>
                                    <td>{student.lName} {student.fName}</td>
                                    <td>{student.idCard}</td>
                                    <td>{`${student.doB[2]}/${student.doB[1]}/${student.doB[0]}`}</td>
                                    <td>{student.gender === "Male" ? "Nam" : student.gender === "Female" ? "Nữ" : "Không biết"}</td>
                                    <td>{student.studentID}</td>
                                    <td>{student.admissionYear}</td>
                                    <td>{student.facultyName}</td>
                                    <td>{student.email}</td>
                                    {user.roleName.includes("ROLE_MANAGER")
                                    ? <td>
                                        <button className="btn btn-outline-primary" onClick={(e) => handleGetStudentStatus(student.lName, student.fName, student.studentID, e)}>Xem</button>
                                      </td>
                                    : <></>
                                    }
                                    {user.roleName.includes("ROLE_MANAGER")
                                    ? <td>
                                        <button className="btn btn-outline-primary" onClick={(e) => handleGetSubclassOfStudent(student.lName, student.fName, student.studentID, e)}>Xem</button>
                                      </td>
                                    : <></>
                                    }
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