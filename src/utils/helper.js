import Vue from 'vue';
import * as validate from './validate';
import * as notice from './notice';

for (let k in notice) {
    if (!Vue.prototype[k]) {
        Vue.prototype[k] = notice[k];
    } else {
        console.error(`${k} 已经存在!`);
    }
}

Vue.prototype.helper = {
    ...validate // 字段校验函数
};
