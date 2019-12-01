import axios from 'axios'

/**
 * 请求成功后需使用then(fun)接收返回的信息，请求失败使用catch(fun)接收错误信息
 * @param config
 * @returns {AxiosPromise}
 */
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000/api/vip',
        timeout: 5000
    });

    //请求拦截器
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        return err
    });

    //响应拦截器
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        return err
    });

    return instance(config)
}
