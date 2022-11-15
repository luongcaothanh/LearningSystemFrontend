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

const isAAO = () => {
    const role = localStorage.getItem("role");
    if (role.includes("ROLE_AAO")) {
        return true;
    } else {
        return false;
    }
}

const isManager = () => {
    const role = localStorage.getItem("role");
    if (role.includes("ROLE_MANAGER")) {
        return true;
    } else {
        return false;
    }
}

const isLecturer = () => {
    const role = localStorage.getItem("role");
    if (role.includes("ROLE_LECTURER")) {
        return true;
    } else {
        return false;
    }
}

const isStudent = () => {
    const role = localStorage.getItem("role");
    if (role.includes("ROLE_STUDENT")) {
        return true;
    } else {
        return false;
    }
}

const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
};


const login = async (username, password) => {
    try {
        const response = await axios.post(API_URL + "/account/login", null, {params: {username, password}});
        
        if (response.data.errorCode === 0) {
            localStorage.setItem("accessToken", response.data.data.accessToken);
            localStorage.setItem("role", response.data.data.role);
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
    isAAO,
    isManager,
    isLecturer,
    isStudent,
    logout,
    login,
    getCurrentUser
};

export default authService;