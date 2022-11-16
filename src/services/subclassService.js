import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:8080/api";

const getSubclassOfClass = async (subjectID, semester) => {
    try {
        const response = await axios.get(API_URL + "/subclass_class",
            {headers: authService.setTokenHeader(), params: {subjectID, semester}});

        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const subclassService  = {
    getSubclassOfClass
};

export default subclassService ;