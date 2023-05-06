import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { IRequestConfig, JsonpOption } from './type'
import { ElLoading } from 'element-plus'
import * as qs from "qs"

const DEFAULT_LOADING = true

class Request {
    public instance: AxiosInstance
    public showLoading: boolean
    public loadingInstance?: LoadingInstance

    constructor(config: IRequestConfig) {
        // 默认不加载loading
        this.showLoading = config.showLoading ?? DEFAULT_LOADING
        this.instance = axios.create(config)
        // 先创建实例请求拦截器
        this.instance.interceptors.request.use(
            config.interceptors?.requestSuccessInterceptor,
            config.interceptors?.requestErrorInterceptor
        )
        // 先创建实例请求拦截器
        this.instance.interceptors.response.use(
            config.interceptors?.responseSuccessInterceptor,
            config.interceptors?.responseErrorInterceptor
        )
        // 创建全局请求拦截器
        this.instance.interceptors.request.use(
            (config) => {
                if (this.showLoading) {
                    // 添加加载loading
                    this.loadingInstance = ElLoading.service({
                        text: '正在加载，请稍等...',
                        background: 'rgba(0, 0, 0, .1)',
                        lock: true
                    })
                }
                return config
            },
            (err) => {
                this.loadingInstance?.close()
                return err
            }
        )
        // 创建全局响应拦截器
        this.instance.interceptors.response.use(
            (config) => {
                this.loadingInstance?.close()
                return config
            },
            (err) => {
                this.loadingInstance?.close()
                return err
            }
        )
    }

    // 传入的泛型是约束返回值
    request<T>(config: IRequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            // 定制该请求是否加loading。当为传入该参数时，默认为true
            if (config.showLoading === false) {
                this.showLoading = false
            }
            // 创建单个请求的请求拦截器
            if (config.interceptors?.requestSuccessInterceptor) {
                // 直接调用，然后将处理后的config返回
                config = config.interceptors.requestSuccessInterceptor(config)
            }
            this.instance
                .request<any, T>(config)
                .then((res) => {
                    this.showLoading = DEFAULT_LOADING
                    // 调用传入的响应拦截器
                    if (config.interceptors?.responseSuccessInterceptor) {
                        res = config.interceptors.responseSuccessInterceptor(res)
                    }
                    resolve(res)
                })
                .catch((err) => {
                    this.showLoading = DEFAULT_LOADING
                    reject(err)
                })
        })
    }

    get<T>(config: IRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'GET' })
    }

    post<T>(config: IRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'POST' })
    }

    delete<T>(config: IRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE' })
    }

    patch<T>(config: IRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'PATCH' })
    }

    /**
     * @param {object} option {url, data, callback}
     */
    jsonp = function ({ url, data, callback, autoDeleteScript = true }: JsonpOption) {
        return new Promise((resolve) => {
            callback =
                callback || `jsonp${Date.now()}${Math.floor(Math.random() * 10000)}`;
            callback = (result: any) => {
                resolve(result);
                if (autoDeleteScript) {
                    setTimeout(() => {
                        document.head.removeChild(jsonp);
                    }, 500);
                }
            };
            let jsonp = document.createElement("script");
            let src = `${url}?callback=${callback}`;
            if (data) {
                src += `&${qs.stringify(data)}`;
            }
            jsonp.src = src;
            document.head.appendChild(jsonp);
        });
    };
}

export default Request