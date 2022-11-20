import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:8080/api";

const getAllEmployee = async () => {
    try {
        const response = await axios.get(API_URL + "/employee", {headers: authService.setTokenHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const getAAOInfo = async (personID) => {
    try {
        const response = await axios.get(API_URL + "/aao/" + personID, {headers: authService.setTokenHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const getManagerInfo = async (personID) => {
    try {
        const response = await axios.get(API_URL + "/manager/" + personID, {headers: authService.setTokenHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const createAAO = async (AAOCreatedForm) => {
    try {
        const response = await axios.post(API_URL + "/create/aao", AAOCreatedForm, {headers: authService.setTokenHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const createManager = async (managerCreatedForm) => {
    try {
        const response = await axios.post(API_URL + "/create/manager", managerCreatedForm, {headers: authService.setTokenHeader()});
        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

const employeeService = {
    getAllEmployee,
    getAAOInfo,
    getManagerInfo,
    createAAO,
    createManager
};

export default employeeService;