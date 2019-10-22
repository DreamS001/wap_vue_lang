// const baseUrl = process.env.BASE_API
let baseUrl = '';
if (process.env.NODE_ENV == 'development') {
    baseUrl = "/api";
    // baseUrl = "http://shipz.jie360.com.cn";
}else if(process.env.NODE_ENV == 'testEnvironment'){
    baseUrl = "http://investor.jie360.com.cn";
    // baseUrl = "http://shipz.jie360.com.cn";
    // baseUrl = "http://linf01.jie360.com.cn";
}else if(process.env.NODE_ENV == 'production'){
    baseUrl = "https://wap.fptvip.com";
}
const api = {
  state: {
    // 实时控制台
    socketApi: baseUrl + '/websocket?token=kl',
    // 图片上传
    imagesUploadApi: baseUrl + '/api/pictures',
    // 语言切换
    // imagesUploadApi: baseUrl + '/api/pictures',
    // 修改头像
    updateAvatarApi: baseUrl + '/api/users/updateAvatar',
    // 上传文件到七牛云
    qiNiuUploadApi: baseUrl + '/api/qiNiuContent',
    // Sql 监控
    sqlApi: baseUrl + '/druid',
    // swagger
    swaggerApi: baseUrl + '/swagger-ui.html'
  }
}

export default api
