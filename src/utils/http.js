import axios from 'axios';
import * as Notice from './notice';

const service = axios.create({
    timeout: 60 * 1000, // 60秒超时
    headers: {
        'Cache-Control': 'no-cache' // 禁止缓存
    },
    validateStatus(status) {
        return status === 200; // 只resolve 200状态码
    }
});

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        return handleSuccessResponse(response.data);
    },
    (error) => {
        return handleErrorResponse(error);
    }
);

// 响应成功, 进行兼容处理
function handleSuccessResponse(res = {}) {
    const { ok, err, data } = res;

    if (!ok) {
        Notice.failToast(err || '内部错误，请稍后重试!');
        return Promise.reject(err);
    }

    return data;
}

// 处理其他不同状态码
const statusMap = {
    // 请求资源不存在
    404(err) {
        Notice.failToast('请求资源不存在!');
    },
    // 内部错误，请稍后重试
    500(err) {
        Notice.failToast('内部错误，请稍后重试!');
    },
    // 服务未启动
    502(err) {
        Notice.failToast('服务无响应,请稍后重试!');
    },
    // 服务器正在维护，请稍等
    503(err) {
        Notice.failToast('服务器正在维护，请稍后重试!');
    }
};

// 处理响应失败
function handleErrorResponse(error) {
    const status = error.response && error.response.status;

    if (statusMap[status]) {
        statusMap[status]();
    } else {
        const msg = error.message;
        const isTimeout = /timeout\sof\s\d+ms\sexceeded/.test(msg);
        Notice.failToast(isTimeout ? '网络出了点问题，请稍后重试!' : msg);
    }

    return Promise.reject(error);
}

/**
 * 封装请求
 * method: get, post, put, delete, upload (内部转 post)
 * @param {String} method
 */
function request(method) {
    return function (url, params, showLoading = false, config) {
        return new Promise((resolve, reject) => {
            // 显示 loading
            showLoading && Notice.showLoading();

            // 结合参数, 返回一个最终请求的配置
            const conf = handleParams({ url, method, params, config });

            // 发送请求
            service
                .request(conf)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
                .finally(() => {
                    // 关闭 loading
                    showLoading && Notice.closeLoading();
                });
        });
    };
}

// 统一处理参数，生成请求配置
function handleParams({ url, method, params = {}, config = {} }) {
    // 设置上传文件Conent-Type类型
    if (method === 'upload') {
        config.headers = {
            'Content-Type': 'multipart/form-data',
            charset: 'utf-8'
        };
    }

    method = method === 'upload' ? 'post' : method;
    params = ['get', 'delete'].includes(method) ? { params } : { data: params };

    return { url, method, ...params, ...config };
}

export const GET = request('get');
export const POST = request('post');
export const PUT = request('put');
export const DELETE = request('delete');
export const UPLOAD = request('upload');

export default {
    get: GET,
    post: POST,
    put: PUT,
    delete: DELETE,
    upload: UPLOAD
};
