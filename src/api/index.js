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

export const getMajorInfo = (params) => apiClient.get("/v1/major_info", { params })

export const addMajorInfo = (data) => apiClient.post("/v1/major_info", data)

export const editMajorInfoByUserId = (user_id, data) => apiClient.put(`/v1/major_info/users/${user_id}`, data)

export const getShuangYiInfo = (data) => apiClient.post("/v1/shuang_yi_info/search", data)

export const addShuangYiInfo = (data) => apiClient.post("/v1/shuang_yi_info", data)

export const editShuangYiInfoByUserId = (user_id, data) => apiClient.put(`/v1/shuang_yi_info/users/${user_id}`, data)

export const getStaminPlanWeekly = (params) => apiClient.get("/v1/stamin_plans/weekly", { params })

export const addStaminPlanWeekly = (user_id, year, month, week) => {
    let data = {
        year: year,
        month: month,
        week: week,
        plan: [
            [], [], [], [], [], [], []
        ],
        user_id: user_id
    }
    return apiClient.post("/v1/stamin_plans/weekly", data)
}



export const editStaminPlanWeekly = (id, data) => apiClient.put(`/v1/stamin_plans/weekly/${id}`, data)

export const deleteStaminPlanWeekly = (id) => apiClient.delete(`/v1/stamin_plans/weekly/${id}`)





export const getStaminPlanMonthly = (params) => apiClient.get("/v1/stamin_plans/monthly", { params })

export const addStaminPlanMonthly = (user_id, year, month) => {
    let data = {
        year: year,
        month: month,
        plan: [
            [], [], [], []
        ],
        user_id: user_id
    }
    return apiClient.post("/v1/stamin_plans/monthly", data)
}

export const editStaminPlanMonthly = (id, data) => apiClient.put(`/v1/stamin_plans/monthly/${id}`, data)

export const deleteStaminPlanMonthly = (id) => apiClient.delete(`/v1/stamin_plans/monthly/${id}`)


export const getStaminPlanYearly = (params) => apiClient.get("/v1/stamin_plans/yearly", { params })

export const addStaminPlanYearly = (user_id, year) => {
    let data = {
        year: year,
        plan: [
            [], [], [], [], [], [], [], [], [], [], [], []
        ],
        user_id: user_id
    }
    return apiClient.post("/v1/stamin_plans/yearly", data)
}

export const editStaminPlanYearly = (id, data) => apiClient.put(`/v1/stamin_plans/yearly/${id}`, data)

export const deleteStaminPlanYearly = (id) => apiClient.delete(`/v1/stamin_plans/yearly/${id}`)