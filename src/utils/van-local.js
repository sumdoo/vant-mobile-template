import { Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN';

export default function (language) {
    if (language === 'en') {
        Locale.use('en-US', enUS);
    } else if (language === 'zh') {
        Locale.use('zh-CN', zhCN);
    }
}
