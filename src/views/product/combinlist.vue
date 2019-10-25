<template>
  <div>
    组合产品列表
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>

<style scoped>

</style>

<script>
  //pc端
  //若设备为移动设备，则跳转加载移动端样式
  if((/(android|iphone|ipad|PlayBook|BB10)/i).test(window.navigator.userAgent)){
      window.location.href = 'http://localhost:8080/mobile/index.html';
  }
</script>

<script>
  // h5端加入
  //在移动端的页面在上面对加载页面的设备进行判断，如果不为移动设备，则跳转加载pc端样式
  if(!(/(android|iphone|ipad|PlayBook|BB10)/i).test(window.navigator.userAgent)){
      window.location.href = 'http://www.ckugua.com';
  }
</script>