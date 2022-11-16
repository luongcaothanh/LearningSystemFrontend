import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:8080/api";

const getClassOfSubject = async (subjectID) => {
    try {
        const response = await axios.get(API_URL + "/class/subject",
            {headers: authService.setTokenHeader(), params: {subjectID}});

        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const classService  = {
    getClassOfSubject
};

export default classService ;