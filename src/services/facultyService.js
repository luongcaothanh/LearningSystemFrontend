import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:8080/api";

const getAllFaculty = async () => {
    try {
        const response = await axios.get(API_URL + "/faculty", {headers: authService.setTokenHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const facultyService = {
    getAllFaculty
};

export default facultyService;