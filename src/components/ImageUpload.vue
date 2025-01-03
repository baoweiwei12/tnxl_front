<template>
    <div>
        <el-upload :file-list="uploadFileList" :action="uploadApi" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleUploadSuccess"
            :on-error="handleUploadError">
            <el-icon>
                <Plus />
            </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible" style="width: 20%;">
            <img style="width: 100%;" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'

// 上传接口地址
const uploadApi = process.env.VUE_APP_API_URL + '/v1/upload'

// 接收 props 和 emits
const props = defineProps({
    images: {
        type: Array,
        required: true,
    },
})
const emit = defineEmits(['update:images'])

// 状态变量
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 文件列表映射（处理为字符串 URL 列表）
const uploadFileList = computed(() =>
    props.images?.map((url) => ({
        url: url.startsWith('http') ? url : process.env.VUE_APP_API_URL + url
    }))
)

// 上传成功处理函数
const handleUploadSuccess = (response, file) => {

    if (response.url) {
        const fullUrl = response.url.startsWith('http') ? response.url : process.env.VUE_APP_API_URL + response.url
        emit('update:images', [...props.images, fullUrl])
    } else {
        console.error('Invalid response format:', response)
    }
}

// 上传失败处理函数
const handleUploadError = (error, file) => {
    console.error('Upload failed:', error, file)
}

// 删除处理函数
const handleRemove = (uploadFile) => {
    const updatedImages = props.images.filter((url) => url !== uploadFile.url)
    emit('update:images', updatedImages)
}

// 图片预览处理函数
const handlePictureCardPreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url.startsWith('http')
        ? uploadFile.url
        : process.env.VUE_APP_API_URL + uploadFile.url
    dialogVisible.value = true
}
</script>