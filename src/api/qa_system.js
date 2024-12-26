import apiClient from ".";

// 创建学习科目
export const createStudySubject = (data) => {
    return apiClient.post("/v1/study_subject", data);
}

// 更新学习科目
export const updateStudySubject = (id, data) => {
    return apiClient.put(`/v1/study_subject/${id}`, data);
}

// 获取学习科目列表
export const getStudySubjects = (keyword, page = 1, per_page = 10) => {
    return apiClient.get("/v1/study_subject", {
        params: {
            keyword,
            page,
            per_page
        }
    });
}

// 软删除学习科目
export const deleteStudySubject = (id) => {
    return apiClient.delete(`/v1/study_subject/${id}`);
}

// 创建问题
export const createQuestion = (data) => {
    return apiClient.post("/v1/question", data);
}

// 获取问题列表
export const getQuestions = (params) => {
    return apiClient.get("/v1/question", {
        params: {
            keyword: params.keyword,
            page: params.page || 1,
            per_page: params.per_page || 10,
            subject_id: params.subject_id,
            type: params.type
        }
    });
}

// 更新问题
export const updateQuestion = (id, data) => {
    return apiClient.put(`/v1/question/${id}`, data);
}

// 软删除问题
export const deleteQuestion = (id) => {
    return apiClient.delete(`/v1/question/${id}`);
}