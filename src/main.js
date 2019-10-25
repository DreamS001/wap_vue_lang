// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import Layout from './layout/layout'
// import router from './router'

import router from './router/routers'
import permission from './components/permission'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import locale from 'element-ui/lib/locale/lang/en' // lang i18n 默认英文
import i18n from './i18n/langs';


import Calendar from 'vue2-datepick'; //日期控件

import vueTap from 'v-tap';//点击穿透


import clipboard from 'clipboard' //复制插件

Vue.prototype.clipboard = clipboard


import 'lib-flexible' //移动端适配插件
import './assets/styles/reset.css' //引入初始化样式

import './assets/fonticons/iconfont.css' //引入自定义字体图标

import './router/index' // permission control

import axios from 'axios'
import VueAxios from 'vue-axios'

import '@/icons' // icon


Vue.use(VueAxios, axios)

Vue.use(permission)

// Vue.use(ElementUI)
// 允许携带cookie
axios.defaults.withCredentials=true

Vue.use(ElementUI, { locale })

Vue.use(MintUI)

Vue.use(Calendar);//日期控件

Vue.use(vueTap);

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// 将时间戳转日期格式的过滤器
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);

  function timeAdd0(str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
