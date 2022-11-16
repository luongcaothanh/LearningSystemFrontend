import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:8080/api";

const getAllLecturer = async () => {
    try {
        const response = await axios.get(API_URL + "/lecturer", {headers: authService.setTokenHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const getLecturerOfFaculty = async (facultyName) => {
    try {
        const response = await axios.get(API_URL + "/lecturer/faculty", {headers: authService.setTokenHeader(), params: {facultyName}});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const lecturerService = {
    getAllLecturer,
    getLecturerOfFaculty
};

export default lecturerService;