<template>
    <div class="question-status">
        <el-tag v-for="(item, index) in props.recordDetails" :key="index"
            :type="item.user_answer?.length ? 'success' : 'info'" class="status-tag" @click="jumpToQuestion(index)"
            round>
            第{{ index + 1 }}题
        </el-tag>
    </div>

    <!-- 倒计时展示 -->
    <div v-if="props.endAt" class="countdown-timer">
        剩余时间：{{ countdown }}
    </div>

    <div v-if="currentQuestion.content" class="question-container">
        <el-tag :type="questionType.type" size="normal">
            {{ questionType.text }}
        </el-tag>
        <p class="content">{{ currentIndex + 1 }}. {{ currentQuestion.content }}</p>
        <div class="image-box">
            <el-image v-for="(image, index) in currentQuestion.images" :key="index" :src="image" class="image"
                fit="cover" :preview-src-list="currentQuestion.images"></el-image>
        </div>
        <el-checkbox-group v-model="props.recordDetails[currentIndex].user_answer" @change="handleSubmitAnswer"
            :max="currentQuestion.type === 'multiple_choice' ? 100 : 1">
            <el-checkbox v-for="option in currentQuestion.options" :key="option.key" :label="option.value"
                :value="option.key"> {{ option.key }}. {{ option.value }}
            </el-checkbox>
        </el-checkbox-group>
    </div>

    <el-button type="success" size="default" @click="goToPreviousQuestion"
        :disabled="currentIndex === 0">上一题</el-button>
    <el-button type="success" size="default" @click="goToNextQuestion"
        :disabled="currentIndex === props.recordDetails.length - 1">下一题</el-button>
    <el-button type="danger" size="default" @click="handleEndAnswer">结束答题</el-button>
</template>


<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { getQuestion, submitAnswer } from "@/api/qa_system";

const props = defineProps({
    recordDetails: {
        type: Array,
        default: [],
    },
    endAt: {
        type: String,
        default: null
    }
});

// 当前题目索引
const currentIndex = ref(0);
const currentQuestion = ref({
    subject_id: 0,
    type: "single_choice",
    content: "",
    options: [
        {
            key: "A",
            value: "",
        },
        {
            key: "B",
            value: "",
        },
    ],
    answer: ["A"],
    images: [],
    id: 0,
    created_at: "2024-12-26T14:11:26",
    updated_at: "2024-12-27T10:08:31",
});

// 倒计时
const countdown = ref("");

// 格式化时间
const formatTime = (timeInSeconds) => {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(timeInSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
};

// 启动倒计时
let timer = null;
const startCountdown = () => {
    if (!props.endAt) return;

    const endTime = new Date(props.endAt).getTime();
    timer = setInterval(() => {
        const now = Date.now();
        const remainingTime = Math.floor((endTime - now) / 1000);

        if (remainingTime <= 0) {
            clearInterval(timer);
            countdown.value = "时间到！";
            handleEndAnswer(); // 自动结束答题
        } else {
            countdown.value = formatTime(remainingTime);
        }
    }, 1000);
};

// 计算题目类型
const questionType = computed(() => {
    switch (currentQuestion.value?.type) {
        case "single_choice":
            return { text: "单选题", type: "primary" };
        case "multiple_choice":
            return { text: "多选题", type: "danger" };
        case "true_false":
            return { text: "判断题", type: "warning" };
        default:
            return { text: "未知题型", type: "info" };
    }
});

// 题目控制
const fetchQuestion = async () => {
    if (props.recordDetails[currentIndex.value]) {
        const { data } = await getQuestion(
            props.recordDetails[currentIndex.value].question_id
        );
        currentQuestion.value = data;
    }
};

const goToPreviousQuestion = async () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
        await fetchQuestion();
    }
};

const goToNextQuestion = async () => {
    if (currentIndex.value < props.recordDetails.length - 1) {
        currentIndex.value++;
        await fetchQuestion();
    }
};

// 跳转到指定题目
const jumpToQuestion = async (index) => {
    if (index >= 0 && index < props.recordDetails.length) {
        currentIndex.value = index;
        await fetchQuestion();
    }
};

// 提交单个答案
const handleSubmitAnswer = async () => {
    const { data } = await submitAnswer(props.recordDetails[currentIndex.value].id, { answer: props.recordDetails[currentIndex.value].user_answer });
    props.recordDetails[currentIndex.value] = data;
};

// 结束答题
const handleEndAnswer = () => {
    console.log("答题结束");
    clearInterval(timer);
    emits('end-answer')
};

const emits = defineEmits(['end-answer'])

// 生命周期钩子
onMounted(async () => {
    startCountdown();
    await fetchQuestion();
});

onUnmounted(() => {
    if (timer) {
        clearInterval(timer);
    }
});
</script>

<style scoped>
.content {
    margin: 10px 0;
    font-size: 16px;
    color: #2c3e50;
}

.image-box {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.image {
    width: 100px;
    height: 100px;
}

.question-status {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 15px;
}

.status-tag {
    cursor: pointer;
}

.countdown-timer {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #f56c6c;
}
</style>
