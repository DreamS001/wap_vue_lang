<template>
  <div class="app-wrapper">
    <div class="header-box">
        <nav-bar @transfer="showBtn" />
    </div>
    <div class="sidebar" v-show="isShowSideBar">
      <div class="logout" @click="logoutBtn">{{$t('financeCash.logout')}}</div>
      <div class="close-btn" @click="closeBtn"></div>
      <side-bar />
    </div>
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import appMain from './components/appMain.vue'
import navBar from './components/navBar.vue'
import sideBar from './components/siderbar/index.vue'
import { MessageBox } from 'mint-ui';
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { financeEarnings,financeCash } from '@/utils/i18n'// 国际化主题名字
export default {
    name: 'Layout',
    components: {
        appMain,
        navBar,
        sideBar
    },
    data(){
      return {
        isShowSideBar:false
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      language() {
          return this.$store.getters.language
      }
    },
    watch: {
      '$route':'getPath'
    },
    methods:{
      financeCash,
      getPath(){
        this.isShowSideBar=false
        // console.log(this.$route.path);
        // this.$router.go(0);
      },
      closeBtn(){
        this.isShowSideBar=false
      },
      showBtn(e){
        console.log(e)
        this.isShowSideBar=e
      },
      logoutBtn(){
        // MessageBox.confirm('确定执行此操作?').then(action => {
        //   this.logout()
        // });
        if(this.$store.getters.language=='en'){
            this.$confirm('Are you sure you want to log off and exit the system?', 'Tips', {
              confirmButtonText: 'Sure',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              this.logout()
            }).catch(err=>{
              console.log(err)
            })
        }else{
          this.$confirm('确定注销并退出系统吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.logout()
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      logout() {
        this.isShowSideBar=false
        this.$store.dispatch('LogOut').then(() => {
          this.$store.dispatch('setLanguage', 'en')
          Cookies.remove('language')
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
    }
}
</script>

<style scoped>
    .app-wrapper{
        height:100%;
        width:100%;
        padding:0;
        margin:0;
    }
    .header-box{
        height: 100px;
    }
    .sidebar{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(13, 29, 76, 0.9);
      z-index: 99;
    }
    .sidebar .close-btn{
      width: 32px;
      height: 32px;
      background: url('../assets/images/ic_home_daohang_gb.png') no-repeat;
      background-size: 100% 100%;
      position: fixed;
      top: 36px;
      right: 32px;
    }
    .main-container{
      width: 100%;
      height: 100%;
      padding: 20px 10px;
      padding-bottom: 150px;
      box-sizing: border-box;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
    }
    .logout{
      width: 140px;
      height: 40px;
      background: #0E1E4B;
      position: fixed;
      top: 36px;
      left: 32px;
      text-align: center;
      line-height: 40px;
      font-size: 24px;
      color: #2BFAFF;
      border: 1px solid #21BFFC;
    }
</style>

<style>
  .el-message-box{
    width: 400px !important;
    padding:20px 30px !important;
    background: #0E1E4B !important;
    border: 1px solid #21BFFC !important;
  }
  .el-message-box__title{
    font-size: 30px !important;
    color: #fff !important;
    margin-bottom: 20px !important;
  }
  .el-message-box__headerbtn{
    font-size: 0px !important;
    color: #fff !important;
  }
  .el-message-box__content{
    font-size: 26px !important;
    color: #fff !important;
  }
  .el-button--mini, .el-button--small{
    font-size: 26px !important;
    color: #fff !important;
    width: 140px !important;
    height: 60px !important;
    line-height: 60px !important;
    padding: 0 !important;
  }
  .el-button--small{
    border-width: 0px !important;
  }
  .el-button--small:first-of-type{
    background: #EC6941 !important;
  }
  .el-message-box__btns{
    height: 80px !important;
    margin-top: 20px !important;
    display: flex !important;
    justify-content: space-around !important;
    align-items: center !important;
  }
  .el-message-box__btns{
    text-align: center;
  }
  .el-button{
    height: 60px !important;
  }
</style>