<template>
  <div class="p-box">
    <div class="search-box">
      <div class="date-box">
        <span style="width:2.3rem;">{{$t('financeCash.customQuery')}}：</span>
        <div class="date-picker">
          <div class="input-btn" @click="selectbeginDate">
            <input type="text" readonly v-model="beginDate" :placeholder="$t('financeCash.place_date')">
          </div>
          <span>-</span>
          <div class="input-btn" @click="selectendDate">
            <input type="text" readonly v-model="endDate" :placeholder="$t('financeCash.place_date')">
          </div>
        </div>
      </div>
      <div class="date-box">
        <span style="width:2.3rem;">{{$t('financeCash.serial_number')}}：</span>
        <div class="date-picker">
          <div class="" style="width:100%">
            <input style="width:100%" type="text" v-model="name">
          </div>
        </div>
      </div>
      <div class="date-box">
        <span style="width:2.3rem;">{{$t('financeCash.member_name')}}：</span>
        <div class="date-picker">
          <div class="" style="width:100%">
            <input style="width:100%" type="text" v-model="name2">
          </div>
        </div>
      </div>
      <div class="date-box">
        <span style="width:2.3rem;">{{$t('financeCash.contact_information')}}：</span>
        <div class="date-picker">
          <div class="" style="width:100%">
            <input style="width:100%" type="text" v-model="name1">
          </div>
        </div>
      </div>
      <div class="date-box">
        <span style="width:2.3rem;">{{$t('financeCash.transaction_amount1')}}：</span>
        <!-- <div class="date-picker">
          <div class="" style="width:100%">
            <input style="width:100%" type="text" v-model="pipelineNum">
          </div>
        </div> -->
        <div class="date-picker">
          <div class="input-btn">
            <input type="text"  v-model="name3start" :placeholder="$t('financeCash.input_amount')">
          </div>
          <span>-</span>
          <div class="input-btn">
            <input type="text"  v-model="name3end" :placeholder="$t('financeCash.input_amount')">
          </div>
        </div>
      </div>
      <div class="rest-btn" @click="restBtn">{{$t('financeCash.rest')}}</div>
      <div class="search-btn transfer" @click="transferBtn">{{$t('financeCash.transfer')}}</div>
      <div class="search-btn" @click="searchData">{{$t('financeCash.query')}}</div>
    </div>
    <div class="data-box">
      <div style="width:100%!important;margin-top:20px">
        <el-table :data="list" :header-row-class-name="handlemyclass"  style="width: 100%!important" :row-class-name="setClassName" :cell-style="finalCellStyle">
          <el-table-column prop="create_time" :label="$t('financeCash.transfer_time')" min-width="190" align="center"/>
          <el-table-column style="color:red" prop="merchant_order_id" :label="$t('financeCash.serial_number')" min-width="160" align="center"/>
          <el-table-column style="color:red" prop="username" :label="$t('financeCash.member_name')" min-width="170" align="center"/>
          <el-table-column style="color:red" prop="dest_email" :label="$t('financeCash.account_other_party')" min-width="150" align="center"/>
          <el-table-column style="color:red" prop="phone" :label="$t('financeCash.contact_information')" min-width="150" align="center"/>
          <el-table-column style="color:red" prop="transfer_amount" :label="$t('financeCash.transfer_amount')" min-width="230" align="center"/>
          
          <el-table-column style="color:red" prop="remark" :label="$t('financeCash.remark')" min-width="150" align="center"/>
          <!-- <el-table-column label="操作" min-width="150" align="center">
            <template slot-scope="scope">
              <div class="ck-btn" @click="reveal(scope.$index, scope.row)">查看详情</div>
            </template>
          </el-table-column> -->
        </el-table>
      </div>

      <button class="more-btn" @click="getMore">{{$t('financeCash.more')}}</button>
    </div>

    <div class="popup" v-if="FC">
      <div class="popup-content">
        <h5>{{$t('financeCash.transfer')}}</h5>
        <div class="close-icon" @click="closePopup"></div>
        <div class="popup-form">
          <div class="form-item">
            <span>{{$t('financeCash.account_other_party')}}：</span>
            <div>
              <input class="input-box" type="text" v-model="account_other_party" :placeholder="$t('financeCash.dfzh')">
            </div>
          </div>
          <div class="form-item">
            <span>{{$t('financeCash.transfer_amount1')}}：</span>
            <div>
              <input class="input-box" type="text" v-model="transfer_amount1"  oninput="value=value.replace(/[^\d]/g,'')" :placeholder="$t('financeCash.zzje')">
            </div>
          </div>
          <div class="form-item">
            <span>{{$t('financeEarnings.remarks')}}：</span>
            <div>
              <input class="input-box" type="text" v-model="remarks"  :placeholder="$t('financeEarnings.input_pl_3')">
            </div>
          </div>
          <div class="form-item">
            <span class="item-title">{{$t('financeEarnings.email')}}：</span>
            <div class="item-meddle">{{user.email}}</div>
            <button :disabled="isDisabled" class="code-btn" @click="getCode">{{buttonName}}</button>
          </div>
          <div class="form-item">
            <span>{{$t('financeEarnings.VerificationCode')}}：</span>
            <div>
              <input class="input-box" type="text" v-model="VerificationCode"  :placeholder="$t('login.VerificationCode')">
            </div>
          </div>

          <div class="form-item" style="padding:0 1rem;box-sizing: border-box;margin-top:0.8rem;">
            <button class="sure-btn" @click="cancel">{{$t('financeEarnings.cancel')}}</button>
            <button class="sure-btn" @click="next">{{$t('financeEarnings.next')}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="popup" v-if="sureBox">
      <div class="popup-content">
        <h5>{{$t('financeCash.transfer')}}</h5>
        <div class="close-icon" @click="closePopup"></div>
        <div class="popup-form">
          <div class="form-item" style="margin-top:1rem;justify-content:flex-start;">
            <span style="width:3rem;">{{$t('financeCash.account_other_party')}}：</span>
            <div>
              {{account_other_party}}
            </div>
          </div>
          <div class="form-item" style="margin-top:1rem;justify-content:flex-start;">
            <span style="width:3rem;">{{$t('financeCash.transfer_amount1')}}：</span>
            <div>
              {{transfer_amount1}}
            </div>
          </div>
          <div class="form-item" style="margin-top:1rem;justify-content:flex-start;">
            <span style="width:3rem;">{{$t('financeEarnings.remarks')}}：</span>
            <div>
              {{remarks}}
            </div>
          </div>
          <div class="form-item" style="padding:0 1rem;box-sizing: border-box;margin-top:0.8rem;">
            <button class="sure-btn" @click="prver">{{$t('financeEarnings.prver')}}</button>
            <button class="sure-btn" @click="surePresentation">{{$t('financeEarnings.sure')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../utils/screen'
import { transferlog,getEmailCode,transfersumbit } from '@/api/finance'
import { Toast } from 'mint-ui';
import { formatDate } from '../../utils/date.js'
import { financeEarnings,financeCash } from '@/utils/i18n'// 国际化主题名字

import { mapGetters } from 'vuex'
import moment from 'moment'
import Cookies from 'js-cookie'
var lang=Cookies.get('language') || 'en';
export default {
  data(){
    return {
      list: [],
      pageNo: 1,
      pageSize: 10,
      name: '',
      name1:'',
      name2:'',
      name3start:'',
      name3end:'',
      name3:'',
      pipelineNum:'',//流水号
      todayDate:'',
      beginDate: '',
      endDate: '',
      total:0,//总条数
      FC:false,
      sureBox:false,
      lielist:[],//每条数据的详情
      beginMoney:'',//开始金额
      endMoney:'',//结束金额
      member_name:'',
      contact_information:'',
      buttonName:'Get verification code',
      timer:null,
      isDisabled:false,
      time: 60,
      account_other_party:'',
      VerificationCode:'',
      remarks:'',
      transfer_amount1:''
    }
  },
  created(){
    var date = new Date()
    this.todayDate = formatDate(date, 'yyyy-MM-dd')
    this.request();
  },
  computed: {
    ...mapGetters([
      'user',
    ])
  },
  methods: {
    selectedBtn(e){
      // console.log(e.target.dataset.name)
      console.log(e)
      this.activeType=e.id;
      this.typeKey=e.key
    },
    selectedBtnStatus(e){
      this.activeStatus=e.id;
      this.typeKey=e.key
    },
    selectbeginDate(){
      this.$picker.show({
        type:'datePicker',
        date:this.todayDate,
        endTime:'2050-01-01',//截至时间
        startTime:'2018-01-01',//开始时间
        onOk:(date)=>{
          this.beginDate=date;    // 
        } 
      })
    },
    selectendDate(){
      this.$picker.show({
        type:'datePicker',
        date:this.todayDate,
        endTime:'2050-01-01',//截至时间
        startTime:'2018-01-01',//开始时间
        onOk:(date)=>{
          this.endDate=date;    // 
        } 
      })
    },
    restBtn(){
      this.beginDate='',
      this.endDate='',
      this.name= '',
      this.name1='',
      this.name2='',
      this.name3start='',
      this.name3end='',
      this.name3='',
      this.activeType=0,
      this.activeStatus=0
    },
    searchData(){
      this.pageNo=1
      if(lang=='en'){
        if(this.beginDate !='' &&this.endDate==''){
          Toast({
            message: 'Please select the end time',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
          return false
        }
        if(this.beginDate =='' &&this.endDate !=''){
          Toast({
            message: 'Please select a start time',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
          return false
        }
      }else{
        if(this.beginDate !='' &&this.endDate==''){
          Toast({
            message: '请选择结束时间',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
          return false
        }
        if(this.beginDate =='' &&this.endDate !=''){
          Toast({
            message: '请选择开始时间',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
          return false
        }
      }
      this.list=[]
      this.request();
    },
    request: function() {
      if (this.name3start=='' || this.name3end=='') {
        this.name3=''
      }else{
        this.name3=this.name3start+','+this.name3end
      }
      transferlog(this.pageNo, this.pageSize, this.beginDate, this.endDate, this.name,this.name1,this.name2,this.name3).then(
        res => {
          if(res.code==200){
            res.data.list.forEach((v,i)=>{
              res.data.list[i].create_time=moment(res.data.list[i].create_time).format("YYYY-MM-DD hh:mm:ss")
            })
            this.list = this.list.concat(eval(res.data.list))
            this.total = res.data.total
          }else{
            Toast({
              message: res.msg,
              duration: 3000,
            iconClass: 'iconfont icon-cs-sb-1'
            });
          }
        }
      )
    },
    getMore(){
      let pageTotal=Math.ceil(this.total/this.pageSize)
      this.pageNo++
      if(this.pageNo>pageTotal){
        // this.$message({
        //   message: "没有更多了",
        //   type: "none"
        // });
        if(lang=='en'){
            Toast({
              message: 'No more',
              duration: 3000,
              iconClass: 'iconfont icon-jinggao'
            });
        }else{
          Toast({
            message: '没有更多了',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        }
        return false
      }
      this.request();
    },
    //获取邮箱验证码
    getCode(){
      if(lang=='en'){
          if (this.user.email) {
          this.buttonName = 'Verification code sending'
          const _this = this
          getEmailCode(2).then(res => {
            console.log(res);
            if(res.code==200){
              Toast({
                message: 'Send successfully, validation code valid for 5 minutes',
                duration: 3000,
                iconClass: 'iconfont icon-cs-cg-1'
              });
              this.isDisabled = true
              this.buttonName = this.time-- + 'Resend in seconds'
              this.timer = window.setInterval(function() {
                _this.buttonName = _this.time + 'Resend in seconds'
                --_this.time
                if (_this.time < 0) {
                  _this.buttonName = 'Resend'
                  _this.time = 60
                  _this.isDisabled = false
                  window.clearInterval(_this.timer)
                }
              }, 1000)
            }else{
              Toast({
                message:res.msg,
                duration:3000,
                iconClass:'iconfont icon-cs-sb-1'
              })
            }
          }).catch(err => {
            this.resetForm()
            this.codeLoading = false
            console.log(err.response.data.message)
          });
        }
      }else{
        if (this.user.email) {
          this.buttonName = '验证码发送中'
          const _this = this
          getEmailCode(2).then(res => {
            console.log(res);
            if(res.code==200){
              Toast({
                message: '发送成功，验证码有效期5分钟',
                duration: 3000,
                iconClass: 'iconfont icon-cs-cg-1'
              });
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
            }else{
              Toast({
                message:res.msg,
                duration:3000,
                iconClass:'iconfont icon-cs-sb-1'
              })
            }
          }).catch(err => {
            this.resetForm()
            this.codeLoading = false
            console.log(err.response.data.message)
          });
        }
      }
    },

    //转账弹框
    transferBtn(){
      this.FC=true;
      if(lang=='en'){
        this.buttonName='Get verification code'
      }else{
        this.buttonName='获取验证码'
      }
    },

    cancel(){
      this.FC=false;
      this.account_other_party='',
      this.VerificationCode='',
      this.remarks='',
      this.transfer_amount1=''
    },
    next(){
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if(lang=='en'){
          if (this.account_other_party == "") {
            // this.$message.error("请输入验证码");
            Toast({
              message: 'Please enter the opposite account',
              duration: 3000,
            iconClass: 'iconfont icon-jinggao'
            });
        }else if (!myreg.test(this.account_other_party)) {
            // this.$message.error("请输入验证码");
            Toast({
              message: 'Incorrect mailbox format',
              duration: 3000,
            iconClass: 'iconfont icon-jinggao'
            });
        }else if (this.transfer_amount1 == "") {
          // this.$message.error("请输入金额");
          Toast({
            message: 'Please enter the transfer amount',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        }else if(this.transfer_amount1 <=0){
          // that.$message.error("输入金额必须大于零");
          Toast({
            message: 'Input amount must be greater than zero',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        } 
        // else if (this.transfer_amount1 > this.cashData.totalCash) {
        //   // this.$message.error("提现额度不能大于总额度");
        //   Toast({
        //     message: '提现额度不能大于总额度',
        //     duration: 3000,
        //     iconClass: 'iconfont icon-jinggao'
        //   });
        // } 
        else if (this.VerificationCode == "") {
          // this.$message.error("请输入地址");
          Toast({
            message: 'Please enter the verification code',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        }  else {
          this.FC=false;
          this.sureBox=true;
        }
      }else{
        if (this.account_other_party == "") {
            // this.$message.error("请输入验证码");
            Toast({
              message: '请输入对方账户',
              duration: 3000,
            iconClass: 'iconfont icon-jinggao'
            });
        }else if (!myreg.test(this.account_other_party)) {
            // this.$message.error("请输入验证码");
            Toast({
              message: '邮箱格式不正确',
              duration: 3000,
            iconClass: 'iconfont icon-jinggao'
            });
        }else if (this.transfer_amount1 == "") {
          // this.$message.error("请输入金额");
          Toast({
            message: '请输入转账金额',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        }else if(this.transfer_amount1 <=0){
          // that.$message.error("输入金额必须大于零");
          Toast({
            message: '输入金额必须大于零',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        } 
        // else if (this.transfer_amount1 > this.cashData.totalCash) {
        //   // this.$message.error("提现额度不能大于总额度");
        //   Toast({
        //     message: '提现额度不能大于总额度',
        //     duration: 3000,
        //     iconClass: 'iconfont icon-jinggao'
        //   });
        // } 
        else if (this.VerificationCode == "") {
          // this.$message.error("请输入地址");
          Toast({
            message: '请输入验证码',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        }  else {
          this.FC=false;
          this.sureBox=true;
        }
      }
    },
    prver(){
      this.FC=true;
      this.sureBox=false;
    },
    //提现确定
    surePresentation(){
      
      if(lang=='en'){
          if (this.account_other_party == "") {
            // this.$message.error("请输入验证码");
            Toast({
              message: 'Please enter the opposite account',
              duration: 3000,
            iconClass: 'iconfont icon-jinggao'
            });
        }else if (this.transfer_amount1 == "") {
          // this.$message.error("请输入金额");
          Toast({
            message: 'Please enter the transfer amount',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        }else if(this.transfer_amount1 <=0){
          // that.$message.error("输入金额必须大于零");
          Toast({
            message: 'Input amount must be greater than zero',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        } 
        // else if (this.transfer_amount1 > this.cashData.totalCash) {
        //   // this.$message.error("提现额度不能大于总额度");
        //   Toast({
        //     message: '提现额度不能大于总额度',
        //     duration: 3000,
        //     iconClass: 'iconfont icon-jinggao'
        //   });
        // } 
        else if (this.VerificationCode == "") {
          // this.$message.error("请输入地址");
          Toast({
            message: 'Please enter the verification code',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        }  else {
          var transferData={
            to:this.account_other_party,
            amount:this.transfer_amount1,
            remark:this.remarks,
            code:this.VerificationCode
          }
          transfersumbit(transferData).then(res => {
            console.log(res);
            this.presentation=false;
            if(res.code==200){
              Toast({
                message: res.msg,
                duration: 3000,
                iconClass: 'iconfont icon-cs-cg-1'
              });
              this.sureBox=false;
              this.account_other_party='',
              this.VerificationCode='',
              this.remarks='',
              this.transfer_amount1=''
              this.request();
            }else{
              Toast({
                message:res.msg,
                duration:3000,
                iconClass:'iconfont icon-cs-sb-1'
              })
            }
          });
        }
      }else{
        if (this.account_other_party == "") {
            // this.$message.error("请输入验证码");
            Toast({
              message: '请输入对方账户',
              duration: 3000,
            iconClass: 'iconfont icon-jinggao'
            });
        }else if (this.transfer_amount1 == "") {
          // this.$message.error("请输入金额");
          Toast({
            message: '请输入转账金额',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        }else if(this.transfer_amount1 <=0){
          // that.$message.error("输入金额必须大于零");
          Toast({
            message: '输入金额必须大于零',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        } 
        // else if (this.transfer_amount1 > this.cashData.totalCash) {
        //   // this.$message.error("提现额度不能大于总额度");
        //   Toast({
        //     message: '提现额度不能大于总额度',
        //     duration: 3000,
        //     iconClass: 'iconfont icon-jinggao'
        //   });
        // } 
        else if (this.VerificationCode == "") {
          // this.$message.error("请输入地址");
          Toast({
            message: '请输入验证码',
            duration: 3000,
            iconClass: 'iconfont icon-jinggao'
          });
        }  else {
          console.log(this.orderWithdraw);
          var transferData={
            to:this.account_other_party,
            amount:this.transfer_amount1,
            remark:this.remarks,
            code:this.VerificationCode
          }
          transfersumbit(transferData).then(res => {
            console.log(res);
            this.presentation=false;
            if(res.code==200){
              Toast({
                message: res.msg,
                duration: 3000,
                iconClass: 'iconfont icon-cs-cg-1'
              });
              this.sureBox=false;
              this.account_other_party='',
              this.VerificationCode='',
              this.remarks='',
              this.transfer_amount1=''
              this.request();
            }else{
              Toast({
                message:res.msg,
                duration:3000,
                iconClass:'iconfont icon-cs-sb-1'
              })
            }
          });
        }
      }
    },
    //查看详情
    // reveal($index, row) {
    //   this.FC = true
    //   cashlist(row.date,1).then(res => {
    //     this.lielist = eval(res.list)
    //   })
    // },
    //关闭弹框
    closePopup(){
      this.FC=false;
      this.sureBox=false;
      this.account_other_party='',
      this.VerificationCode='',
      this.remarks='',
      this.transfer_amount1=''
    },
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      return 'test'
    },
    setClassName({row, rowIndex}) {
      let index = rowIndex + 1;
      if(index %2 == 0){
          return 'warning-row'
      }else{
        return 'success-row'
      }
    },
    finalCellStyle: function({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 1) {
        return {
          color: '#64CB6D'
        }
      }
      if (columnIndex == 2) {
        return {
          color: '#64CB6D'
        }
      }
      if (columnIndex == 3) {
        return {
          color: '#64CB6D'
        }
      }
      if (columnIndex == 4) {
        return {
          color: '#64CB6D'
        }
      }
      if (columnIndex == 5) {
        return {
          color: '#64CB6D'
        }
      }
    },
  },
}
</script>

<style scoped>
  .p-box{
    width: 100%;
    padding-bottom: 150px;
    box-sizing: border-box;
  }
  .p-box .search-box{
    width: 100%;
    height: 390px;
    background: url('../../assets/images/bg_mingxi4.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 20px;
    box-sizing: border-box;
    font-size: 22px;
    position: relative;
  }
  .p-box .search-box .date-box{
    display: flex;
    align-items: center;
    color: #fff;
    width: 100%;
  }
   .p-box .search-box .date-box >div{
     width: 90%;
   }
  .p-box .search-box .date-box .date-picker{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    height: 50px;
    border: 2px solid rgba(47, 228, 255, 1);
  }
  .p-box .search-box .date-box .date-picker .input-btn{
    width: 180px;
    height: 50px;
  }
  .p-box .search-box .date-box .input-btn.select-btn{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
  .p-box .search-box .date-box .input-btn .selectBtn{
    width: 140px;
    height: 50px;
    /* border: 1px solid #21BFFC; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: #2BFAFF;
    /* margin-right: 30px; */
    margin: 5px 0;
  }
  .activeType{
    border: 1px solid #21BFFC;
    background: #0E1E4B;
  }
  .p-box .search-box .date-box .date-picker .input-btn{
    width: 180px;
    height: 50px;
  }
  .p-box .search-box .date-box .date-picker .input-btn input{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
  }
  .p-box .search-box .search-btn{
    /* width: 140px; */
    height: 40px;
    border: 1px solid rgba(33, 191, 252, 1);
    background: rgba(14, 30, 75, 1);
    text-align: center;
    line-height: 40px;
    color: rgba(43, 250, 255, 1);
    padding: 0 10px;
    box-sizing: border-box;
    position: absolute;
    right: 20px;
    bottom: 25px;
  }
  .p-box .search-box .transfer{
    
    position: absolute;
    right: 20px;
    bottom: 100px;
  }
  .rest-btn{
    /* width: 140px; */
    height: 40px;
    border: 1px solid rgba(33, 191, 252, 1);
    background: rgba(14, 30, 75, 1);
    text-align: center;
    line-height: 40px;
    color: rgba(43, 250, 255, 1);
    padding: 0 10px;
    box-sizing: border-box;
    position: absolute;
    right: 20px;
    top: 25px;
  }
  .more-btn,.ck-btn{
    width: 140px;
    height: 40px;
    border: 1px solid rgba(33, 191, 252, 1);
    text-align: center;
    line-height: 40px;
    color: rgba(43, 250, 255, 1);
    font-size: 22px;
    margin: 30px 0 0 20px;
    background: rgba(14, 30, 75, 1);
  }
  .ck-btn{
    margin: 0 auto;
  }
  .popup{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(13, 29, 76, 0.9);
    z-index: 100;
    padding: 120px 10px 0;
    box-sizing: border-box;
    color: #fff;
  }
  .popup .popup-content{
    width: 100%;
    height: 744px;
    background: url('../../assets/images/bg_qianbao_tx_zz.png') no-repeat;
    background-size: 100% 100%;
    padding: 30px 35px 30px 30px;
    box-sizing: border-box;
    position: relative;
  }
  .popup .popup-content h5{
    font-size: 28px;
    color: #fff;
    padding-left: 0;
  }
  .popup .popup-content .close-icon{
    width: 21px;
    height: 21px;
    background: url('../../assets/images/ic_tc_gb.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 29px;
    right: 29px;
  }
  .popup .popup-content .popup-form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .popup .popup-content .popup-form .form-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26px;
    height: 70px;
    margin-top: 20px;
  }
  .popup .popup-content .popup-form .form-item .item-title{
    display: inline-block;
    width: 120px;
  }
  /* .popup .popup-content .popup-form .form-item .item-meddle{

  } */
  .popup .popup-content .popup-form .form-item .code-btn{
    /* width: 190px; */
    height: 68px;
    border: 1px solid rgba(33, 191, 252, 1);
    text-align: center;
    line-height: 68px;
    color: rgba(43, 250, 255, 1);
  }
  .popup .popup-content .popup-form .form-item .input-box{
    width: 520px;
    height: 68px;
    border: 1px solid rgba(33, 191, 252, 1);
    padding: 24px 30px;
    box-sizing: border-box;
    font-size: 22px;
    
  }
  .popup .popup-content .popup-form .form-item .input-box::-webkit-input-placeholder{
    color: #fff;
    font-size: 22px;
  }
  .popup .popup-content .sure-btn{
    width: 190px;
    height: 70px;
    background: rgba(14, 30, 75, 1);
    border: 1px solid rgba(33, 191, 252, 1);
    text-align: center;
    line-height: 70px;
    color: rgba(43, 250, 255, 1);
    font-size: 26px;
    margin-top: 20px;
  }
</style>

<style>
  .el-table .warning-row{
      background:rgba(24, 136, 203, 0.4)!important;
      /* background:red !important; */
  }
  .el-table .success-row{
      background:rgba(24, 136, 203, 0.2)!important;
  }
  input{
    background: transparent;
    padding-left: 10px;
    color: #fff !important;
  }
  input::-webkit-input-placeholder{
    color: #fff !important;
  }
  .el-table{
    background-color: transparent !important;
  }
  .el-table th, .el-table tr {
      background: rgba(24, 136, 203, 0.3) !important;
      color: #fff !important;
      font-weight: 400 !important;
  }
  .el-table th.is-leaf, .el-table td{
    border-bottom: 1px solid transparent;
  }

  .el-pagination span:not([class*=suffix]), .el-pagination button{
    color: #fff;
  }
  .el-pagination .el-select .el-input .el-input__inner,.el-pagination button:disabled,.el-pager li,.el-pagination .btn-prev, .el-pagination .btn-next,.el-pagination__editor.el-input .el-input__inner{
    background: transparent !important;
    color: #fff !important;
  }
  .el-pagination .el-select .el-input .el-input__inner,.el-pagination__editor.el-input .el-input__inner{
    border-color: rgba(47, 228, 255, 0.2) !important;
  }
  .el-pager li.active{
    color: rgba(47, 228, 255, 1) !important;
  }
  .el-table th>.cell{
    font-size: 24px !important;
    line-height: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-table th, .el-table tr{
    height: 80px !important;
  }
  .el-table td, .el-table th{
    padding: 0 !important;
  }
  .el-table .cell{
    height: 80px !important;
    font-size: 24px !important;
    /* line-height: 80px !important; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-table .cell .el-tag{
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgba(14, 30, 75, 1);
    border: 1px solid rgba(33, 191, 252, 1);
  }
  .el-table th>.cell, .el-table th div{
    display: flex;
}
.el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid transparent !important;
}
</style>