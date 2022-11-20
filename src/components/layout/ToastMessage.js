import React from 'react';
import { Link } from 'react-router-dom';
import avatar from "../../avatar.jfif";

import { Toast, Image } from 'react-bootstrap';
import { useSelector } from "react-redux";

const ToastMessages = ({object}) => {
    const user = useSelector((state) => state.auth.user);

    return (
        object === null ? null
        : <Toast
            show={true}
            className={`toast-messages shadow rounded-3 border border-1 border-info`}
            delay={5000}
            autohide>
            <Toast.Header className='justify-content-between'>
                <Link
                    to={`/profile`}
                    className='d-flex align-items-center text-decoration-none text-dark'>
                    <Image
                        className='border img-cover'
                        src={avatar}
                        roundedCircle={true}
                        width={'30px'}
                        height={'30px'}></Image>
                    <h6 className='mb-0 ms-2'>{user.lName} {user.fName}</h6>
                </Link>
            </Toast.Header>
            <Toast.Body className='d-flex flex-column align-items-center'>
                <p className='mb-0 fw-bold'>{object.message}</p>
                <p className='mb-0'>Họ và tên: {object.fullName}</p>
                <p className='mb-0'>Khoa: {object.facultyName}</p>
            </Toast.Body>
        </Toast>
    );
};

export default ToastMessages;