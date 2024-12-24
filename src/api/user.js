import apiClient from ".";
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

/**
 * 获取当前用户的信息
 * 
 * 此函数通过发送GET请求到/v1/users/me端点，从服务器获取当前用户的信息
 * 它没有参数，并返回一个Promise对象，该对象解析为用户信息的响应数据
 */
export const getUsersMe = () => apiClient.get("/v1/users/me")

export const searchUsers = (data, page, per_page) => apiClient.post("/v1/users/search", data, { params: { page, per_page } })

export const editUser = (id, data) => apiClient.put(`/v1/users/${id}`, data)

export const addUser = (data) => apiClient.post("/v1/users/create", data)

export const deleteUser = (id) => apiClient.delete(`/v1/users/${id}`)


