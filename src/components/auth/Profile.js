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
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

function Profile () {
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const phone = useSelector((state) => state.auth.phone);
    const studentStatus = useSelector((state) => state.auth.studentStatus);
    const subclassOfStudent = useSelector((state) => state.auth.subclassOfStudent);
    const subclassOfLecturer = useSelector((state) => state.auth.subclassOfLecturer);

    const handleGetStudentStatus = (event) => {
        event.preventDefault();

        navigate("/student/status",
            { state: {
                fullName: user.lName + " " + user.fName,
                studentID: user.studentID
            }}
        );
    }

    const handleGetSubclassOfStudent = (event) => {
        event.preventDefault();

        navigate("/student/subclass",
            { state: {
                fullName: user.lName + " " + user.fName,
                studentID: user.studentID
            }}
        );
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

    return (
        <section style={{ backgroundColor: '#eee', minHeight: "calc(100vh - 116px)" }}>
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
                                <p className="text-muted my-2">{user.lName} {user.fName}</p>
                                <p className="text-muted mb-2">{user.facultyName}</p>
                                <p className="text-muted mb-2">
                                    {user.roleName.includes("ROLE_AAO") && "Phòng đào tạo"}
                                    {user.roleName.includes("ROLE_MANAGER") && "Quản lý khoa"}
                                    {user.roleName.includes("ROLE_LECTURER") && "Giảng viên"}
                                    {user.roleName.includes("ROLE_STUDENT") && "Sinh viên"}
                                </p>
                            </MDBCardBody>
                        </MDBCard>

                        {user.roleName.includes("ROLE_LECTURER") &&
                            <MDBCard className="mb-4 mb-lg-0">
                                    <MDBCardBody>
                                        <MDBCardText className="d-flex justify-content-between">
                                            <span>Môn học</span>
                                            <span>Lớp</span>
                                            <span>Học kỳ</span>
                                        </MDBCardText>

                                        <hr></hr>

                                        {(subclassOfLecturer && subclassOfLecturer.length === 0)
                                            ? "Chưa cập nhật"
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
                                                    }
                                                    
                                                })}

                                                <button className="btn btn-outline-primary" onClick={handleGetSubclassOfLecturer}>Xem tất cả</button>
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
                                        <MDBCardText>Họ và tên</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user.lName} {user.fName}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>CMND/CCCD</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user.idCard}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Ngày sinh</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{`${user.doB[2]}/${user.doB[1]}/${user.doB[0]}`}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Giới tính</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {user.gender === "Male" ? "Nam" : user.gender === "Female" ? "Nữ" : "Không biết"}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Số điện thoại</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{phone === null ? "Chưa cập nhật" : phone.phoneNumber}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                { user.studentID ? <>
                                        <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>MSSV</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{user.studentID}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                    </> : <>
                                        <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>MSCB</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{user.employeeID}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                    </>
                                    
                                }
                                { user.admissionYear && 
                                    <>
                                        <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Năm nhập học</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{user.admissionYear}</MDBCardText>
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
                                        <MDBCardText className="text-muted">{user.facultyName}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="6">
                                {user.roleName.includes("ROLE_STUDENT") &&
                                    <MDBCard className="mb-4 mb-md-0">
                                        <MDBCardBody>
                                            <MDBCardText className="d-flex justify-content-between">
                                                <span>Môn học</span>
                                                <span>Lớp</span>
                                                <span>Học kỳ</span>
                                            </MDBCardText>

                                            <hr></hr>

                                            {(subclassOfStudent && subclassOfStudent.length === 0)
                                                ? "Chưa cập nhật"
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
                                                        }
                                                        
                                                    })}

                                                    <button className="btn btn-outline-primary" onClick={handleGetSubclassOfStudent}>Xem tất cả</button>
                                                </>
                                            }
                                        </MDBCardBody>
                                    </MDBCard>
                                }
                            </MDBCol>

                            <MDBCol md="6">
                                {user.roleName.includes("ROLE_STUDENT") &&
                                    <MDBCard className="mb-4 mb-md-0">
                                        <MDBCardBody>
                                            <MDBCardText className="d-flex justify-content-between">
                                                <span>Học kỳ</span>
                                                <span>Số tín chỉ</span>
                                            </MDBCardText>

                                            <hr></hr>

                                            {(studentStatus && studentStatus.length === 0)
                                                ? "Chưa cập nhật"
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
                                                        }
                                                        
                                                    })}

                                                    <button className="btn btn-outline-primary" onClick={handleGetStudentStatus}>Xem tất cả</button>
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
        </section>
    );
}

export default Profile;
