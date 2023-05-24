import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import '@/global/style/main.less';
import "tailwindcss/tailwind.css"
import { setupRouter } from './router/index';
import { setupStore } from './stores/index';
import App from './App.vue';

import dayjs from 'dayjs';
import { dayjs as elDayjs } from 'element-plus';
import zhcn from 'dayjs/locale/zh-cn'

dayjs.locale(zhcn);
// 构建后，element-plus是script引入，它里面也有打包一个dayjs
// 需要给这个dayjs也设置中文，否则可能出现日期格式化显示英文的情况
elDayjs.locale(zhcn);


const app = createApp(App);
app.use(ElementPlus);

setupRouter(app);
setupStore(app);

app.mount('#app');
