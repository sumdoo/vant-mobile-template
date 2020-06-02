<template>
    <div class="home">
        <p class="tc mt50">{{ $t('welcome') }}</p>
        <div class="flex-xc mt20">
            <van-button class="mr10" @click="_showLoading">{{ $t('showLoading') }}</van-button>
            <van-button @click="_showToast">{{ $t('toastText') }}</van-button>
        </div>
        <div class="flex-xc mt20">
            <van-button @click="_swtichLanguage">{{ $t('swtichLanguage') }}</van-button>
        </div>
    </div>
</template>

<script>
import { Button } from 'vant';
export default {
    name: 'Home',
    components: { VanButton: Button },
    methods: {
        _showLoading() {
            this.showLoading();
            setTimeout(() => {
                this.closeLoading();
            }, 2000);
        },
        _showToast() {
            this.textToast('I am toast text!');
        },
        _swtichLanguage() {
            const lang = this.$i18n.locale === 'zh' ? 'en' : 'zh';
            this.$i18n.locale = lang;
        }
    }
};
</script>
