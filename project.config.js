const BaseUrl = process.env.VUE_APP_BASE_URL || 'http://localhost';

module.exports = {
    /**
     * 默认语言
     */
    local: 'en',
    /**
     * 请求代理
     */
    proxy: {
        '^/pos/': {
            target: BaseUrl,
            changeOrigin: true
        }
    },
    /**
     * 忽略拷贝文件
     */
    ignoreCopyFiles: ['mock.js'],
    /**
     * CDN 配置
     */
    cdn: {
        externals: [],
        css: [],
        js: []
    }
    // cdn: {
    //     externals: [
    //         // cdn加载库需要指定全局变量
    //         {
    //             vue: 'Vue',
    //             vuex: 'Vuex',
    //             'vue-router': 'VueRouter',
    //             vant: 'vant',
    //         },
    //     ],
    //     css: ['https://cdn.jsdelivr.net/npm/vant@2.8/lib/index.css'],
    //     js: [
    //         'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    //         'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
    //         'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
    //         'https://cdn.jsdelivr.net/npm/vant@2.8/lib/vant.min.js',
    //     ],
    // },
};
