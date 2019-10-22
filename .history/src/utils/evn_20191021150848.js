/*
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * DEBUG: debug状态
 * cancleHTTP: 取消请求头设置
 */
let baseUrl = '/api';
if (process.env.NODE_ENV == 'development') {
    baseUrl = "/api";
    // baseUrl = "http://shipz.jie360.com.cn";
}else if(process.env.NODE_ENV == 'testEnvironment'){
    baseUrl = "http://investor.jie360.com.cn";
    // baseUrl = "http://shipz.jie360.com.cn";
    // baseUrl = "http://linf01.jie360.com.cn";
}else if(process.env.NODE_ENV == 'production'){
    // baseUrl = "http://fpt.urfpt.com";
    baseUrl = "https://wap.fptvip.com";
}
export{
    baseUrl
}
