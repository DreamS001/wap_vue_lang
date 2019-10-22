<template>
    <div class="container-box">
        <header>
          <!-- <span></span>
          <span>登录</span> -->
        </header>
        <div class="container-main">
          <form action="">
            <div class="logo"></div>
            <div class="lang-content">
              <div class="select-lang">
                <div @click="selectLang">
                  <img class="flag-img" :src="defaultImg" alt="" >
                  <span v-if="langPopup" class="xl-img"></span>
                  <span v-else class="xl2-img"></span>
                </div>
                  <div class="lang-box" v-if="langPopup">
                      <ul>
                          <li v-for="(i,index) in langList" :key="index">
                            <img class="flag-img" :src="i.src" alt="" @click="getLang(i)" />
                          </li>
                      </ul>
                  </div>
              </div>
            </div>
            <div class="login-input"><input type="email" v-model="loginForm.username" :placeholder="$t('login.placeholder_username')"></div>
            <div class="login-input"><input type="password" v-model="loginForm.password" :placeholder="$t('login.placeholder_password')"></div>
            <div class="div-code" style=""><input class="login-code" type="text" v-model="loginForm.code" :placeholder="$t('login.VerificationCode')"><img :src="codeUrl" @click="getCode"></div>
            <!-- <div class="forget-password" style="">忘记密码</div> -->
            <div class="login-button" @click="handleLogin"><span>{{$t('login.login')}}</span></div>
            <div class="agreement"><div>{{$t('login.desc_word')}} <router-link to="">{{$t('login.xieyi')}}</router-link>  <router-link to="">{{$t('login.xyxieyi')}}</router-link></div></div>
          </form>
        </div>
    </div>
</template>
<script>
import '../utils/screen'
import { encrypt } from '@/utils/rsaEncrypt'
import Config from '@/config'
import { getCodeImg,switchLang } from '@/api/login'
import Cookies from 'js-cookie'
import { Toast } from 'mint-ui';


import { login } from '@/utils/i18n'// 国际化主题名字
export default {
  name:"Login",
  data(){
      return {
        codeUrl: '',
        cookiePass: '',
        loginForm: {
          username: '',
          password: '',
          rememberMe: false,
          code: '',
          uuid: ''
        },
        defaultImg:require('../assets/images/img_en.png'),
        langList:[{id:1,src:require('../assets/images/img_en.png'),lang:'en'},{id:1,src:require('../assets/images/img_cn.png'),lang:'zh'}],
        newLang:'en_US',
        langPopup:false,
      }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    if(Cookies.get('language')){
      // console.log('1111')
      Cookies.remove('language')
    }else{
      // console.log('2222')
    }
    this.getCode()
    this.getCookie()
  },
  methods:{
    login,
    selectLang(){
        this.langPopup=!this.langPopup;
    },
    getLang(e){
      console.log(e)
      this.$i18n.locale = e.lang
      if(e.lang=='zh'){
          this.newLang='zh_CN'
      }else{
          this.newLang='en_US'
      }
      switchLang(this.newLang).then(res=>{
          console.log(res)
          if(res.code==200){
              this.$store.dispatch('setLanguage', e.lang)
              Cookies.get('language',e.lang)
              this.$message({
                  message: 'switch language success',
                  type: 'success'
              })
              // this.$router.go(0);
          }else{
              this.$message({
                  message: res.msg,
                  type: 'success'
              })
          }
      })
      this.defaultImg=e.src;
      this.langPopup=false;
    },
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = 'data:image/gif;base64,' + res.img
        this.loginForm.uuid = res.uuid
      })
    },
    getCookie() {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: ''
      }
    },
    handleLogin() {
      var reg=/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,}$/
      console.log('1111')
      if(this.newLang=='en_US'){
        if (this.loginForm.username == "") {
          Toast({
            message: 'Please enter your account number',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        } else if(this.loginForm.password==""){
          Toast({
            message: 'Please input a password',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        }
        // else if(!reg.test(this.loginForm.password)){
        //   Toast({
        //     message: 'Password shall be at least 6 digits, and shall be alphanumeric',
        //     duration: 3000,
        //     iconClass: 'iconfont icon-jinggao'
        //   });
        // }
        else if(this.loginForm.code==''){
          Toast({
            message: 'Please enter the verification code',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        }else{
          const user = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            rememberMe: this.loginForm.rememberMe,
            code: this.loginForm.code,
            uuid: this.loginForm.uuid
          }
          if (user.password !== this.cookiePass) {
            user.password = encrypt(user.password)
          }
          this.$store.dispatch('Login', user).then(() => {
              // switchLang(this.newLang).then((res)=>{
                
              // })
              this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
              this.getCode()
          })
        }
      }else{
        if (this.loginForm.username == "") {
          Toast({
            message: '请输入账号',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        } else if(this.loginForm.password==""){
          Toast({
            message: '请输入密码',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        }
        // else if(!reg.test(this.loginForm.password)){
        //   Toast({
        //     message: '密码至少6位，且需为字母数字混合',
        //     duration: 3000,
        //     iconClass: 'iconfont icon-jinggao'
        //   });
        // }
        else if(this.loginForm.code==''){
          Toast({
            message: '请输入验证码',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        }else{
          const user = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            rememberMe: this.loginForm.rememberMe,
            code: this.loginForm.code,
            uuid: this.loginForm.uuid
          }
          if (user.password !== this.cookiePass) {
            user.password = encrypt(user.password)
          }
          this.$store.dispatch('Login', user).then(() => {
              // switchLang(this.newLang).then((res)=>{
                
              // })
              this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
              this.getCode()
          })
        }
      }
    }
  }
}
</script>

<style scoped>
  .container-box{
    margin:0px;
    padding:0px;
  }

  /* 顶部块 */
  header{
    margin-top:70px;
    width:100%;

  }
  header>span{
    height:29px;
    float:left;
    display: inline-block;
  }
  header>span:nth-of-type(1){
    margin-left:29px;
    margin-top:5px;
    width:14px;
    height:24px;
    background: url(../assets/images/ic_nav_fh.png) no-repeat;
    background-size: 100% 100%;
  }
  header>span:nth-of-type(2){
    margin-left:32px;
    font-size: 32px;

  }

  /* 登录块 */
  .container-main{
    width: 690px;
    height: 900px;
    background: url(../assets/images/bg_login_sr.png) no-repeat;
    background-size: 100% 100%;
    margin: 197px auto ;
    padding-top:101px;
    box-sizing: border-box;
  }
  form{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .logo{
    width:143px;
    height:71px;
    display: block;
    margin:0 auto;
    background: url(../assets/images/logo.png) no-repeat;
    background-size: 100% 100%;
    margin:0 auto 104px;
  }
  .logo>img{
    
  }
  .login-input{
    width:600px;
    height:80px;
    margin:0 auto 30px;
    font-size: 26px;
    color:#fff;
    background:rgba(14,30,75,0.4);
    border:1px solid rgba(33,191,252,1);
    box-shadow:0px 0px 25px 0px rgba(0,138,255,0.4);
  }
  .login-code{
    width:420px;
    height:80px;
    background:rgba(14,30,75,0.4);
    border:1px solid rgba(33,191,252,1);
    box-shadow:0px 0px 25px 0px rgba(0,138,255,0.4);
  }
  .login-button{
    width:600px;
    height:80px;
    margin:40px auto;
    background:rgba(14,30,75,1);
    border:1px solid rgba(33,191,252,1);
  }
  .login-button>span{
    width:100%;
    height:100%;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:500;
    font-size:30px;
    line-height: 100%;
    text-align: center;
    padding-top:26px;
    box-sizing: border-box;
    display: block;
    color:rgba(255,255,255,1);

  }
  .div-code{
    height:80px;
    width:600px;
    /* display:inline-block; */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  input{
    box-sizing: border-box;
    background-color: transparent;
    width:100%;
    height:80px;
    padding-left:24px;
    box-sizing: border-box;
    font-size: 26px;
    color: #fff;
    line-height: 80px;
  }
  .div-code>input{
    float:left;
    display: inline-block;
  }
  .div-code>img{
    float:left;
    /* margin-left:20px; */
    width:160px;
    height:80px;
    /* background-color: pink; */
    display:inline-block;
  }
  .agreement{
    /* width:100%; */
    width:600px;
    font-size: 24px;
    color:#fff;

  }
  .agreement>div{
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
  .agreement>div>a{
    text-decoration: none;
    font-size: 24px;
  }
  .forget-password{
    width:600px;
    height:80px;
    margin:30px auto 0;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(33,191,252,1);
    text-align:right;
    font-size:26px;
  }

.lang-content{
  position: absolute;
  right: 74px;
  top: 118px;
}
  .select-lang {
        margin-left: 50px;
        position: relative;
    }
    .select-lang>div {
        display: flex;
        align-items: center;

    }

    .select-lang .flag-img{
        width: 60px;
        height: 40px;
    }
    .select-lang .xl-img{
        display: block;
        width: 22px;
        height: 12px;
        background: url('../assets/images/ic_home_top_xl.png') no-repeat;
        background-size: 100% 100%;
        margin-left: 20px;
    }
    .select-lang .xl2-img{
      display: block;
      width: 22px;
      height: 12px;
      background: url('../assets/images/ic_home_top_xl2.png') no-repeat;
      background-size: 100% 100%;
      margin-left: 20px;
    }
    .select-lang .lang-box{
        position: absolute;
        bottom: -100px;
        left: 50%;
        transform: translateX(-50%);
        width:160px;
        height:80px;
        background:rgba(14,30,75,0.4);
        border:1px solid rgba(33,191,252,1);
        box-shadow:0px 0px 25px 0px rgba(0,138,255,0.4);
        z-index: 999;
    }
    .select-lang .lang-box ul{
        height: 100%;
        width:100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
    }
</style>
