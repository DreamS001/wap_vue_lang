<template>
  <div class="product-box">
    <ul class="main-box">
      <li>
				  <div>
				    <div class="bg" >
				      <img  src="../../assets/images/img_chanpin1.png" alt />
              <h5>
                <!-- 自定义产品 -->
                {{$t('products.custom_product')}}
                </h5>
				    </div>
				    <div class="val">
				      <p>
				        <span>
                  <!-- 金额： -->
                  {{$t('products.money')}}：
                  </span>
				        <span>{{customPrice}}$</span>
				      </p>
				      <p>
				        <span>
                  <!-- 周期： -->
                  {{$t('products.period')}}：
                  </span>
				        <span>{{config.period}}{{$t('products.day')}}</span>
				      </p>
				      <p>
				        <span>
                  <!-- 回报率： -->
                  {{$t('products.rate_of_return')}}：
                  </span>
                <span>130+%</span>
				      </p>
              <p>
                <span>
                  <!-- 收益分配： -->
                  {{$t('products.income_distribution')}}：
                  </span>
                <span>200{{$t('products.day')}}</span>
              </p>
				      <p class="input-box">
				        <span class="num">
                  <!-- 数量： -->
                  {{$t('products.quantity')}}：
                  </span>
				        <span>
				            <el-input-number v-model="num" :min="1" :max="100" @change="countPrice" @focus="inputNum"></el-input-number>
				        </span>
				      </p>
				      <p >
                <span></span>
				        <span class="purchase" @click="contribut(1,i)">
                  <!-- 购买 -->
                  {{$t('products.buy')}}
                  </span>

				      </p>
				    </div>
				  </div>
				</li>
				<li v-for="(i,index) in list" v-bind:key="index">
				  <div>
				    <div class="bg" >
				      <img  :src="i.pic_url" alt />
              <h5>{{i.name}}</h5>
				    </div>
				    <div class="val">
				      <p>
				        <span>
                  <!-- 金额 -->
                  {{$t('products.money')}}
                  ：</span>
				        <span>{{i.price}}$</span>
				      </p>
				      <p>
				        <span>
                  <!-- 周期 -->
                  {{$t('products.period')}}
                  ：</span>
				        <span>{{i.period}}{{$t('products.day')}}</span>
				      </p>
				      <p>
				        <span>
                  <!-- 回报率 -->
                  {{$t('products.rate_of_return')}}
                  ：</span>
                <span>130+%</span>
				      </p>
              <p>
                <span>
                  <!-- 收益分配 -->
                  {{$t('products.income_distribution')}}
                  ：</span>
                <span>{{i.profit_distribute}}</span>
              </p>
				      <p>
                <span >
                  <!-- 数量 -->
                  {{$t('products.quantity')}}
                  ：</span>
                <span :key="i.id" >
                  <!-- <span :key="i.id" style="margin-right:4px;width:0;">{{i.num}}</span>台 -->
                  {{i.num}} {{$t('products.desk')}}
                </span>
              </p>
				      <p >
                <span></span>
				        <span class="purchase" @click="contribut(2,i)">
                  <!-- 购买 -->
                  {{$t('products.buy')}}
                  </span>
				      </p>
				    </div>
				  </div>
				</li>
      </ul>

      <!-- 弹框 -->

    <div class="popup" v-if="recharge">
      <div class="popup-content">
        <h5>
          <!-- 购买 -->
          {{$t('products.buy')}}
          </h5>
        <div class="close-icon" @click="closePopup"></div>
        <div class="popup-form">
          <div class="recharge-box">
            <!-- 确认购买该产品吗？ -->
            {{$t('products.confirm_purchase')}}
          </div>

          <div class="btn-group">
            <button class="sure-btn" @click="sureBtn">
              <!-- 确认 -->
              {{$t('products.determine')}}
              </button>
            <button class="sure-btn" @click="closePopup">
              <!-- 取消 -->
              {{$t('products.cancel')}}
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '../../utils/screen'
import { all, purchase, reivest,getConfig } from "@/api/produc";
import { Toast } from 'mint-ui';
import { fptproduct } from '@/utils/i18n'
  export default {
    data() {
      return {
        customPrice:300,
        num: 1,
        list: [],
        FC: false,
        config:{
          profit:0,
          period:0,
          amount:0

        },
        value: {
          pay: 1,
          id: 0,
          num:0
        },
        recharge:false
      };
    },
    created(){

    },
    watch:{

    },
    computed:{

    },
    mounted(){
      this.value.pay = this.$route.query.pay;
      all(1,999).then(res => {
        console.log(res);
        // this.list = res.list;
        if(res.code==200){
          this.list = res.data.list
        }else{
          Toast({
            message: res.msg,
            duration: 3000,
            iconClass: 'iconfont icon-cs-sb-1'
          });
        }
      });
      getConfig().then(res=>{
        if(res.code==200){
          this.config.period = res.data.period
          this.config.profit = res.data.profit
          this.config.amount = res.data.amount
        }else{
          Toast({
            message: res.msg,
            duration: 3000,
            iconClass: 'iconfont icon-cs-sb-1'
          });
        }
      })
    },
    methods: {
      fptproduct,
      countPrice(){
        this.customPrice = this.num*this.config.amount
      },
      inputNum(e){
        console.log(e)
        this.customPrice = this.num*this.config.amount
      },
      contribut(type,item) {
        this.recharge = true;
        if(type==1){
          this.value.id = 0
          this.value.num = this.num
        }
        if(type==2){
          this.value.id = item.id
          this.value.num = 0
        }
          this.value.pay = 1
          console.log(this.value)
      },
      //关闭弹框
      closePopup(){
        this.recharge=false;
      },
      sureBtn(){
        this.recharge=false;
        purchase(this.value).then(res => {
          if(res.code==200){
            this.$message.success("购买产品成功");
            this.$router.push({ path: "/product/record" });
          }else{
            Toast({
              message: res.msg,
              duration: 3000,
              iconClass: 'iconfont icon-cs-sb-1'
            });
          }
        });
      }
    }
  };
</script>
<style scoped>

  .product-box{
    width:100%;
    height:100%;
    overflow-y: scroll;
    padding-bottom: 150px;
    box-sizing: border-box;
  }
  /* ul整块样式 */
  .main-box{
    color:#fff;
    width:730px;
    height:100%;
    margin:10px auto 0;
  }
  /* 每个内容块 */
  .main-box>li{
    width:730px;
    height:400px;
    background: url(../../assets/images/bg_cpzh.png) no-repeat;
    background-size: 100% 100%;
    margin-bottom: 30px;
  }
  /* 左边 */
  .bg{
    /* width:366px; */
    width:366px;
    height: 400px;
    /* display: inline-block; */
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  /* 右边 */
  .val{
    width:363px;
    height: 100%;
    display: inline-block;
    padding-right:20px;
    padding-top:50px;
    box-sizing: border-box;
    float: right;
  }
  /* 左边内容 */
  .bg>img{
    display:block;
    width:281px;
    height: 210px;
    margin-bottom: 20px;
    /* margin:80px 0px 20px 50px; */
  }
  .bg>h5{
    display:block;
    width:228px;
    font-size:30px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(254,254,254,1);
    /* margin-left:30px; */
    box-sizing: border-box;
    text-align: center;
  }
  /* 右边内容 */
  .val>p{
    text-align: right;
    margin-bottom: 29px;
    height: 25px;
  }
  .val .input-box{
    width: 100%;
    height: 50px;
    margin-bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .val span{
    font-size:26px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(254,254,254,1);
    }
  .val>p>span:nth-of-type(1){
    float: left;
  }
  .val>p>span:nth-of-type(2){
    vertical-align: top
  }
  input{
    background: transparent;
    /* padding-left: 10px; */
    color: #fff;
  }
  .num{
    margin-top:6px;
  }

  /* 购买的样式 */
  .val .purchase{
    width:140px;
    height:40px;
    background:rgba(14,30,75,1);
    border:1px solid rgba(33,191,252,1);
    display: inline-block;
    text-align: center;
    line-height: 40px;
    color:#2BFAFF;
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
  .popup .popup-content .popup-form .recharge-box{
    width: 100%;
    height: 430px;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
  }
  .popup .popup-content .popup-form .btn-group{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .popup .popup-content .popup-form .btn-group .sure-btn{
    width: 190px;
    height: 70px;
    border: 1px solid #21BFFC;
    text-align: center;
    line-height: 70px;
    background: #0E1E4B;
    font-size: 26px;
    color: #7FA5F3;
  }

</style>
<style>
  .el-input-number{
    width:170px !important;
    height:36px;
  }
  .el-input-number__increase, .el-input-number__decrease{
    background: transparent;
    border: 1px solid transparent;
    color: #fff;
  }
  .el-input-number .el-input__inner {
    background: transparent !important;
    /* border: 1px solid rgba(0, 190, 255, 1) !important; */
    color: #fff;
    padding: 0px !important;
    width:50px !important;
    height:36px !important;
    background:rgba(14,30,75,1) !important;
    border:1px solid rgba(33,191,252,1) !important;
    border-radius:4px !important;
    box-sizing: border-box;
    vertical-align: bottom;
    font-size: 26px;


  }
  .el-input-number .el-input{
    width:50px;
    margin:0 60px;

  }
  .el-input-number .el-input-number__decrease,.el-input-number .el-input-number__increase{
    width:50px !important;
    height:36px !important;
    background:rgba(14,30,75,1) !important;
    border:1px solid rgba(33,191,252,1) !important;
    border-radius:4px !important;
    box-sizing: border-box;
  }
  .el-input-number__increase{
    width:50px;
    height:36px;
    background:rgba(14,30,75,1);
    border:1px solid rgba(33,191,252,1);
    border-radius:4px;
  }
  .el-input-number .el-icon-minus,.el-input-number .el-icon-plus{
    vertical-align: middle;
    font-size: 26px;
  }
  .el-table th>.cell, .el-table th div{
    display: flex;
}
.el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid transparent !important;
}
</style>


