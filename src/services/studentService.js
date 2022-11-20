import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:8080/api";

const getAllStudent = async () => {
    try {
        const response = await axios.get(API_URL + "/student", {headers: authService.setTokenHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const getStudentOfFaculty = async (facultyName) => {
    try {
        const response = await axios.get(API_URL + "/student/faculty", {headers: authService.setTokenHeader(), params: {facultyName}});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const getStudentInfo = async (personID) => {
    try {
        const response = await axios.get(API_URL + "/student/" + personID, {headers: authService.setTokenHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const getStudentStatus = async (studentID) => {
    try {
        const response = await axios.get(API_URL + "/student_status/" + studentID, {headers: authService.setTokenHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const createStudent = async (studentCreatedForm) => {
    try {
        const response = await axios.post(API_URL + "/create/student", studentCreatedForm, {headers: authService.setTokenHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const studentService = {
    getAllStudent,
    getStudentOfFaculty,
    getStudentInfo,
    getStudentStatus,
    createStudent
};

export default studentService;