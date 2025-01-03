import apiClient from ".";



export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append(file, file.raw);
    console.log(file);
    return apiClient.post("/v1/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}