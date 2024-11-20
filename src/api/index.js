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

export const getMajorPlanWeekly = (params) => apiClient.get("/v1/major_plans/weekly", { params })

export const addMajorPlanWeekly = (user_id, year, month, week) => {
    let data = {
        year: year,
        month: month,
        week: week,
        plan: [
            [], [], [], [], [], [], []
        ],
        user_id: user_id
    }
    return apiClient.post("/v1/major_plans/weekly", data)
}



export const editMajorPlanWeekly = (id, data) => apiClient.put(`/v1/major_plans/weekly/${id}`, data)

export const deleteMajorPlanWeekly = (id) => apiClient.delete(`/v1/major_plans/weekly/${id}`)





export const getMajorPlanMonthly = (params) => apiClient.get("/v1/major_plans/monthly", { params })

export const addMajorPlanMonthly = (user_id, year, month) => {
    let data = {
        year: year,
        month: month,
        plan: [
            [], [], [], []
        ],
        user_id: user_id
    }
    return apiClient.post("/v1/major_plans/monthly", data)
}

export const editMajorPlanMonthly = (id, data) => apiClient.put(`/v1/major_plans/monthly/${id}`, data)

export const deleteMajorPlanMonthly = (id) => apiClient.delete(`/v1/major_plans/monthly/${id}`)


export const getMajorPlanYearly = (params) => apiClient.get("/v1/major_plans/yearly", { params })

export const addMajorPlanYearly = (user_id, year) => {
    let data = {
        year: year,
        plan: [
            [], [], [], [], [], [], [], [], [], [], [], []
        ],
        user_id: user_id
    }
    return apiClient.post("/v1/major_plans/yearly", data)
}

export const editMajorPlanYearly = (id, data) => apiClient.put(`/v1/major_plans/yearly/${id}`, data)

export const deleteMajorPlanYearly = (id) => apiClient.delete(`/v1/major_plans/yearly/${id}`)


export const getShuangYiPlanWeekly = (params) => apiClient.get("/v1/shuang_yi_plans/weekly", { params })

export const addShuangYiPlanWeekly = (user_id, year, month, week) => {
    let data = {
        year: year,
        month: month,
        week: week,
        plan: [
            [], [], [], [], [], [], []
        ],
        user_id: user_id
    }
    return apiClient.post("/v1/shuang_yi_plans/weekly", data)
}



export const editShuangYiPlanWeekly = (id, data) => apiClient.put(`/v1/shuang_yi_plans/weekly/${id}`, data)

export const deleteShuangYiPlanWeekly = (id) => apiClient.delete(`/v1/shuang_yi_plans/weekly/${id}`)





export const getShuangYiPlanMonthly = (params) => apiClient.get("/v1/shuang_yi_plans/monthly", { params })

export const addShuangYiPlanMonthly = (user_id, year, month) => {
    let data = {
        year: year,
        month: month,
        plan: [
            [], [], [], []
        ],
        user_id: user_id
    }
    return apiClient.post("/v1/shuang_yi_plans/monthly", data)
}

export const editShuangYiPlanMonthly = (id, data) => apiClient.put(`/v1/shuang_yi_plans/monthly/${id}`, data)

export const deleteShuangYiPlanMonthly = (id) => apiClient.delete(`/v1/shuang_yi_plans/monthly/${id}`)


export const getShuangYiPlanYearly = (params) => apiClient.get("/v1/shuang_yi_plans/yearly", { params })

export const addShuangYiPlanYearly = (user_id, year) => {
    let data = {
        year: year,
        plan: [
            [], [], [], [], [], [], [], [], [], [], [], []
        ],
        user_id: user_id
    }
    return apiClient.post("/v1/shuang_yi_plans/yearly", data)
}

export const editShuangYiPlanYearly = (id, data) => apiClient.put(`/v1/shuang_yi_plans/yearly/${id}`, data)

export const deleteShuangYiPlanYearly = (id) => apiClient.delete(`/v1/shuang_yi_plans/yearly/${id}`)

export const getMyStaminInfo = () => apiClient.get("/v1/my/stamina_info")
export const getMyMajorInfo = () => apiClient.get("/v1/my/major_info")

export const getMyShuangYiInfo = () => apiClient.get("/v1/my/shuang_yi_info")

export const getMyStaminaPlanWeekly = (params) => apiClient.get("/v1/my/stamin_plans/weekly", { params })
export const getMyStaminaPlanMonthly = (params) => apiClient.get("/v1/my/stamin_plans/monthly", { params })
export const getMyStaminaPlanYearly = (params) => apiClient.get("/v1/my/stamin_plans/yearly", { params })

export const getMyMajorPlanWeekly = (params) => apiClient.get("/v1/my/major_plans/weekly", { params })
export const getMyMajorPlanMonthly = (params) => apiClient.get("/v1/my/major_plans/monthly", { params })
export const getMyMajorPlanYearly = (params) => apiClient.get("/v1/my/major_plans/yearly", { params })
export const getMyShuangYiPlanWeekly = (params) => apiClient.get("/v1/my/shuang_yi_plans/weekly", { params })
export const getMyShuangYiPlanMonthly = (params) => apiClient.get("/v1/my/shuang_yi_plans/monthly", { params })
export const getMyShuangYiPlanYearly = (params) => apiClient.get("/v1/my/shuang_yi_plans/yearly", { params })

export const getStaminaPlans = (params) => apiClient.get("/v1/stamin_plans", { params })
export const editStaminaPlan = (id, data) => apiClient.put(`/v1/stamin_plans/${id}`, data)
export const addStaminaPlan = (data) => apiClient.post("/v1/stamin_plans", data)
export const deleteStaminaPlan = (id) => apiClient.delete(`/v1/stamin_plans/${id}`)


export const getSubjects = (params) => apiClient.post("/v1/subjects/search", params)

export const editSubject = (id, data) => apiClient.put(`/v1/subjects/${id}`, data)

export const deleteSubject = (id) => apiClient.delete(`/v1/subjects/${id}`)

export const addSubject = (data) => apiClient.post("/v1/subjects", data)