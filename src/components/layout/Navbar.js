import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import { logout } from "../../redux/slices/authSlice";
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import avatar from "../../avatar.jfif";

function Navbar () {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        authService.logout();
        dispatch(logout());
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light text-white fixed-top px-5"  style={{backgroundColor: "var(--primaryColor)"}}>
            <div className="container-fluid">
                <Link className="navbar-brand text-white" to={"/"}>
                    <h3 className="mb-0">Learning System</h3>
                </Link>
                
                <div className="d-flex align-items-center">
                    <Dropdown>
                        <Dropdown.Toggle className='bg-transparent border-0 d-flex dropdown-avatar'>
                            <Image
                                roundedCircle={true}
                                width={'30px'}
                                height={'30px'}
                                src={avatar}
                            />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='dropdown-menu-end mb-0 p-0 border-0 shadow rounded-3'>
                            <Dropdown.Item
                                to={"/profile"}
                                as={Link}
                                className='d-flex align-items-center rounded-top rounded-3'>
                                Profile
                            </Dropdown.Item>

                            <Dropdown.Divider className='m-0' />

                            <Dropdown.Item
                                className='d-flex align-items-center rounded-top rounded-3'>
                                <Button
                                    className='p-0 text-dark text-start rounded-3 bg-transparent border-0'
                                    onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Dropdown.Item>
                            
                            
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className="text-start">
                        <h6 className="mb-0">{user.lName} {user.fName}</h6>
                        <p className="mb-0">{user.facultyName}</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;