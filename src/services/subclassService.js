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

const getStudentOfSubclass = async (subclassID, semester, subjectID) => {
    try {
        const response = await axios.get(API_URL + "/subclass/student",
            {headers: authService.setTokenHeader(), params: {subclassID, semester, subjectID}});

        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const getSubclassOfStudent = async (studentID) => {
    try {
        const response = await axios.get(API_URL + "/subclass_student/" + studentID,
            {headers: authService.setTokenHeader()});

        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const getSubclassOfLecturer = async (lecturerID) => {
    try {
        const response = await axios.get(API_URL + "/subclass_lecturer/" + lecturerID,
            {headers: authService.setTokenHeader()});

        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const getSubclassOfSubject = async (subjectID) => {
    try {
        const response = await axios.get(API_URL + "/subclass_subject/" + subjectID,
            {headers: authService.setTokenHeader()});

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
    getSubclassOfClass,
    getStudentOfSubclass,
    getSubclassOfStudent,
    getSubclassOfLecturer,
    getSubclassOfSubject
};

export default subclassService ;