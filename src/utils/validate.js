/**
 * 检查是否为空对象
 * @param {Object} o
 */
export function isEmptyObj(o) {
    return Object.keys(o).length === 0;
}

/**
 * 检查是否为布尔值
 * @param {Boolean} val
 */
export function isBoolean(val) {
    return val !== undefined && typeof val === 'boolean';
}

/**
 * 检查是否为数字类型
 * @param {Number} val
 * @param {Boolean} safe
 */
export function isNumber(val, safe = true) {
    // 安全模式为true 则不转换
    if (!safe) val = Number(val);
    return !isNaN(val) && typeof val === 'number';
}

/**
 * 检查是否为字符串
 * @param {String} val
 */
export function isString(val) {
    return val !== '' && typeof val === 'string';
}

/**
 * 检查是否为对象
 * @param {Object} o
 */
export function isObject(o) {
    return o !== null && typeof o === 'object';
}

/**
 * 检查是否数组
 * @param {Array} arr
 */
export function isArray(arr) {
    return Array.isArray(arr);
}

/**
 * 检查是否为 Promise 对象
 * @param {Promise} val
 */
export function isPromise(val) {
    return val && typeof val.then === 'function';
}

/**
 * 检查是否为 Function
 * @param {Function} val
 */
export function isFunction(val) {
    return val && typeof val === 'function';
}
