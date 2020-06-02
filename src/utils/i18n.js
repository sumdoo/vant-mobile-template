import Vue from 'vue';
import VueI18n from 'vue-i18n';
import EN from '@/language/en';
import ZH from '@/language/zh';

Vue.use(VueI18n);

const language = {
    en: EN,
    zh: ZH
};

export default new VueI18n({
    locale: 'zh',
    messages: language
});
