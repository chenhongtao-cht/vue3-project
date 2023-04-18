
import request, {
  // 如果有自定义拦截器的需求，可以用它
  // axios
} from '@sutpc/axios';

request.config({
  requestPre: import.meta.env.VITE_API_BASEPATH,
  contentType: 'json',
  // 如果要自定义返回的拦截器，记得把它设置为false
  // interceptor: false
});

// 允许业务自定义返回的拦截器
// axios.interceptors.request.use();
// axios.interceptors.response.use();