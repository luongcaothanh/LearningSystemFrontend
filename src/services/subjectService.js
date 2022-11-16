import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:8080/api";

const getAllSubject = async () => {
    try {
        const response = await axios.get(API_URL + "/subject", {headers: authService.setTokenHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const getSubjectOfFaculty = async (facultyName) => {
    try {
        const response = await axios.get(API_URL + "/subject/faculty", {headers: authService.setTokenHeader(), params: {facultyName}});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const subjectService  = {
    getAllSubject,
    getSubjectOfFaculty
};

export default subjectService ;