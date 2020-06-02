const path = require('path');

const env = process.env;
const NODE_ENV = env.NODE_ENV;
const VUE_APP_PUBLIC_PATH = env.VUE_APP_PUBLIC_PATH;
const projectConfig = require('./project.config');
const conf = initProjectConfig(projectConfig);

module.exports = {
    /**
     * 资源访问路径
     */
    publicPath: VUE_APP_PUBLIC_PATH,
    /**
     * 开发模式
     */
    devServer: {
        open: false, // 不自动打开浏览器
        overlay: {
            warnings: false, // 提示日志不打断构建
            errors: true // 异常日志打断构建
        },
        proxy: conf.proxy
    },
    /**
     * 生产模式不产生 source map
     */
    productionSourceMap: false,
    /**
     * css-loader 配置
     */
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/styles/var.scss";`
            }
        }
    },
    /**
     * 简单 webpack 配置项
     */
    configureWebpack: {
        /**
         * 路径映射
         */
        resolve: {
            alias: {
                '@': resolve('src'),
                ...conf.alias
            }
        }
    },
    /**
     * webpack 细粒度控制
     */
    chainWebpack(config) {
        if (NODE_ENV === 'production') {
            splitChunks(config);
            useGlobalDataG(config);
            useCDN(config, conf.cdn);
            setIgnoreCopyFile(config);
            setTempName(config);
        } else {
            useMockGlobalDataG(config);
        }
    }
};

// 拼接路径
function resolve(dir) {
    return path.join(__dirname, dir);
}

// 转换初始化配置
function initProjectConfig(conf) {
    const defConf = {
        cdn: null,
        alias: {},
        proxy: {}
    };

    return { ...defConf, ...conf };
}

// 分割 chunk
function splitChunks(config) {
    config.optimization.splitChunks({
        chunks: 'all',
        minChunks: 1,
        cacheGroups: {
            libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 30,
                minChunks: 1,
                chunks: 'initial'
            },
            common: {
                name: 'chunk-commons',
                minChunks: 2,
                priority: 20
            }
        }
    });
    config.optimization.runtimeChunk(true);
}

// 使用 CDN
function useCDN(config, CDN) {
    config.externals(CDN.externals);
    config.plugin('html').tap((args) => {
        args[0].cdn = { css: CDN.css, js: CDN.js };
        return args;
    });
}

// 设置模板名称
function setTempName(config, name = 'app.html') {
    config.plugin('html').tap((args) => {
        args[0].filename = name.endsWith('.html') ? name : `${name}.html`;
        return args;
    });
}

// 设置忽略拷贝文件
function setIgnoreCopyFile(config) {
    config.plugin('copy').tap((args) => {
        args[0][0].ignore.push(...conf.ignoreCopyFiles);
        return args;
    });
}

// set data G
function useGlobalDataG(config) {
    config.plugin('html').tap((args) => {
        args[0].useGlobalDataG = true;
        return args;
    });
}

// set data G
function useMockGlobalDataG(config) {
    config.plugin('html').tap((args) => {
        args[0].useMockGlobalDataG = true;
        return args;
    });
}
