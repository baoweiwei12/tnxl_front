import apiClient from ".";

export const createFeedback = (content) => apiClient.post("/v1/feedback", { content })

export const getFeedbacks = (page = 1, per_page = 10) => apiClient.get("/v1/feedback", { params: { page, per_page } })

