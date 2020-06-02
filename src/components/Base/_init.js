import Vue from 'vue';

// 自动加载模块数据
// 参考基础组件的自动化加载： https://cn.vuejs.org/v2/guide/components-registration.html
const modulesFiles = require.context('./', true, /\.vue$/);

modulesFiles.keys().forEach((modulePath) => {
    const com = modulesFiles(modulePath);

    if (!com.default.name) return;

    Vue.component(com.default.name, com.default);
});
