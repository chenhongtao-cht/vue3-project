import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import '@/global/style/main.less';
import "tailwindcss/tailwind.css"
import { setupRouter } from './router/index';
import { setupStore } from './stores/index';
import App from './App.vue';


const app = createApp(App);
app.use(ElementPlus);

setupRouter(app);
setupStore(app);

app.mount('#app');
