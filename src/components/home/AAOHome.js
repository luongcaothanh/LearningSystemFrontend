import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllEmpThunk } from "../../redux/slices/employeeSlice";
import { getAllFacultyThunk } from "../../redux/slices/facultySlice";
import { getAllLecturerThunk } from "../../redux/slices/lecturerSlice";
import { getAllStudentThunk } from "../../redux/slices/studentSlice";
import { getAllSubjectThunk } from "../../redux/slices/subjectSlide";
 
function AAOHome () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGetAllEmployee = async (event) => {
        event.preventDefault();

        dispatch(getAllEmpThunk());

        navigate("/employee");
    }

    const handleGetAllFaculty = async (event) => {
        event.preventDefault();

        dispatch(getAllFacultyThunk());

        navigate("/faculty");
    }

    const handleGetAllLecturer = async (event) => {
        event.preventDefault();

        dispatch(getAllLecturerThunk());

        navigate("/lecturer");
    }

    const handleGetAllStudent = async (event) => {
        event.preventDefault();

        dispatch(getAllStudentThunk());

        navigate("/student");
    }

    const handleGetAllSubject = async (event) => {
        event.preventDefault();

        dispatch(getAllSubjectThunk());

        navigate("/subject");
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
                            <h3 className="mb-0">M??n h???c</h3>
                        </div>

                        <div className="w-25 rounded-end d-flex align-items-center justify-content-center" style={{backgroundColor: "var(--primaryColor)"}}>
                            <i className="bi bi-book-fill text-white fs-1"></i>
                        </div>
                    </div>
                </Col>

                <Col className="home-col col-6 ps-0">
                    <div onClick={handleGetAllEmployee} className="border rounded d-flex text-decoration-none text-secondary" style={{height: "100px"}}>
                        <div className="w-25 rounded-start d-flex align-items-center justify-content-center" style={{backgroundColor: "var(--primaryColor)"}}>
                            <i className="bi bi-file-person text-white fs-1"></i>
                        </div>
                        
                        <div className="w-75 d-flex align-items-center justify-content-center">
                            <h3 className="mb-0">Nh??n vi??n</h3>
                        </div>
                    </div>
                </Col>
                
                <Col className="home-col col-6 pe-0">
                    <div onClick={handleGetAllLecturer} className="border rounded d-flex text-decoration-none text-secondary" style={{height: "100px"}}>
                        <div className="w-75 d-flex align-items-center justify-content-center">
                            <h3 className="mb-0">Gi???ng vi??n</h3>
                        </div>

                        <div className="w-25 rounded-end d-flex align-items-center justify-content-center" style={{backgroundColor: "var(--primaryColor)"}}>
                            <i className="bi bi-person-fill-gear text-white fs-1"></i>
                        </div>
                    </div>
                </Col>

                <Col className="home-col col-6 ps-0">
                    <div onClick={handleGetAllStudent} className="border rounded d-flex text-decoration-none text-secondary" style={{height: "100px"}}>
                        <div className="w-25 rounded-start d-flex align-items-center justify-content-center" style={{backgroundColor: "var(--primaryColor)"}}>
                            <i className="bi bi-person-fill text-white fs-1"></i>
                        </div>

                        <div className="w-75 d-flex align-items-center justify-content-center">
                            <h3 className="mb-0">Sinh vi??n</h3>
                        </div>
                    </div>
                </Col>  
            </Row>
        </Container>
    </div>;
}

export default AAOHome;