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
            studentCreatedState.facultyName = "B???o d?????ng c??ng nghi???p";
        }
        if (studentCreatedState.admissionYear === "") {
            studentCreatedState.admissionYear = new Date().getFullYear().toString();
        }

        const response = await studentService.createStudent(studentCreatedState);
        if (response.errorCode === 0) {
            setToastState({
                message: "T???o Sinh vi??n th??nh c??ng.",
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

                    <h1>Danh s??ch Sinh vi??n</h1>

                    {user.roleName.includes("ROLE_AAO") && <>
                        <Button onClick={handleShow}>T???o sinh vi??n</Button>

                        {/* Modal */}
                        <Modal show={show} onHide={handleClose} centered size="lg">
                            <Modal.Header>
                                <Modal.Title>T???o sinh vi??n</Modal.Title>
                            </Modal.Header>

                            <form className="card-body p-2 text-center" onSubmit={handleSubmit}>
                                <Modal.Body>
                                    <div className="form-outline mb-2 d-flex">
                                        <div className="w-100 me-2">
                                            <label className="form-label text-start w-100" htmlFor="lName">H??? + T??n ?????m</label>
                                            <input type="text" id="lName" className="form-control form-control-lg" 
                                                    name="lName" value={studentCreatedState.lName} onChange={handleChange}/> 
                                        </div>

                                        <div className="w-100 ms-2">
                                            <label className="form-label text-start w-100" htmlFor="fName">T??n</label>    
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
                                            <label className="form-label text-start w-100" htmlFor="doB">Ng??y/Th??ng/N??m sinh</label>
                                            <input type="text" id="doB" className="form-control form-control-lg" 
                                                    name="doB" value={studentCreatedState.doB} onChange={handleChange}/>
                                        </div> 

                                        <div className="w-100 mx-2">
                                            <label className="form-label text-start w-100" htmlFor="gender">Gi???i t??nh</label>
                                            <select id="gender" className="form-control form-control-lg" 
                                                    name="gender" value={studentCreatedState.gender} onChange={handleChange}
                                                    >
                                                <option value="Male">Nam</option>
                                                <option value="Female">N???</option>
                                                <option value="Unknown">Kh??ng x??c ?????nh</option>
                                            </select>
                                        </div>

                                        <div className="w-100 ms-2">
                                            <label className="form-label text-start w-100" htmlFor="admissionYear">N??m nh???p h???c</label>
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
                                                <option value="B???o d?????ng c??ng nghi???p">B???o d?????ng c??ng nghi???p</option>
                                                <option value="C?? kh??">C?? kh??</option>
                                                <option value="C??ng ngh??? v???t li???u">C??ng ngh??? v???t li???u</option>
                                                <option value="??i???n - ??i???n t???">??i???n - ??i???n t???</option>
                                                <option value="Khoa h???c ???ng d???ng">Khoa h???c ???ng d???ng</option>
                                                <option value="Khoa h???c v?? K??? thu???t m??y t??nh">Khoa h???c v?? K??? thu???t m??y t??nh</option>
                                                <option value="K??? thu???t ?????a ch???t v?? d???u kh??">K??? thu???t ?????a ch???t v?? d???u kh??</option>
                                                <option value="K??? thu???t giao th??ng">K??? thu???t giao th??ng</option>
                                                <option value="K??? thu???t h??a h???c">K??? thu???t h??a h???c</option>
                                                <option value="K??? thu???t x??y d???ng">K??? thu???t x??y d???ng</option>
                                                <option value="M??i tr?????ng v?? t??i nguy??n">M??i tr?????ng v?? t??i nguy??n</option>
                                                <option value="Qu???n l?? c??ng nghi???p">Qu???n l?? c??ng nghi???p</option>
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
                                        ????ng
                                    </Button>
                                    <Button type="submit" variant="primary">
                                        T???o
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
                            <th>H??? v?? t??n</th>
                            <th>CMND/CCCD</th>
                            <th>Ng??y sinh</th>
                            <th>Gi???i t??nh</th>
                            <th>MSSV</th>
                            <th>N??m nh???p h???c</th>
                            <th>Khoa</th>
                            <th>Email</th>
                            {user.roleName.includes("ROLE_MANAGER") ? <th>Tr???ng th??i</th> : <></>}
                            {user.roleName.includes("ROLE_MANAGER") ? <th>L???p</th> : <></>}
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
                                    <td>{student.gender === "Male" ? "Nam" : student.gender === "Female" ? "N???" : "Kh??ng bi???t"}</td>
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
                                    <td>{student.gender === "Male" ? "Nam" : student.gender === "Female" ? "N???" : "Kh??ng bi???t"}</td>
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