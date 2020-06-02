import { Toast, Notify, Dialog } from 'vant';

Notify.setDefaultOptions({
    duration: 1500 // 显示时间为 1.5s
});

Toast.setDefaultOptions({
    forbidClick: true, // 禁止背景点击
    duration: 1000 // 显示时间为 1s
});

export {
    /** loading 用户数据加载,页面转场... */
    showLoading,
    closeLoading,
    /** message 用于用户操作反馈提示 */
    successToast,
    warningToast,
    failToast,
    textToast,
    /** notificaton 用于系统通知类提醒 */
    successNotify,
    warningNotify,
    dangerNotify,
    primaryNotify
};

/** mssagebox 确认框等. */
export const $showAlert = createPromise(Dialog.alert);
export const $showConfirm = createPromise(Dialog.confirm);

/**
 * 显示加载中
 * @param {Object} options 配置项
 */
let $loading = null;
function showLoading(options = {}) {
    if ($loading) return $loading;
    $loading = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        ...options
    });
}

/**
 * 清除加载中
 * @param {Object} options 配置项
 */
function closeLoading() {
    $loading && $loading.clear();
    $loading = null;
}

/**
 * 文字提示
 * @param {*} options
 */
function textToast(options) {
    Toast(handleOptions(options));
}

/**
 * 成功提示
 * @param {Object} options
 */
function successToast(options) {
    Toast.success(handleOptions(options));
}

/**
 * 友好提示
 * @param {Object} options
 */
function warningToast(options) {
    Toast.fail(handleOptions(options));
}

/**
 * 失败提示
 * @param {Object} options
 */
function failToast(options) {
    Toast.fail({ ...handleOptions(options), icon: 'cross' });
}

/**
 * 主要通知
 * @param {Object | String} options
 */
function primaryNotify(options) {
    Notify({ type: 'primary', ...handleOptions(options) });
}

/**
 * 成功通知
 * @param {Object | String} options
 */
function successNotify(options) {
    Notify({ type: 'success', ...handleOptions(options) });
}

/**
 * 警告通知
 * @param {Object | String} options
 */
function warningNotify(options) {
    Notify({ type: 'warning', ...handleOptions(options) });
}

/**
 * 危险通知
 * @param {Object | String} options
 */
function dangerNotify(options) {
    Notify({ type: 'danger', ...handleOptions(options) });
}

/**
 * 处理参数
 * @param {Object | String} options
 */
function handleOptions(options) {
    if (!options) return;
    if (typeof options === 'object' && !options.message) return;

    if (typeof options === 'string') {
        return { message: options };
    }

    return options;
}

/**
 * 创建返回 Promise 的函数
 * @param {Function} fn
 * @param {Boolean} useDefVal
 */
function createPromise(fn) {
    if (!fn && typeof fn !== 'function') {
        throw new Error('fn must set and fn is function!');
    }

    return function () {
        return new Promise((resolve, reject) => {
            try {
                const args = [...arguments];
                if (!args[0]) throw new Error('must set message!');

                const params = {
                    message: args[0],
                    title: args[1] || '提示',
                    ...(args[2] || {})
                };

                // 不允许点击遮罩层关闭
                if (params.closeOnClickModal !== true) params.closeOnClickModal = false;

                // 调用传入函数
                fn(params)
                    .then(() => resolve(true))
                    .catch(() => resolve(false));
            } catch (e) {
                throw new Error(e);
            }
        });
    };
}
