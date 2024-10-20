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