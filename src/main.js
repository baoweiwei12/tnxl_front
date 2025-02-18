import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import { debounce } from "lodash";
const app = createApp(App);
app.use(ElementPlus, { locale: zhCn, });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(router);
app.mount("#app");

const OriginalResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends OriginalResizeObserver {
    constructor(callback) {
        callback = debounce(callback, 100);

        super(callback);
    }
};
