/*
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * DEBUG: debug状态
 * cancleHTTP: 取消请求头设置
 */
let baseUrlLang = '/api';
if (process.env.NODE_ENV == 'development') {
    baseUrlLang = "/api";
    // baseUrl = "http://shipz.jie360.com.cn";
}else if(process.env.NODE_ENV == 'testEnvironment'){
    baseUrlLang = "http://investor.jie360.com.cn";
    // baseUrl = "http://shipz.jie360.com.cn";
    // baseUrl = "http://linf01.jie360.com.cn";
}else if(process.env.NODE_ENV == 'production'){
    // baseUrl = "http://fpt.urfpt.com";
    baseUrlLang = "https://wap.fptvip.com";
}
export{
    baseUrlLang
}
