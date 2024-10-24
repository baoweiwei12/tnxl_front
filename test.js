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