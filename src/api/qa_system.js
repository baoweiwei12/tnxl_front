import apiClient from ".";

// 创建学习科目
export const createStudySubject = (data) => {
    return apiClient.post("/v1/study_subject", data);
}

// 获取所有学习科目
export const getAllStudySubjects = () => {
    return apiClient.get("/v1/study_subject/all");
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
            keyword: params.keyword || null,
            page: params.page || 1,
            per_page: params.per_page || 10,
            subject_id: params.subject_id || null,
            type: params.type || null
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


export const searchAnswerRecords = (params) => {
    return apiClient.get("/v1/answer_record", {
        params: {
            subject_id: params.subjectId || null,
            type: params.type || null,
            page: params.page || 1,
            per_page: params.per_page || 10,
        }
    });
}


// 获取答题详情
export const getAnswerRecordDetails = (record_id) => {
    return apiClient.get(`/v1/answer_record/${record_id}/details`);
}

// 获取题目
export const getQuestion = (id) => {
    return apiClient.get(`/v1/question/${id}`);
}

// 提交答案
export const submitAnswer = (detail_id, data) => {
    return apiClient.post(`/v1/answer_record/details/${detail_id}/answer`, data);
}

// 结束作答
export const endAnswer = (answer_record_id) => {
    return apiClient.put(`/v1/answer_record/${answer_record_id}`);
}


// 创建答题记录 (开始答题)
export const createAnswerRecord = (data) => {
    return apiClient.post("/v1/answer_record", {
        subject_id: data.subjectId,
        type: data.type
    });
}

//获取错题
export const getWrongQuestions = (params) => {
    return apiClient.get("/v1/error_answer_record_details", {
        params: {
            subject_id: params.subjectId || null,
        }
    });
}

// 通过错题
export const passWrongQuestion = (error_answer_record_detail_id) => {
    return apiClient.post(`/v1/error_answer_record_details/${error_answer_record_detail_id}/pass`);
}

// 统计数据
export const getStatistics = (params) => {
    return apiClient.get("/v1/score_statistics", {
        params: {
            subject_id: params.subjectId || null,
            type: params.type || null,
            max_times: params.maxTimes || null
        }
    });
}