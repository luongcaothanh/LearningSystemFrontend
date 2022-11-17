import axios from "axios";

const API_URL = "http://localhost:8080/api";

const setTokenHeader = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        return { Authorization: "Bearer " + accessToken };
    } else {
        return {};
    }
};

const isUserLogged = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        return true;
    } else {
        return false;
    }
};

const logout = () => {
    localStorage.removeItem("accessToken");
};


const login = async (username, password) => {
    try {
        const loginForm = {username, password};
        const response = await axios.post(API_URL + "/account/login", loginForm);
        
        if (response.data.errorCode === 0) {
            localStorage.setItem("accessToken", response.data.data.accessToken);
        }

        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
};

const getCurrentUser = async () => {
    try {
        const response = await axios.get(API_URL + "/account/myinfo", {headers: setTokenHeader()});

        return response.data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
};

const authService = {
    setTokenHeader,
    isUserLogged,
    logout,
    login,
    getCurrentUser
};

export default authService;