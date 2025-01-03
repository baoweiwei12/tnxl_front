/**
 * 将日期时间字符串格式化为 "xxxx-xx-xx xx:xx:xx" 的格式
 * @param {string} dateTimeString - 输入的日期时间字符串，格式为 "yyyy-mm-dd hh:ii:ss" 或 "yyyy-mm-ddTHh:ii:ss" 等
 * @returns {string} 格式化后的日期时间字符串，如果输入为空则返回空字符串
 */
export const dateFormat = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * 将日期时间字符串格式化为 "xxxx-xx-xx xx:xx:xx" 的格式
 * @param {string} dateTimeString - 输入的日期时间字符串，格式为 "yyyy-mm-dd hh:ii:ss" 或 "yyyy-mm-ddTHh:ii:ss" 等
 * @returns {string} 格式化后的日期时间字符串，如果输入为空则返回空字符串
 */
export const dateTimeFormat = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const makeUrl = (url) => {
    return process.env.VUE_APP_API_URL + url;
};

/**
 * 检查两个数组是否相等
 * 此函数通过比较两个数组的元素来确定它们是否相等它首先检查数组的长度，
 * 如果长度不同，则数组不可能相等如果长度相同，它会排序两个数组并逐元素比较
 * 
 * @param {Array} arr1 第一个数组
 * @param {Array} arr2 第二个数组
 * @returns {boolean} 如果数组相等返回true，否则返回false
 */
export function arraysEqual(arr1, arr2) {
    // 检查长度
    if (arr1.length !== arr2.length) {
        return false;
    }

    // 排序并比较
    arr1 = arr1.slice().sort(); // 使用 slice() 避免修改原数组
    arr2 = arr2.slice().sort(); // 使用 slice() 避免修改原数组

    // 对比排序后的数组
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}
