<template>
  <div class="earnings-content">
    <h5>{{$t('financeEarnings.title_1')}}</h5>
    <div class="earnings-item">
      <div class="item-top">
        <div class="top-left">
          <span>{{$t('financeEarnings.title_1')}}</span>
          <img src="../../assets/images/img_jianbian.png" alt="">
        </div>
        <div @click="hrefone" class="top-right">{{$t('financeEarnings.detailed')}}</div>
      </div>
      <div class="item-middel">
        <div class="item-m-p">
          <span>{{$t('financeEarnings.dq_balance')}}</span>
          <div class="item-m-box">
            <div class="item-m-l">
              <div class="middel-l" :style="{ width: cashData.totalCash/1000 + 'px' }" style="background:rgba(255, 171, 79, 1)"></div>
            </div>
            <span><span>$</span>{{cashData.totalCash}}</span>
          </div>
        </div>
      </div>
      <div class="item-bottom">
        <button class="earnings-btn" @click="goPresentation">{{$t('financeEarnings.withdrawal')}}</button>
        <button class="earnings-btn" @click="goRecharge">{{$t('financeEarnings.recharge')}}</button>
      </div>
    </div>
    <div class="earnings-item">
      <div class="item-top">
        <div class="top-left">
          <span>{{$t('financeEarnings.title_2')}}</span>
          <img src="../../assets/images/img_jianbian.png" alt="">
        </div>
        <div @click="hrefthree" class="top-right">{{$t('financeEarnings.detailed')}}</div>
      </div>
      <div class="item-middel">
        <div class="item-m-p">
          <span>{{$t('financeEarnings.lj_income')}}</span>
          <div class="item-m-box">
            <div class="item-m-l">
              <div class="middel-l" :style="{ width: cashData.actCash/1000 + 'px' }" style="background:rgba(255, 171, 79, 1)"></div>
            </div>
            <span><span>$</span>{{cashData.actCash}}</span>
          </div>
        </div>
        <div class="item-m-p">
          <span>{{$t('financeEarnings.jr_earnings')}}</span>
          <div class="item-m-box">
            <div class="item-m-l">
              <div class="middel-l" :style="{ width: cashData.actCashDay/1000 + 'px' }" style="background:rgba(255, 171, 79, 1)"></div>
            </div>
            <span><span>$</span>{{cashData.actCashDay}}</span>
          </div>
        </div>
      </div>
      <div class="item-bottom">
        <!-- <button class="earnings-btn">一键复投</button> -->
      </div>
    </div>
    <div class="earnings-item">
      <div class="item-top">
        <div class="top-left">
          <span>{{$t('financeEarnings.title_3')}}</span>
          <img src="../../assets/images/img_jianbian.png" alt="">
        </div>
        <div @click="hreftwo" class="top-right">{{$t('financeEarnings.detailed')}}</div>
      </div>
      <div class="item-middel">
        <div class="item-m-p">
          <span>{{$t('financeEarnings.lj_income')}}</span>
          <div class="item-m-box">
            <div class="item-m-l">
              <div class="middel-l" :style="{ width: cashData.staCash/1000 + 'px' }" style="background:rgba(255, 171, 79, 1)"></div>
            </div>
            <span><span>$</span>{{cashData.staCash}}</span>
          </div>
        </div>
        <div class="item-m-p">
          <span>{{$t('financeEarnings.jr_earnings')}}</span>
          <div class="item-m-box">
            <div class="item-m-l">
              <div class="middel-l" :style="{ width: cashData.staCashDay/1000 + 'px' }" style="background:rgba(255, 171, 79, 1)"></div>
            </div>
            <span><span>$</span>{{cashData.staCashDay}}</span>
          </div>
        </div>
      </div>
      <div class="item-bottom">
        <!-- <button class="earnings-btn">一键复投</button> -->
      </div>
    </div>
    <div class="earnings-item">
      <div class="item-top">
        <div class="top-left">
          <span>{{$t('financeEarnings.title_4')}}</span>
          <img src="../../assets/images/img_jianbian.png" alt="">
        </div>
        <div @click="hreffour" class="top-right">{{$t('financeEarnings.detailed')}}</div>
      </div>
      <div class="item-middel">
        <div class="item-m-p">
          <span>{{$t('financeEarnings.lj_integral')}}</span>
          <div class="item-m-box">
            <div class="item-m-l">
              <div class="middel-l" :style="{ width: cashData.creditPoint/1000 + 'px' }" style="background:rgba(255, 171, 79, 1)"></div>
            </div>
            <span><span>$</span>{{cashData.creditPoint}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗 提现 -->
    <div class="popup" v-if="presentation">
      <div class="popup-content">
        <h5>{{$t('financeEarnings.withdrawal')}}</h5>
        <div class="close-icon" @click="closePopup"></div>
        <div class="popup-form">
          <div class="form-item">
            <span class="item-title">{{$t('financeEarnings.email')}}：</span>
            <div class="item-meddle">{{user.email}}</div>
            <button :disabled="isDisabled" class="code-btn" @click="getCode">{{buttonName}}</button>
          </div>
          <div class="form-item">
            <span>{{$t('financeEarnings.VerificationCode')}}：</span>
            <div>
              <input class="input-box" type="text" v-model="orderWithdraw.code" placeholder="请输入验证码">
            </div>
          </div>
          <div class="form-item">
            <span>{{$t('financeEarnings.cash_amount')}}：</span>
            <div>
              <input class="input-box" type="text" v-model="orderWithdraw.amount" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入金额（提现额度不能大于总额）">
            </div>
          </div>
          <div class="form-item">
            <span>{{$t('financeEarnings.cash_adress')}}：</span>
            <div>
              <input class="input-box" type="text" v-model="orderWithdraw.tokenId" placeholder="请输入提现地址">
            </div>
          </div>
          <div class="form-item">
            <span>{{$t('financeEarnings.remarks')}}：</span>
            <div>
              <input class="input-box" type="text" v-model="orderWithdraw.remark" placeholder="请输入备注内容">
            </div>
          </div>

          <button class="sure-btn" @click="surePresentation">{{$t('financeEarnings.sure')}}</button>
        </div>
      </div>
    </div>
    <!-- 弹窗 充值 -->
    <div class="popup" v-if="recharge">
      <div class="popup-content">
        <h5>{{$t('financeEarnings.recharge')}}</h5>
        <div class="close-icon" @click="closePopup"></div>
        <div class="popup-form">
          <div class="recharge-box">
            <div class="recharge-item" @click="selectItem(i.id)" v-for="(i,index) in cashlists" v-bind:key="index" :class="{ classred:index==current}">
              <span>{{i.name}}</span>
              <span>{{i.token}}</span>
            </div>
          </div>

          <button class="sure-btn" @click="sureBtn">{{$t('financeEarnings.sure')}}</button>
        </div>
      </div>
    </div>
    <!-- 弹窗 充值 输入 -->
    <div class="popup" v-if="recharge2">
      <div class="popup-content">
        <h5>{{$t('financeEarnings.recharge')}}</h5>
        <div class="close-icon" @click="closePopup"></div>
        <div class="popup-form">
          <div class="form-item">
            <span>{{$t('financeEarnings.recharge_amount')}}：</span>
            <div>
              <input class="input-box" type="text" oninput="value=value.replace(/[^\d]/g,'')" v-model="orderToup.amount" placeholder="请输入金额">
            </div>
          </div>
          <div class="form-item">
            <span>{{$t('financeEarnings.jy_number')}}：</span>
            <div>
              <input class="input-box" type="text" v-model="orderToup.tokenId" placeholder="请输入交易单号">
            </div>
          </div>
          <div class="form-item">
            <span>{{$t('financeEarnings.cash_adress')}}：</span>
            <div>
              {{orderToup.thirdId}}
            </div>
          </div>

          <button class="sure-btn" @click="sureBtn1">{{$t('financeEarnings.sure')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../utils/screen'
import {finan,finana,pages,cashlist,withdraw,topup,toup,getEmailCode} from "@/api/finance";
import { Toast } from 'mint-ui';
import { mapGetters } from 'vuex'

import { financeEarnings } from '@/utils/i18n'// 国际化主题名字
export default {
  data(){
    return {
      cashData:{
        totalCash:0,//当前余额
        actCash:0,//累计收益
        actCashDay:0,//当天收益
        staCash:0,//累计收益
        staCashDay:0,//当天收益
        creditPoint:0,//累计积分收益
      },
      presentation:false,//提现
      recharge:false,//充值
      recharge2:false,//充值输入
      cashlists:[],//钱包列表
      current:1000,
      topup_a: {},
      orderToup: {
        amount: "", //充值金额
        tokenId: "", //订单号
        thirdId: ""
      },
      orderWithdraw: {//提现数据
        amount: "",
        tokenId: "",
        remark: "",
        code:'',
      },
      buttonName:'获取验证码',
      timer:null,
      isDisabled:false,
      time: 60,
    }
  },
  computed: {
    ...mapGetters([
      'user',
    ])
  },
  created(){
    this.getEarningsData();
  },
  methods: {
    financeEarnings,
    getEarningsData(){
      pages().then(res => {
        console.log(res)
        if(res.code==200){
          this.date = res;
          this.cashData={
            totalCash:res.data.totalCash,//当前余额
            actCash:res.data.actCash,//累计收益
            actCashDay:res.data.actCashDay,//当天收益
            staCash:res.data.staCash,//累计收益
            staCashDay:res.data.staCashDay,//当天收益
            creditPoint:res.data.creditPoint,//累计积分收益
          }
        }else{
          Toast({
            message: res.msg,
            duration: 3000,
            iconClass: 'iconfont icon-cs-sb-1'
          });
        }
      });
    },
    //充值
    goRecharge(){
      topup().then(res => {
        console.log(res);
        if(res.code==200){
          this.recharge=true;
          this.cashlists = res.data;
        }else{
          Toast({
            message: res.msg,
            duration: 3000,
            iconClass: 'iconfont icon-cs-sb-1'
          });
        }
      });
    },
    //提现
    goPresentation(){
      this.presentation=true;
    },
    //获取邮箱验证码
    getCode(){
      if (this.user.email) {
        this.buttonName = '验证码发送中'
        const _this = this
        getEmailCode().then(res => {
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
    },
    //提现确定
    surePresentation(){
      if (this.orderWithdraw.code == "") {
          // this.$message.error("请输入验证码");
          Toast({
            message: '请输入验证码',
            duration: 3000,
          iconClass: 'iconfont icon-jinggao'
          });
      }else if (this.orderWithdraw.amount == "") {
        // this.$message.error("请输入金额");
        Toast({
          message: '请输入金额',
          duration: 3000,
          iconClass: 'iconfont icon-jinggao'
        });
      }else if(this.orderWithdraw.amount <=0){
        // that.$message.error("输入金额必须大于零");
        Toast({
          message: '输入金额必须大于零',
          duration: 3000,
          iconClass: 'iconfont icon-jinggao'
        });
      } else if (this.orderWithdraw.amount > this.cashData.totalCash) {
        // this.$message.error("提现额度不能大于总额度");
        Toast({
          message: '提现额度不能大于总额度',
          duration: 3000,
          iconClass: 'iconfont icon-jinggao'
        });
      } else if (this.orderWithdraw.tokenId == "") {
        // this.$message.error("请输入地址");
        Toast({
          message: '请输入地址',
          duration: 3000,
          iconClass: 'iconfont icon-jinggao'
        });
      }  else {
        console.log(this.orderWithdraw);
        withdraw(this.orderWithdraw).then(res => {
          console.log(res);
          this.presentation=false;
          if(res.code==200){
            Toast({
              message: '恭喜你，提交成功',
              duration: 3000,
              iconClass: 'iconfont icon-cs-cg-1'
            });
            setTimeout(()=>{
              this.$router.push({
                path: "/finance/withdraw"
              });
            },3000)
            this.orderWithdraw= {//提现数据
              amount: "",
              tokenId: "",
              remark:"",
              code:'',
            }
          }else{
            Toast({
              message:res.msg,
              duration:3000,
              iconClass:'iconfont icon-cs-sb-1'
            })
          }
        });
      }
    },
    selectItem(e){
      console.log(e)
      var e = e - 1;
      this.current = e;
      this.topup_a = this.cashlists[e];
    },
    sureBtn(){
      if(this.current==1000){
        Toast({
          message: '请选择充值地址',
          duration: 3000,
          iconClass: 'iconfont icon-jinggao'
        });
        return false
      }
      this.recharge=false;
      this.recharge2=true;
      this.orderToup.thirdId = this.topup_a.token;
    },
    //充值确认
    sureBtn1(){
      this.orderToup.thirdId = this.topup_a.token;
      if (this.orderToup.amount == "") {
        // alert("请输入金额");
        //   this.$message({
        //   message: "请输入金额",
        //   type: "none"
        // });
        Toast({
          message: '请输入金额',
          duration: 3000,
          iconClass: 'iconfont icon-jinggao'
        });
      } else if(this.orderToup.amount <=0){
        // this.$message({
        //   message: "输入金额必须大于零",
        //   type: "none"
        // });
        Toast({
          message: '输入金额必须大于零',
          duration: 3000,
          iconClass: 'iconfont icon-jinggao'
        });
      } else if (this.orderToup.tokenId == "") {
        // alert("请输入订单号");
        // this.$message({
        //   message: "请输入订单号",
        //   type: "none"
        // });
        Toast({
          message: '请输入订单号',
          duration: 3000,
          iconClass: 'iconfont icon-jinggao'
        });
      } else {
        toup(this.orderToup).then(res => {
          // var data=JSON.parse(res.data)
          console.log(res);
          this.recharge2=false;
          // console.log(this.amount);
          if(res.code==200){
            Toast({
              message: res.msg,
              duration: 5000,
            iconClass: 'iconfont icon-cs-cg-1'
            });
            setTimeout(()=>{
              this.$router.push({
                path: "/finance/recharge",
                query: { topupMoney: this.orderToup.amount }
              });
            },3000)
          }else{
            Toast({
              message: res.msg,
              duration: 3000,
            iconClass: 'iconfont icon-cs-sb-1'
            });
          }
        });
      }
    },
    //关闭弹框
    closePopup(){
      this.presentation=false;
      this.recharge=false;
      this.recharge2=false;
    },
    // 查看明细
    hrefone() {
      this.$router.push({ path: "/finance/cash" });
    },
    hreftwo() {
      this.$router.push({ path: "/finance/static" });
    },
    hrefthree() {
      this.$router.push({ path: "/finance/dynamic" });
    },
    hreffour() {
      this.$router.push({ path: "/finance/integral" });
    },
  },
}
</script>

<style scoped>
.earnings-content {
  overflow-y: scroll;
  padding-bottom: 120px;
  box-sizing: border-box;
}
  .earnings-content h5{
    font-size: 28px;
    color: #fff;
    font-weight: 400;
    text-align: left;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .earnings-content .earnings-item{
    width: 100%;
    height: 320px;
    background: url('../../assets/images/earnings-bg.png') no-repeat;
    background-size: 100% 100%;
    margin: 15px 0;
    margin-top: 20px;
    color: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  .earnings-content .earnings-item .item-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .earnings-content .earnings-item .item-top .top-left{
    font-size: 26px;
    display: flex;
    align-items: center;
  }
  .earnings-content .earnings-item .item-top .top-left img{
    width: 59px;
    height: 14px;
    margin-left: 15px;
  }
  .earnings-content .earnings-item .item-top .top-right{
    width: 140px;
    height: 40px;
    border: 1px solid rgba(33, 191, 252, 1);
    background: rgba(14, 30, 75, 1);
    text-align: center;
    line-height: 40px;
    font-size: 22px;
    color: rgba(43, 250, 255, 1);
  }
   .earnings-content .earnings-item .item-middel{
     height: 200px;
     font-size: 22px;
     display: flex;
     flex-direction: column;
     justify-content: center;
  }
  .earnings-content .earnings-item .item-middel .item-m-p{
    width: 500px;
  }
  .earnings-content .earnings-item .item-middel .item-m-p:first-of-type{
    margin-bottom: 33px;
  }
  .earnings-content .earnings-item .item-middel .item-m-p .item-m-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  .earnings-content .earnings-item .item-middel .item-m-p .item-m-box span span{
    margin-right: 10px;
  }
  .earnings-content .earnings-item .item-middel .item-m-p .item-m-box .item-m-l{
    overflow: hidden;
  }
  .earnings-content .earnings-item .item-middel .item-m-p .item-m-box .middel-l{
    width: 160px;
    height: 16px;
    background: rgba(255, 171, 79, 1);
    border-radius: 8px;
    max-width: 290px;
  }
   .earnings-content .earnings-item .item-bottom{
     display: flex;
     align-items: center;
     justify-content: space-around;
  }
  .earnings-content .earnings-item .item-bottom .earnings-btn{
    width: 140px;
    height: 40px;
    border: 1px solid rgba(33, 191, 252, 1);
    background: rgba(14, 30, 75, 1);
    text-align: center;
    line-height: 40px;
    font-size: 22px;
    color: rgba(43, 250, 255, 1);
  }


  .popup{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(13, 29, 76, 0.8);
    z-index: 100;
    padding: 120px 10px 0;
    box-sizing: border-box;
    color: #fff;
  }
  .popup .popup-content{
    width: 100%;
    height: 650px;
    background: url('../../assets/images/bg_qianbao_tx_tc.png') no-repeat;
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
    width: 190px;
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

  /* 充值 */
  .popup .popup-content .popup-form .recharge-box{
    width: 100%;
    height: 430px;
    overflow-y: scroll;
  }
  .popup .popup-content .popup-form .recharge-box .recharge-item{
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26px;
    padding: 0 30px;
    box-sizing: border-box;
  }
  .popup .popup-content .popup-form .recharge-box .recharge-item span:last-of-type{
    font-size: 22px;
  }
  .classred {
    background: #4986ff;
    background: rgba(0, 128, 202, 0.4);
    border: 1px solid rgba(0, 190, 255, 0.6);
    color: #fff;
  }
  .el-table th>.cell, .el-table th div{
    display: flex;
}
.el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid transparent !important;
}
</style>