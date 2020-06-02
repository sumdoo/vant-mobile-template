import Vue from 'vue';

// 自动化加载全局组件
import '@/components/Base/_init';

import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './utils/i18n';

import 'vant/lib/index.css';
import './styles/index.scss';

import 'amfe-flexible';
import '@/utils/helper';

Vue.config.productionTip = false;

new Vue({
    i18n,
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
