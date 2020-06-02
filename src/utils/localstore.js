import { isString } from './validate';

/**
 * 异步保存 store
 * @param {Stirng} key
 * @param {Any} val
 */
export const saveLocalStore = function (key, val) {
    if (!key) throw new Error('key must is String');

    // 异步存入
    setTimeout(() => {
        val = isString(val) ? val : JSON.stringify(val);
        localStorage.setItem(key, val);
    }, 0);
};

/**
 * 同步保存 store
 * @param {Stirng} key
 * @param {Any} val
 */
export const saveLocalStoreSync = function (key, val) {
    if (!key) throw new Error('key must is String');

    val = isString(val) ? val : JSON.stringify(val);
    localStorage.setItem(key, val);
};

/**
 * 异步读取 store
 * @param {Stirng} key
 * @param {Any} val
 */
export const loadLocalStore = function (key) {
    if (!key) throw new Error('key must is String');

    return new Promise((resolve, reject) => {
        let result = localStorage.getItem(key);
        if (!result) return resolve(null);

        try {
            result = JSON.parse(result);
            resolve(result);
        } catch (error) {
            resolve(null);
        }
    });
};

/**
 * 同步读取 store
 * @param {Stirng} key
 * @param {Any} val
 */
export const loadLocalStoreSync = function (key) {
    if (!key) throw new Error('key must is String');

    let result = localStorage.getItem(key);
    if (!result) return null;

    try {
        result = JSON.parse(result);
        return result;
    } catch (error) {
        return null;
    }
};

export const removeLocalStore = function (key) {
    if (!key) throw new Error('key must is String');

    localStorage.removeItem(key);
};
