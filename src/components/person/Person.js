import React from "react";
import { useSelector } from "react-redux";
import avatar from "../../avatar.jfif";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBProgress,
    MDBProgressBar,
} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

function Person () {
    const navigate = useNavigate();

    const person = useSelector((state) => state.person.person);
    const phone = useSelector((state) => state.person.phone);
    const studentStatus = useSelector((state) => state.person.studentStatus);
    const subclassOfStudent = useSelector((state) => state.subclass.subclassOfStudent);
    const subclassOfLecturer = useSelector((state) => state.subclass.subclassOfLecturer);

    const handleGetStudentStatus = (event) => {
        event.preventDefault();

        navigate("/student/status",
            { state: {
                fullName: person.lName + " " + person.fName,
                studentID: person.studentID
            }}
        );
    }

    const handleGetSubclassOfStudent = (event) => {
        event.preventDefault();

        navigate("/student/subclass",
            { state: {
                fullName: person.lName + " " + person.fName,
                studentID: person.studentID
            }}
        );
    }

    const handleGetSubclassOfLecturer = (event) => {
        event.preventDefault();

        navigate("/lecturer/subclass",
            { state: {
                fullName: person.lName + " " + person.fName,
                lecturerID: person.employeeID
            }}
        );
    }

    return (
        <>
            {person && <section style={{ backgroundColor: '#eee', minHeight: "calc(100vh - 116px)" }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src={avatar}
                                    alt="avatar"
                                    className="rounded-circle border"
                                    style={{ width: '150px' }}
                                    fluid />
                                <p className="text-muted my-2">{person.lName} {person.fName}</p>
                                <p className="text-muted mb-2">{person.facultyName}</p>
                                <p className="text-muted mb-2">
                                    {person.roleName.includes("ROLE_AAO") && "Ph??ng ????o t???o"}
                                    {person.roleName.includes("ROLE_MANAGER") && "Qu???n l?? khoa"}
                                    {person.roleName.includes("ROLE_LECTURER") && "Gi???ng vi??n"}
                                    {person.roleName.includes("ROLE_STUDENT") && "Sinh vi??n"}
                                </p>
                            </MDBCardBody>
                        </MDBCard>

                        {person.roleName.includes("ROLE_LECTURER") &&
                            <MDBCard className="mb-4 mb-lg-0">
                                    <MDBCardBody>
                                        <MDBCardText className="d-flex justify-content-between">
                                            <span>M??n h???c</span>
                                            <span>L???p</span>
                                            <span>H???c k???</span>
                                        </MDBCardText>

                                        <hr></hr>

                                        {(subclassOfLecturer && subclassOfLecturer.length === 0)
                                            ? "Ch??a c???p nh???t"
                                            : <>
                                                {subclassOfLecturer && subclassOfLecturer.map((isubclassOfLecturer, index) => {
                                                    if (index >= subclassOfLecturer.length - 5) {
                                                        return <div key={index} className="mb-3">
                                                            <MDBCardText className="mb-1 d-flex justify-content-between">
                                                                <span>{isubclassOfLecturer.csubjectID}</span>
                                                                <span>{isubclassOfLecturer.id}</span>
                                                                <span>{isubclassOfLecturer.csemester}</span>
                                                            </MDBCardText>
                                                        </div>;
                                                    } else {
                                                        return <></>;
                                                    }
                                                    
                                                })}

                                                <button className="btn btn-outline-primary" onClick={handleGetSubclassOfLecturer}>Xem t???t c???</button>
                                            </>
                                        }
                                    </MDBCardBody>
                            </MDBCard>
                        }
                    </MDBCol>

                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>H??? v?? t??n</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{person.lName} {person.fName}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>CMND/CCCD</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{person.idCard}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Ng??y sinh</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{`${person.doB[2]}/${person.doB[1]}/${person.doB[0]}`}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Gi???i t??nh</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {person.gender === "Male" ? "Nam" : person.gender === "Female" ? "N???" : "Kh??ng bi???t"}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>S??? ??i???n tho???i</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{phone === null ? "Ch??a c???p nh???t" : phone.phoneNumber}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{person.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                { person.studentID ? <>
                                        <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>MSSV</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{person.studentID}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                    </> : <>
                                        <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>MSCB</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{person.employeeID}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                    </>
                                    
                                }
                                { person.admissionYear && 
                                    <>
                                        <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>N??m nh???p h???c</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{person.admissionYear}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                    </>
                                }            
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Khoa</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{person.facultyName}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="6">
                                {person.roleName.includes("ROLE_STUDENT") &&
                                    <MDBCard className="mb-4 mb-md-0">
                                        <MDBCardBody>
                                            <MDBCardText className="d-flex justify-content-between">
                                                <span>M??n h???c</span>
                                                <span>L???p</span>
                                                <span>H???c k???</span>
                                            </MDBCardText>

                                            <hr></hr>

                                            {(subclassOfStudent && subclassOfStudent.length === 0)
                                                ? "Ch??a c???p nh???t"
                                                : <>
                                                    {subclassOfStudent && subclassOfStudent.map((isubclassOfStudent, index) => {
                                                        if (index >= subclassOfStudent.length - 5) {
                                                            return <div key={index} className="mb-3">
                                                                <MDBCardText className="mb-1 d-flex justify-content-between">
                                                                    <span>{isubclassOfStudent.scsubjectID}</span>
                                                                    <span>{isubclassOfStudent.scid}</span>
                                                                    <span>{isubclassOfStudent.scsemester}</span>
                                                                </MDBCardText>
                                                            </div>;
                                                        } else {
                                                            return <></>;
                                                        }
                                                        
                                                    })}

                                                    <button className="btn btn-outline-primary" onClick={handleGetSubclassOfStudent}>Xem t???t c???</button>
                                                </>
                                            }
                                        </MDBCardBody>
                                    </MDBCard>
                                }
                            </MDBCol>

                            <MDBCol md="6">
                                {person.roleName.includes("ROLE_STUDENT") &&
                                    <MDBCard className="mb-4 mb-md-0">
                                        <MDBCardBody>
                                            <MDBCardText className="d-flex justify-content-between">
                                                <span>H???c k???</span>
                                                <span>S??? t??n ch???</span>
                                            </MDBCardText>

                                            <hr></hr>

                                            {(studentStatus && studentStatus.length === 0)
                                                ? "Ch??a c???p nh???t"
                                                : <>
                                                    {studentStatus && studentStatus.map((istudentStatus, index) => {
                                                        if (index >= studentStatus.length - 5) {
                                                            return <div key={index} className="mb-2">
                                                                <MDBCardText className="mb-1 d-flex justify-content-between">
                                                                    <span>{istudentStatus.semester}</span>
                                                                    <span className="">{istudentStatus.registeredCreditsNo}</span>
                                                                </MDBCardText>
                                                                <MDBProgress className="rounded">
                                                                    <MDBProgressBar width={(istudentStatus.registeredCreditsNo * 100)/21} valuemin={0}  style={{backgroundColor: "var(--primaryColor)"}}/>
                                                                </MDBProgress>
                                                            </div>;
                                                        } else {
                                                            return <></>;
                                                        }
                                                        
                                                    })}

                                                    <button className="btn btn-outline-primary" onClick={handleGetStudentStatus}>Xem t???t c???</button>
                                                </>
                                            }
                                        </MDBCardBody>
                                    </MDBCard>
                                }
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>}
        </>
    );
}

export default Person;
