import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFacultyThunk } from "../../redux/slices/facultySlice";
import { getAllSubjectThunk } from "../../redux/slices/subjectSlide";
import { getSubjectOfFacultyThunk } from "../../redux/slices/subjectSlide";
import { getLecturerOfFacultyThunk } from "../../redux/slices/lecturerSlice";
import { getStudentOfFacultyThunk } from "../../redux/slices/studentSlice";

function ManagerHome () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    const handleGetAllFaculty = async (event) => {
        event.preventDefault();

        dispatch(getAllFacultyThunk());

        navigate("/faculty");
    }

    const handleGetAllSubject = async (event) => {
        event.preventDefault();

        dispatch(getAllSubjectThunk());

        navigate("/subject");
    }

    const handleGetSubjectOfFaculty = (facultyName, event) => {
        event.preventDefault();

        const arg = {
            facultyName
        }

        dispatch(getSubjectOfFacultyThunk(arg));

        navigate("/subject", { state: {facultyName} });
    }

    const handleGetLecturerOfFaculty = (facultyName, event) => {
        event.preventDefault();

        const arg = {
            facultyName
        }

        dispatch(getLecturerOfFacultyThunk(arg));

        navigate("/lecturer", { state: {facultyName} });
    }

    const handleGetStudentOfFaculty = (facultyName, event) => {
        event.preventDefault();

        const arg = {
            facultyName
        }

        dispatch(getStudentOfFacultyThunk(arg));

        navigate("/student", { state: {facultyName} });
    }

    return <div className="my-5">
        <Container>
            <Row className="mb-5 g-5">
                <Col className="home-col col-6 ps-0">
                    <div onClick={handleGetAllFaculty} className="border rounded d-flex text-decoration-none text-secondary" style={{height: "100px"}}>
                        <div className="w-25 rounded-start d-flex align-items-center justify-content-center" style={{backgroundColor: "var(--primaryColor)"}}>
                            <i className="bi bi-bank text-white fs-1"></i>
                        </div>

                        <div className="w-75 d-flex align-items-center justify-content-center">
                            <h3 className="mb-0">Khoa</h3>
                        </div>
                    </div>
                </Col>

                <Col className="home-col col-6 pe-0">
                    <div onClick={handleGetAllSubject} className="border rounded d-flex text-decoration-none text-secondary" style={{height: "100px"}}>
                        <div className="w-75 d-flex align-items-center justify-content-center">
                            <h3 className="mb-0">Môn học</h3>
                        </div>

                        <div className="w-25 rounded-end d-flex align-items-center justify-content-center" style={{backgroundColor: "var(--primaryColor)"}}>
                            <i className="bi bi-book-fill text-white fs-1"></i>
                        </div>
                    </div>
                </Col>

                <Col className="home-col col-6 ps-0">
                    <div onClick={(e) => handleGetSubjectOfFaculty(user.facultyName, e)} className="border rounded d-flex text-decoration-none text-secondary" style={{height: "100px"}}>
                        <div className="w-25 rounded-start d-flex align-items-center justify-content-center" style={{backgroundColor: "var(--primaryColor)"}}>
                            <i className="bi bi-book-half text-white fs-1"></i>
                        </div>

                        <div className="w-75 d-flex flex-column align-items-center justify-content-center">
                            <h3 className="mb-0">Môn học</h3>
                            <h6 className="mb-0">{`(Khoa ${user.facultyName} )`}</h6>
                        </div>
                    </div>
                </Col>

                <Col className="home-col col-6 pe-0">
                    <div onClick={(e) => handleGetLecturerOfFaculty(user.facultyName, e)} className="border rounded d-flex text-decoration-none text-secondary" style={{height: "100px"}}>
                        <div className="w-75 d-flex flex-column align-items-center justify-content-center">
                            <h3 className="mb-0">Giảng viên</h3>
                            <h6 className="mb-0">{`(Khoa ${user.facultyName} )`}</h6>
                        </div>

                        <div className="w-25 rounded-end d-flex align-items-center justify-content-center" style={{backgroundColor: "var(--primaryColor)"}}>
                            <i className="bi bi-person-fill-gear text-white fs-1"></i>
                        </div>
                    </div>
                </Col>

                <Col className="home-col col-6 ps-0">
                    <div onClick={(e) => handleGetStudentOfFaculty(user.facultyName, e)} className="border rounded d-flex text-decoration-none text-secondary" style={{height: "100px"}}>
                        <div className="w-25 rounded-start d-flex align-items-center justify-content-center" style={{backgroundColor: "var(--primaryColor)"}}>
                            <i className="bi bi-person-fill text-white fs-1"></i>
                        </div>

                        <div className="w-75 d-flex flex-column align-items-center justify-content-center">
                            <h3 className="mb-0">Sinh viên</h3>
                            <h6 className="mb-0">{`(Khoa ${user.facultyName} )`}</h6>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>;
}

export default ManagerHome;