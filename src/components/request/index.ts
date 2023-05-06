import Request from './request'
import { BASE_URL, TIME_OUT } from './config'
const request = new Request({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    showLoading: true,
    interceptors: {
        requestSuccessInterceptor(config) {
            console.log('Request实例请求成功的拦截器')
            return config
        },
        requestErrorInterceptor(err) {
            console.log('Request实例请求失败的拦截器')
            return err
        },
        responseSuccessInterceptor(res) {
            console.log('Request实例响应成功的拦截器')
            return res
        },
        responseErrorInterceptor(err) {
            console.log('Request实例响应失败的拦截器')
            return err
        }
    }
})

export default request
