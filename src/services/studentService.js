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

const studentService = {
    getAllStudent,
    getStudentOfFaculty
};

export default studentService;