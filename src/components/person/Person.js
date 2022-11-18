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

function Person () {
    const navigate = useNavigate();

    const person = useSelector((state) => state.person.person);
    const phone = useSelector((state) => state.person.phone);
    const studentStatus = useSelector((state) => state.person.studentStatus);

    const handleGetStudentStatus = (event) => {
        event.preventDefault();

        navigate("/student/status",
            { state: {
                fullName: person.lName + " " + person.fName,
                studentID: person.studentID
            }}
        );
    }

    return (
        <>
            {person && <section style={{ backgroundColor: '#eee' }}>
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
                                    {person.roleName.includes("ROLE_AAO") && "Phòng đào tạo"}
                                    {person.roleName.includes("ROLE_MANAGER") && "Quản lý khoa"}
                                    {person.roleName.includes("ROLE_LECTURER") && "Giảng viên"}
                                    {person.roleName.includes("ROLE_STUDENT") && "Sinh viên"}
                                </p>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody className="p-0">
                                <MDBListGroup className="rounded-3">
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                    <MDBIcon fas icon="globe fa-lg text-warning" />
                                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                                </MDBListGroupItem>
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                    <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                                    <MDBCardText>mdbootstrap</MDBCardText>
                                </MDBListGroupItem>
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                                    <MDBCardText>@mdbootstrap</MDBCardText>
                                </MDBListGroupItem>
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                                    <MDBCardText>mdbootstrap</MDBCardText>
                                </MDBListGroupItem>
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                                    <MDBCardText>mdbootstrap</MDBCardText>
                                </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Họ và tên</MDBCardText>
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
                                        <MDBCardText>Ngày sinh</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{`${person.doB[2]}/${person.doB[1]}/${person.doB[0]}`}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Giới tính</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {person.gender === "Male" ? "Nam" : person.gender === "Female" ? "Nữ" : "Không biết"}
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
                                                    <MDBCardText>Năm nhập học</MDBCardText>
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
                                <MDBCard className="mb-4 mb-md-0">
                                    {person.roleName.includes("ROLE_STUDENT")
                                    ?   <MDBCardBody>
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
                                                            return <div key={index} className="mb-3">
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
                                    :   <MDBCardBody>
                                            <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                                            <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                                            <MDBProgress className="rounded">
                                            <MDBProgressBar width={80} valuemin={0}  style={{backgroundColor: "var(--primaryColor)"}} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                                            <MDBProgress className="rounded">
                                            <MDBProgressBar width={72} valuemin={0}  style={{backgroundColor: "var(--primaryColor)"}} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                                            <MDBProgress className="rounded">
                                            <MDBProgressBar width={89} valuemin={0}  style={{backgroundColor: "var(--primaryColor)"}} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                                            <MDBProgress className="rounded">
                                            <MDBProgressBar width={55} valuemin={0}  style={{backgroundColor: "var(--primaryColor)"}} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                                            <MDBProgress className="rounded">
                                            <MDBProgressBar width={66} valuemin={0}  style={{backgroundColor: "var(--primaryColor)"}} />
                                            </MDBProgress>
                                        </MDBCardBody>
                                    }
                                </MDBCard>
                            </MDBCol>

                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                <MDBCardBody>
                                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                                    <MDBProgress className="rounded">
                                    <MDBProgressBar width={80} valuemin={0}  style={{backgroundColor: "var(--primaryColor)"}} />
                                    </MDBProgress>

                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                                    <MDBProgress className="rounded">
                                    <MDBProgressBar width={72} valuemin={0}  style={{backgroundColor: "var(--primaryColor)"}} />
                                    </MDBProgress>

                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                                    <MDBProgress className="rounded">
                                    <MDBProgressBar width={89} valuemin={0}  style={{backgroundColor: "var(--primaryColor)"}} />
                                    </MDBProgress>

                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                                    <MDBProgress className="rounded">
                                    <MDBProgressBar width={55} valuemin={0}  style={{backgroundColor: "var(--primaryColor)"}} />
                                    </MDBProgress>

                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                                    <MDBProgress className="rounded">
                                    <MDBProgressBar width={66} valuemin={0}  style={{backgroundColor: "var(--primaryColor)"}} />
                                    </MDBProgress>
                                </MDBCardBody>
                                </MDBCard>
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
