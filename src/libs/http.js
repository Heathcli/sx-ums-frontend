import { message } from 'antd'
import lodash from 'lodash'
import qs from 'qs'
import axios from 'axios'

const instance = axios.create({baseURL:'http://jinshiweian.com'})

const success = (res, resolve, reject) => {
    if (res.data.code === 0) {
        resolve(res.data.data);
    } else if (lodash.get(res, 'data.msg')) {
        reject(res.data.msg);
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
        let data = Object.assign({},params)
        return new Promise((resolve, reject) => {
            instance
                .post(url, data, config)
                .then(res => success(res, resolve, reject))
                .catch(err => failure(err, reject));
        });
    },
    post: (url, params = {}, config = {}) => {
        console.log(url, params, config);
        // const values = params.trim();
        // let data = {};
        // for (let attr in values) {
        //   data[`param.${attr}`] = values[attr];
        // }
        // data = qs.stringify(data);
        return new Promise((resolve, reject) => {
            instance
                .post(url, params, config)
                .then(res => success(res, resolve, reject))
                .catch(err => failure(err, reject));
        });
    }
}