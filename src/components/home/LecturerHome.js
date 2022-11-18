import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFacultyThunk } from "../../redux/slices/facultySlice";
import { getAllSubjectThunk } from "../../redux/slices/subjectSlide";

function LecturerHome () {
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

    const handleGetSubclassOfLecturer = (event) => {
        event.preventDefault();

        navigate("/lecturer/subclass",
            { state: {
                fullName: user.lName + " " + user.fName,
                lecturerID: user.employeeID
            }}
        );
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
                    <div onClick={handleGetSubclassOfLecturer} className="border rounded d-flex text-decoration-none text-secondary" style={{height: "100px"}}>
                        <div className="w-25 rounded-start d-flex align-items-center justify-content-center" style={{backgroundColor: "var(--primaryColor)"}}>
                            <i className="bi bi-door-closed-fill text-white fs-1"></i>
                        </div>

                        <div className="w-75 d-flex align-items-center justify-content-center">
                            <h3 className="mb-0">Lớp của tôi</h3>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>;
}

export default LecturerHome;