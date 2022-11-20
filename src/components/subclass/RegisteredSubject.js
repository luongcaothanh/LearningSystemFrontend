import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { searchSubclassOfSubjectThunk } from "../../redux/slices/subclassSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import studentService from "../../services/studentService";
import { getAuthSubclassOfStudentThunk } from "../../redux/slices/authSlice";
import ToastMessage from "../layout/ToastMessage";

function RegisteredSubject () {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const subclassSearch = useSelector((state) => state.subclass.subclassSearch);

    const [keyword, setKeyword] = useState("");
    const [show, setShow] = useState(false);
    const [singleSubject, setSingleSubject] = useState(null);
    const [toastState, setToastState] = useState(null);

    const handleClose = () => {
        setSingleSubject(null);
        setShow(false);
    }

    const handleShow = (subclass) => {
        setSingleSubject(subclass);
        setShow(true);
    };

    const handleChange = (event) => {
        setKeyword(event.target.value);
    };

    // search subclass
    const handleSubmit = (event) => {
        event.preventDefault();

        if (keyword !== "") {
            const arg = {
                keyword
            }
    
            dispatch(searchSubclassOfSubjectThunk(arg));
        }
    }

    // register subclass
    const handleRegisterSubject = async (subclass) => {
        const attendSubclassForm = {
            scid: subclass.id,
            scSemester: subclass.csemester,
            scYear: subclass.cyear,
            scType: subclass.ctype,
            scSubjectID: subclass.csubjectID
        }

        const response = await studentService.attendSubclass(attendSubclassForm);

        if (response.errorCode === 0) {
            setToastState({
                message: "Đăng ký môn học thành công.",
                subclassID: subclass.id,
                subjectName: subclass.subjectName
            });
            setTimeout(() => {
                setToastState(null);
            }, 5000);

            const arg = {
                studentID: user.studentID
            }
    
            dispatch(getAuthSubclassOfStudentThunk(arg));
        }

        handleClose();
    }
    
    return (
        <>
            <div className="mx-5">
                <div className="d-flex flex-row-reverse pt-2">
                    <ToastMessage object={toastState}></ToastMessage>
                </div>

                <form className="card-body py-5 text-center d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
                    <h4>Tìm kiếm môn học</h4>

                    <div className="form-outline d-flex w-50">
                        <input type="text" id="keyword" className="form-control form-control-lg me-2" 
                                name="keyword" value={keyword} onChange={handleChange}/> 

                        <button className="btn btn-lg btn-block login-btn text-white ms-2" type="submit" style={{backgroundColor: "var(--primaryColor)"}}>Search</button>
                    </div>
                </form>

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
                            <th>Giảng viên</th>
                            <th>Đăng ký</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(subclassSearch === null || subclassSearch.length === 0)
                        ?   <tr><td colSpan="9">Không có lớp học</td></tr>
                        :   <>
                                {subclassSearch && subclassSearch.map((subclass, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{subclass.id}</td>
                                            <td>{subclass.ctype}</td>
                                            <td>{subclass.csemester}</td>
                                            <td>{subclass.cyear}</td>
                                            <td>{subclass.csubjectID}</td>
                                            <td>{subclass.subjectName}</td>
                                            <td>{subclass.lecturer}</td>
                                            <td>
                                                <button className="btn btn-outline-primary" onClick={() => handleShow(subclass)}>Đăng ký</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </>
                        }
                    </tbody>

                    {singleSubject &&
                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header>
                                <Modal.Title>Xác nhận đăng ký</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div className="d-flex justify-content-between mb-2">
                                    <p className="mb-0">Lớp: <span className="fw-bold">{singleSubject.id}</span></p>
                                    <p className="mb-0">Học kỳ: <span className="fw-bold">{singleSubject.csemester}</span></p>
                                </div>
                                <p className="mb-0">Môn học: <span className="fw-bold">{singleSubject.subjectName}</span></p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                                <Button variant="primary" onClick={() => handleRegisterSubject(singleSubject)}>Đăng ký</Button>
                            </Modal.Footer>
                        </Modal>
                    }
                </Table>
            </div>
        </>
    );
}

export default RegisteredSubject;