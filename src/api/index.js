import axios from "axios";
import router from "../router";
import { tokenStorage, clearStorage } from "@/storage";

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 10000,
});


apiClient.interceptors.request.use(
    (config) => {
        const token = tokenStorage.get();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


apiClient.interceptors.response.use(
    (response) => {

        return response;
    },
    (error) => {

        if (error.response && error.response.status === 401) {

            if (router.currentRoute.value.path !== "/login") {
                clearStorage()
                router.push("/login");
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;


export const login = (username, password) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return apiClient.post("/v1/login/token", formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const getUsersMe = () => apiClient.get("/v1/users/me")

export const getUsers = (params) => apiClient.get("/v1/users", { params })

export const searchUsers = (keyword) => apiClient.get("/v1/users/search", { params: { keyword } })

export const editUser = (id, data) => apiClient.put(`/v1/users/${id}`, data)

export const addUser = (data) => apiClient.post("/v1/users", data)

export const getGroups = () => apiClient.get("/v1/groups")

export const addGroup = (data) => apiClient.post("/v1/groups", data)

export const editGroup = (id, data) => apiClient.put(`/v1/groups/${id}`, data)

export const addStaminaInfo = (data) => apiClient.post("/v1/stamina_info", data)

export const getStaminaInfo = (params) => apiClient.get("/v1/stamina_info", { params })

export const editStaminaInfoByUserId = (user_id, data) => apiClient.put(`/v1/stamina_info/users/${user_id}`, data)