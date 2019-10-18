import request from '@/utils/request'
// 海报上传照片
export function img(data,file) {
  return request({
    url: 'api/product/upload',
    method: 'post',
    data,
    file
  })
}

