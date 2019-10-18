<template>
  <div class="user-center">
    <div class="user-box">
      <div class="item">
        <div class="user-img">
          <el-upload
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
            :headers="headers"
            :action="updateAvatarApi"
            class="avatar-uploader">
            <img v-if="user.avatar" :src="user.avatar" title="点击上传头像" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </div>
      </div>
      <div class="item">
        <div class="p-item item-left">用户名称</div>
        <div class="p-item item-right">{{ user.username }}</div>
      </div>
      <div class="item">
        <div class="p-item item-left">手机号码</div>
        <div class="p-item item-right">{{ user.phone }}</div>
      </div>
      <div class="item">
        <div class="p-item item-left">用户邮箱</div>
        <div class="p-item item-right">{{ user.email }}</div>
      </div>
      <div class="item">
        <div class="p-item item-left">所属部门</div>
        <div class="p-item item-right">{{ user.dept }} / {{ user.job }}</div>
      </div>
      <div class="item">
        <div class="p-item item-left">创建日期</div>
        <div class="p-item item-right">{{ parseTime(user.createTime) }}</div>
      </div>
      <div class="item">
        <div class="p-item item-left">安全设置</div>
        <div class="p-item item-right" style="color:rgba(43, 250, 255, 1)">
          <span @click="modifyPassword">修改密码</span>
          <span @click="modifyEmail">修改邮箱</span>
        </div>
      </div>
    </div>

    <!-- 修改密码 -->
    <div class="modifyPopup" v-if="recharge">
      <div class="modify-content">
        <h5>修改密码</h5>
        <div class="close-icon" @click="closePopup"></div>
        <div class="popup-form">
          <div class="form-item">
            <span>旧密码：</span>
            <div>
              <input class="input-box" type="password" v-model="form.oldPass" placeholder="请输入旧密码">
            </div>
          </div>
          <div class="form-item">
            <span>新密码：</span>
            <div>
              <input class="input-box" type="password" v-model="form.newPass" placeholder="请输入新密码">
            </div>
          </div>
          <div class="form-item">
            <span>确认密码：</span>
            <div>
              <input class="input-box" type="password" v-model="form.confirmPass" placeholder="请再次输入新密码">
            </div>
          </div>
        </div>
        <div class="btn-group">
          <button class="sure-btn" @click="closePopup">取消</button>
          <button class="sure-btn" @click="sureBtn">确认</button>
        </div>
      </div>
    </div>
    <!-- 修改邮箱 -->
    <div class="modifyPopup" v-if="emailPopup">
      <div class="modify-content">
        <h5>修改邮箱</h5>
        <div class="close-icon" @click="cancelPopup"></div>
        <div class="popup-form">
          <div class="form-item">
            <div class="modify-email">
              <input class="input-box" type="email" v-model="formEmail.email" placeholder="请输入新的邮箱">
            </div>
          </div>
          <div class="form-item">
            <div class="modify-email">
              <input class="input-box" style="width:65%;" type="text" v-model="formEmail.code" placeholder="请输入验证码">
              <button class="code-btn" :disabled="isDisabled" @click="sendCode">{{ buttonName }}</button>
            </div>
          </div>
          <div class="form-item">
            <div class="modify-email">
              <input class="input-box" type="password" v-model="formEmail.pass" placeholder="请输入密码">
            </div>
          </div>
        </div>
        <div class="btn-group">
          <button class="sure-btn" @click="cancelPopup">取消</button>
          <button class="sure-btn" @click="sureBtnEmail">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../utils/screen'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { parseTime } from '@/utils/index'
import initData from '@/mixins/initData'
import { updatePass,updateEmail } from '@/api/user'
import { validatEmail } from '@/utils/validate'
import { resetEmail } from '@/api/code'
export default {
  data(){
    return {
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      imageUrl:'',
      recharge:false,
      emailPopup:false,
      form: { oldPass: '', newPass: '', confirmPass: '' },
      formEmail: { pass: '', email: '', code: '' },
      buttonName: '获取验证码', 
      isDisabled: false, 
      time: 60,
      email:'',
      codeData: { type: 'email', value: '' },
      emailData: { email: '', password: '' },
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'updateAvatarApi'
    ])
  },
  created() {
    store.dispatch('GetInfo').then(() => {})
       console.log(this.user.avatar);
       this.email=this.user.email
  },
  methods: {
    parseTime,
    handleSuccess(response, file, fileList) {
      this.$notify({
        title: '头像修改成功',
        type: 'success',
        duration: 2500
      })
      store.dispatch('GetInfo').then(() => {})
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
    },
    modifyPassword(){
      
      this.recharge=true;
    },
    modifyEmail(){
      this.emailPopup=true;
    },
    //确认修改密码
    sureBtn(){
      var reg=/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,}$/
      if(this.form.oldPass==''){
        this.$notify({
          title: '请输入旧密码',
          type: 'error',
          duration: 2500
        })
      }else if(this.form.newPass==''){
        this.$notify({
          title: '请输入新密码',
          type: 'error',
          duration: 2500
        })
      }else if(!reg.test(this.form.newPass)){
        this.$notify({
          title: '密码至少6位，且需为字母数字混合',
          type: 'error',
          duration: 2500
        })
      }else if(this.form.confirmPass==''){
        this.$notify({
          title: '请再次输入新密码',
          type: 'error',
          duration: 2500
        })
      }else if(this.form.newPass!==this.form.confirmPass){
        this.$notify({
          title: '两次输入密码不一致',
          type: 'error',
          duration: 2500
        })
      }else{
        updatePass(this.form).then(res => {
          this.$notify({
            title: '密码修改成功，请重新登录',
            type: 'success',
            duration: 1500
          })
          this.recharge=false;
          setTimeout(() => {
            store.dispatch('LogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }, 1500)
        }).catch(err => {
          console.log(err.response.data.message)
        })
      }
    },
    sendCode() {
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if(!myreg.test(this.formEmail.email)){
        this.$notify({
          title: '邮箱格式不正确',
          type: 'error',
          duration: 2500
        })
      }else if (this.formEmail.email && this.formEmail.email !== this.email) {
        this.buttonName = '验证码发送中'
        this.codeData.value = this.formEmail.email
        const _this = this
        resetEmail(this.codeData).then(res => {
          this.$message({
            showClose: true,
            message: '发送成功，验证码有效期5分钟',
            type: 'success'
          })
          this.isDisabled = true
          this.buttonName = this.time-- + '秒后重新发送'
          this.timer = window.setInterval(function() {
            _this.buttonName = _this.time + '秒后重新发送'
            --_this.time
            if (_this.time < 0) {
              _this.buttonName = '重新发送'
              _this.time = 60
              _this.isDisabled = false
              window.clearInterval(_this.timer)
            }
          }, 1000)
        }).catch(err => {
          console.log(err.response.data.message)
        })
      }else{
        this.$notify({
          title: '请输入新邮箱',
          type: 'error',
          duration: 2500
        })
      }
    },
    sureBtnEmail(){
      
      if(this.formEmail.email==''){
        this.$notify({
          title: '请输入邮箱',
          type: 'error',
          duration: 2500
        })
      }else if(this.formEmail.code===this.email){
        this.$notify({
          title: '新邮箱不能与旧邮箱相同',
          type: 'error',
          duration: 2500
        })
      }else if(this.formEmail.code==''){
        this.$notify({
          title: '请输入验证码',
          type: 'error',
          duration: 2500
        })
      }else if(this.formEmail.pass==''){
        this.$notify({
          title: '请输入密码',
          type: 'error',
          duration: 2500
        })
      }else{
        this.emailData = { email: this.formEmail.email, password: this.formEmail.pass }
        console.log(this.emailData)
        updateEmail(this.formEmail.code, this.emailData).then(res => {
          this.$notify({
            title: '邮箱修改成功',
            type: 'success',
            duration: 1500
          })
          this.formEmail={
            email:'',
            pass:'',
            code:'',
          }
          this.emailPopup=false;
          store.dispatch('GetInfo').then(() => {})
        }).catch(err => {
          console.log(err.response.data.message)
        })
      }
    },

    //关闭弹框 17601381749@163.com
    closePopup(){
      this.recharge=false;
      this.form.oldPass=''
      this.form.newPass=''
      this.form.confirmPass=''
    },
    cancelPopup(){
      this.emailPopup=false
      this.formEmail.pass='',
      this.formEmail.email='',
      this.formEmail.code=''
    }
  },
}
</script>

<style scoped>
  .user-center{
    width: 100%;
    padding-bottom: 150px;
    box-sizing: border-box;
  }
  /* .user-center .user-box{

  } */
  .user-center .user-box .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    color: #fff;
    padding: 26px 30px;
    box-sizing: border-box;
    background:rgba(14,30,75,0.4);
    border:1px solid rgba(0,190,255,1);
    box-shadow:0px 0px 25px 0px rgba(0,138,255,0.4);
    margin-bottom: 20px;
  }
  .user-center .user-box .item:first-of-type{
    justify-content: center;
    padding: 50px 0 40px 0;
    box-sizing: border-box;
    background: transparent;
    border: 1px solid transparent;
  }
  .user-center .user-box .item .user-img{
    width: 200px;
    height: 200px;
    background: url('../../../assets/images/bg_us_admin.png') no-repeat;
    background-size: 100% 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  .avatar-uploader{
    width: 100%;
    height: 100%;
  }
  .user-center .user-box .item .item-left{
    font-size: 28px;
  }

  .modifyPopup{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(13, 29, 76, 0.8);
    padding: 250px 10px 0;
    box-sizing: border-box;
  }
  .modifyPopup .modify-content{
    width: 100%;
    height: 650px;
    background: url('../../../assets/images/bg_qianbao_tx_tc.png') no-repeat;
    background-size: 100% 100%;
    padding: 30px 35px 30px 30px;
    box-sizing: border-box;
    position: relative;
  }
  .modifyPopup .modify-content h5{
    font-size: 28px;
    color: #fff;
    padding-left: 0;
  }
  .modifyPopup .modify-content .close-icon{
    width: 21px;
    height: 21px;
    background: url('../../../assets/images/ic_tc_gb.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 29px;
    right: 29px;
  }
  .modifyPopup .modify-content .popup-form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .modifyPopup .modify-content .popup-form .form-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26px;
    height: 70px;
    margin-top: 50px;
  }
  .modifyPopup .modify-content .popup-form .form-item .item-title{
    display: inline-block;
    width: 120px;
  }
  .modifyPopup .modify-content .popup-form .form-item span{
    color: #fff;
  }
  .modifyPopup .modify-content .popup-form .form-item .input-box{
    width: 520px;
    height: 68px;
    border: 1px solid rgba(33, 191, 252, 1);
    padding: 24px 30px;
    box-sizing: border-box;
    font-size: 22px;
    
  }
  .modifyPopup .modify-content .popup-form .form-item .modify-email{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .modifyPopup .modify-content .popup-form .form-item .modify-email .input-box{
    width: 100%;
  }
  .modifyPopup .modify-content .popup-form .form-item .modify-email .code-btn{
    width: 190px;
    height: 68px;
    border: 1px solid rgba(33, 191, 252, 1);
    text-align: center;
    line-height: 68px;
    color: rgba(43, 250, 255, 1);
  }
  .modifyPopup .modify-content .popup-form .form-item .input-box::-webkit-input-placeholder{
    color: #fff;
    font-size: 22px;
  }
  .modifyPopup .modify-content .popup-form .recharge-box{
    width: 100%;
    height: 430px;
    overflow-y: scroll;
  }
  .modifyPopup .modify-content .popup-form .recharge-box .recharge-item{
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26px;
    padding: 0 30px;
    box-sizing: border-box;
  }
  .modifyPopup .modify-content .popup-form .recharge-box .recharge-item span:last-of-type{
    font-size: 22px;
  }
  .modifyPopup .modify-content .btn-group{
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
  }
  .modifyPopup .modify-content .btn-group .sure-btn{
    width: 190px;
    height: 70px;
    background: rgba(14, 30, 75, 1);
    border: 1px solid rgba(33, 191, 252, 1);
    text-align: center;
    line-height: 70px;
    color: rgba(43, 250, 255, 1);
    font-size: 26px;
  }
  .classred {
    background: #4986ff;
    background: rgba(0, 128, 202, 0.4);
    border: 1px solid rgba(0, 190, 255, 0.6);
    color: #fff;
  }
</style>

<style>
  .avatar-uploader .el-upload{
    width: 100%;
    height: 100%;
  }
  .avatar-uploader .el-upload img{
    width: 100%;
    height: 100%;
  }
</style>