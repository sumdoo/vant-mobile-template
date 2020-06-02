import BigNumber from 'bignumber.js';

/**
 * 加法
 * @param {Number} a
 * @param {Number} b
 */
export const sum = (a, b) => {
    return Number(new BigNumber(a).plus(b));
};

/**
 * 减法
 * @param {Number} a
 * @param {Number} b
 */
export const minus = (a, b) => {
    return Number(new BigNumber(a).minus(b));
};

/**
 * 乘法
 * @param {Number} a
 * @param {Number} b
 */
export const multipliedBy = (a, b) => {
    return Number(new BigNumber(a).multipliedBy(b));
};

/**
 * 链式操作
 */
export const $BigNumber = (a) => {
    return new BigNumber(a);
};
