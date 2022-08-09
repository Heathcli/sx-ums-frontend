import { message } from 'antd'
import lodash from 'lodash'
import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:3333/' })

const success = (res, resolve, reject) => {
    if (res.data.code === 0) {
        resolve(res.data.data);
    } else if (lodash.get(res, 'data.msg')) {
        reject(res.data.msg);
        message.error(res.data.msg);
    } else {
        reject('系统异常');
        message.error('系统异常');
    }
}

const failure = (err, reject) => {
    message.error('请求异常');
    reject(err);
}

export default {
    get: (url, params = {}, config = {}) => {
        let data = Object.assign({}, params)
        return new Promise((resolve, reject) => {
            instance
                .post(url, data, config)
                .then(res => success(res, resolve, reject))
                .catch(err => failure(err, reject));
        });
    },
    post: (url, params = {}, config = {}) => {
        return new Promise((resolve, reject) => {
            instance
                .post(url, params, config)
                .then(res => success(res, resolve, reject))
                .catch(err => failure(err, reject));
        });
    }
}