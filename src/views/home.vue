<template>
    <div class="home-box">
      <div class="main-box">
        <!-- 首页内容部分第一块 -->
        <div class="home-main home-main1">
          <div></div>
        </div>
        <!-- 左右滑动 -->
        <div class="home-main home-main2">
          <div class="main2-box">
            <div class="scroll-main">
              <div class="swiper-slide">
                  <div class="item">
                    <div class="item-top clearfix">
                      <div class="top-left clearfix">
                        <span>我的交易</span>
                        <img src="../assets/images/img_jianbian.png" alt="" srcset="" >
                        <div class="top-right" @click="deal" >
                           查看详情
                        </div>
                      </div>

                    </div>
                    <div class="data-box">
                      <div class="item-middle">
                        <div class="middle-left">设备数</div>
                        <div class="middle-m">
                          <div class="middle-m-d" :style="{width:dataTable.deviceNum/75 +'rem'}" style="background:rgba(255, 171, 79, 1);"></div>
                          <div class="middle-right">{{earn.deviceNum}}台</div>
                        </div>

                      </div>
                      <div class="item-middle">
                        <div class="middle-left">我的交易额</div>
                        <div class="middle-m">
                          <div class="middle-m-d" :style="{width:dataTable.totalTradeAmount/75 +'rem'}" style="background:rgba(236, 105, 65, 1);"></div>
                          <div class="middle-right">${{earn.totalTradeAmount}}</div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="item-top clearfix">
                      <div class="top-left clearfix">
                        <span>我的收益</span>
                        <img src="../assets/images/img_jianbian.png" alt="" srcset="" >
                        <div class="top-right" @click="earns">
                           查看详情
                        </div>
                      </div>

                    </div>
                    <div class="data-box">
                      <div class="item-middle">
                        <div class="middle-left">累计收益</div>
                        <div class="middle-m">
                          <div class="middle-m-d" :style="{width:dataTable.totalProfit/75 +'rem'}" style="background:rgba(255, 171, 79, 1);"></div>
                          <div class="middle-right">${{earn.totalProfit}}</div>
                        </div>
                      </div>
                      <div class="item-middle">
                        <div class="middle-left">今日收益</div>
                        <div class="middle-m">
                          <div class="middle-m-d" :style="{width:dataTable.dayProfit/75 +'rem'}" style="background:rgba(236, 105, 65, 1);"></div>
                          <div class="middle-right">${{earn.dayProfit}}</div>
                        </div>
                      </div>
                      <div class="item-middle">
                        <div class="middle-left">今日投资</div>
                        <div class="middle-m">
                          <div class="middle-m-d" :style="{width:dataTable.dayInvest/75 +'rem'}"  style="background:#00AAFF;"></div>
                          <div class="middle-right">${{earn.dayInvest}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="item">
                    <div class="item-top clearfix">
                      <div class="top-left clearfix">
                        <span>我的团队</span>
                        <img src="../assets/images/img_jianbian.png" alt="" srcset="" >
                        <div class="top-right" @click="team" >
                           查看详情
                        </div>
                      </div>

                    </div>
                    <div class="data-box">
                      <div class="item-middle">
                        <div class="middle-left">我的团队</div>
                        <div class="middle-m">
                          <div class="middle-m-d" :style="{width:dataTable.teamNum/75 +'rem'}" style="background:rgba(255, 171, 79, 1);"></div>
                          <div class="middle-right">{{earn.teamNum}}人</div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide swiper-slide4">
                  <div class="item">
                    <div class="item-top clearfix">
                      <div class="top-left clearfix">
                        <span>动态公告</span>
                        <img src="../assets/images/img_jianbian.png" alt="" srcset="" >
                        <!-- <div class="top-right" >
                           查看详情
                        </div> -->
                      </div>

                    </div>
                    <div class="data-box4">
                     <ul style="" class="announcement">
                        <li v-for="(i,index) in notice" v-bind:key="index" @click="getNoticeData(i)">{{i.title}}</li>
                      </ul>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <!-- 首页内容部分第三块 -->
        <div class="home-main home-main3">
          <div class="">
            <div class="world-box chart-wrapper">
              <div class="equipment">
                <span>设备分布</span>
                <img src="../assets/images/img_jianbian.png" alt="" srcset="">
              </div>
              <div class="chart-wrapper mapp world-bottom">
                <div class="map-box">
                  <img  src="../assets/images/img_home_ditu.png" alt="">
                </div>
                <div class="data-boxs">
                  <div class="item-middle">
                    <div class="middle-left">交易总额</div>
                    <div class="middle-m">
                      <div class="middle-m-d" :style="{ width: dataList.trade_num/100000/75 + 'rem' }" style="background:rgba(255,171,79,1);" ></div>
                      <div class="middle-right">${{navdata.trade_num}}</div>
                    </div>

                  </div>
                  <div class="item-middle">
                    <div class="middle-left">交易笔数</div>
                    <div class="middle-m">
                      <div class="middle-m-d" :style="{ width: dataList.trade_amount/100000/75 + 'rem' }" style="background:#EC6941;"></div>
                      <div class="middle-right">{{navdata.trade_amount}}</div>
                    </div>

                  </div>
                  <div class="item-middle">
                    <div class="middle-left">总设备数</div>
                    <div class="middle-m">
                      <div class="middle-m-d" :style="{ width: dataList.device_num/100000/75 + 'rem' }" style="background:#00AAFF;"></div>
                      <div class="middle-right">{{navdata.device_num}}</div>
                    </div>

                  </div>
                  <div class="item-middle">
                    <div class="middle-left">总投资</div>
                    <div class="middle-m">
                      <div class="middle-m-d" :style="{ width: dataList.total_investment/100000/75 + 'rem' }" style="background:#2BFAFF;"></div>
                      <div class="middle-right">${{navdata.total_investment}}</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 首页内容部分第四块 -->
        <div class="home-main home-main4">
          <div class="footer">
            <h5>
              <span>联系我们</span>
              <img src="../assets/images/img_jianbian.png" alt="" srcset="">
            </h5>
            <p>
              <!-- <span>电话客服:{{phone}}</span>
              <span>客服QQ:{{qq}}</span>
              <span>公司邮箱:{{email}}</span> -->
              <span>公司名称：{{name}}</span>
              <span>邮箱账号：{{email}}</span>
              <!-- <span>Facebook账号：{{facebook}}</span> -->
            </p>
          </div>
        </div>
        <div class="home-main home-main5">
          <div class="footer-two">
            <h5>
              <span>推广链接</span>
              <img src="../assets/images/img_jianbian.png" alt="" srcset="">
            </h5>
            <p>
              <span class="tg-url">{{Url}}</span>
              <span class="copy" :data-clipboard-text="Url" @click="copyUrl">复制</span>
            </p>
          </div>
        </div>
      </div>

       <!-- 弹框 -->

      <div class="popup" v-if="recharge">
        <div class="popup-content">
          <h5>公告详情</h5>
          <div class="close-icon" @click="closePopup"></div>
          <div class="popup-form">
            <div class="recharge-box">
              <h4>{{noticeDetail.title}}</h4>
              <div class="notice-content">{{noticeDetail.content}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
import '../utils/screen'
import {notice,foot,earn,mapp}  from "@/api/map";
import { getUrl } from "@/api/visits";
import { Toast } from 'mint-ui';
export default {
  data(){
    return {
        name:'',
        facebook:"",
        email:"",
        Url:'',
        recharge:false,
        notice:[],
        noticeDetail:{},
        earn:'',
        navdata:'',
        dataTable:{
          deviceNum:0,//设备数
          totalProfit:0,//交易额
          tatalProfit:0,//累计收益
          dayProfit:0,//今日收益
          dayInvest:0,//今日投资
          teamNum:0,//我的团队
        },
        dataList:{
          trade_num:0,//交易总额
          trade_amount:0,//交易笔数
          device_num:0,//总设备数
          total_investment:0,//总投资
      },
    }
  },
  created(){
      this.foot();
      this.getUrl();
      this.getNotice();
      // 设备分布数据
      mapp().then(res=>{
        console.log(res)
        if(res.code==200){
          var data=JSON.parse(res.data.data)
          this.navdata=eval(data.data)
          console.log(this.navdata)
          this.dataList={
            trade_num:data.data.trade_num,//交易总额
            trade_amount:data.data.trade_amount,//交易笔数
            device_num:data.data.device_num,//总设备数
            total_investment:data.data.total_investment, //总投资
          }
        }else{
          Toast({
                message: res.message,
                duration: 3000,
          });
        }

        console.log(this.navdata.trade_num)
        console.log(this.dataList.trade_num)
      })
  },
  methods: {
      foot(){
        foot().then(res => {
          if(res.code==200){
            var data=JSON.parse(res.data.data)
            this.name=data.name
            this.facebook=data.facebook
            this.email=data.email
          }else{
            Toast({
                message: res.message,
                duration: 3000,
            });
          }

        })
      },
      getUrl(){
          getUrl(9).then(res=>{
            console.log(res)
            if(res.code==200){
              this.Url=res.data.url
            }else{
              Toast({
                    message: res.message,
                    duration: 3000,
              });

            }

          })
      },
      copyUrl(){
			  let _this = this;
        let clipboard = new this.clipboard(".copy");
        clipboard.on('success', function () {

            // _this.$message({
            //     message:'复制成功!',
            //     type:'success'
            // })
            Toast({
                message: '复制成功',
                duration: 3000,
                iconClass: 'iconfont icon-cs-cg-1'
            });
        });
        clipboard.on('error', function () {
            // _this.$message.error("复制失败!")
          Toast({
              message: '复制失败',
              duration: 3000,
              iconClass: 'iconfont icon-cs-sb-1'
          });
        });
      },
      //获取公告
      getNotice(){
        notice().then(res => {
          if(res.code==200){
            console.log(res.data.data);
            this.notice = res.data.data;
          }else{
            Toast({
                message: res.message,
                duration: 3000,
            });
          }

        });
      },
      getNoticeData(e){
        this.recharge=true
        this.noticeDetail=e
        console.log(e)
      },
      //关闭弹框
      closePopup(){
        this.recharge=false;
        this.noticeDetail={}
      },
      deal() {
        this.$router.push({ path: "/deal/deallist" });
      },
      earns() {
        this.$router.push({ path: "/finance/earnings" });
      },
      team() { this.$router.push({ path: "/team/teaming" });},
  },
    mounted() {
    var that=this
    notice().then(res => {
      if(res.code==200){
        // var data=JSON.parse(res)
        console.log(res.data.data);
        this.dta = res.data.data;
        // console.log(typeof(this.data))
        // console.log( this.dataa)
      }else{
        Toast({
            message: res.message,
            duration: 3000,
        });
      }

    });
    earn().then(res => {
      // var data=JSON.parse(res)
      if(res.code==200){
        console.log(res);
        this.earn = res.data.data;
        this.dataTable={
          deviceNum:res.data.data.deviceNum,//设备数
          totalTradeAmount:res.data.data.totalTradeAmount,//交易额
          totalProfit:res.data.data.totalProfit,//累计收益
          dayProfit:res.data.data.dayProfit,//今日收益
          dayInvest:res.data.data.dayInvest,//今日投资
          teamNum:res.data.data.teamNum,//我的团队
        }
      }else{
        Toast({
            message: res.message,
            duration: 3000,
        });
      }

      // console.log(typeof(this.data))
      // console.log( this.dataa)
    });
  },
}
</script>

<style scoped>
  .home-box{
    width:100%;
    height:auto;
    overflow-y: scroll;
    /* padding-bottom: 150px; */
    box-sizing: border-box;
  }
  .main-box{
    color:#fff;
    width:730px;
    height:auto;
    margin:10px auto 0;
  }
  .home-main{
    width:730px;
    margin-bottom: 30px;

  }
  .home-main1{
    height:300px;
    background: url(../assets/images/bg_home_banner.png) no-repeat;
    background-size: 100% 100%;
  }
  .home-main2{
    height:320px;

  }
  .home-main3{
    height:584px;
    background: url(../assets/images/bg_home_sbfb.png) no-repeat;
    background-size: 100% 100%;
  }
  .home-main4{
    height:244px;
    background: url(../assets/images/bg_home_lxwm.png) no-repeat;
    background-size: 100% 100%;
  }
  .home-main5{
    height:156px;
    background: url(../assets/images/bg_home_tglj.png) no-repeat;
    background-size: 100% 100%;
  }
  .home-main1>div{
    width:730px;
    height:100%;
    background: url(../assets/images/img_banner1.png) no-repeat;
    background-size: 100% 100%;
  }

  .home-main2>div{
    width:760px;
    height:340px ;

    margin-right:30px;

  }
    .scroll-main{
    width:2120px;
    height:320px;
    box-sizing: border-box;

  }
    .swiper-slide{
    float: left;
    width:500px !important;
    height:320px;
    /* margin-left:30px; */
    margin-right:30px;
    background: url(../assets/images/bg_home_wdjy.png) no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
  }
  .main2-box{
    width:730px;
    height: 320px;
    overflow-x: scroll;
  }
  .home-main2{
    overflow: hidden;
  }
  .item-top{
    width:100%;
    height:40px;
    margin-top:22px;
  }
  .top-left{
    margin-left:21px;
    height:40px;
    display: flex;
    align-items: center;
    position: relative;
    line-height: 40px;
  }
  .top-left img{
    width: 59px;
    height: 14px;
  }

  .top-right{
    float: right;
    width:140px;
    height:40px;
    background:rgba(14,30,75,1);
    border:1px solid rgba(33,191,252,1);
    box-sizing: border-box;
    font-size:22px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(43,250,255,1);
    line-height:40px;
    text-align: center;
    position: absolute;
    top: 0;
    right: 30px;
  }
  .top-left>span{
    font-size:26px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:21px;
    float: left;
  }
  .top-left img{
    margin-top:8px;
    margin-left:16px;
    float:left;
  }
  .home-main2 .data-box{
    width:100%;
    height:240px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

  }
  .home-main2 .data-box4{
    width:100%;
    height:240px;
  }
  .home-main2 .data-box .item-middle{

    width:100%;
  }
  .home-main2 .middle-left{
    float: left;
    width:100%;
    margin-left: 3px;
    text-align: left;
    font-size:22px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:21px;
    margin-bottom: 17px;

  }
  .home-main2 .middle-m{
    /* float: left; */
    width:100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .home-main2 .middle-m-d{
    /* width:180px; */
    max-width: 271px;
    overflow: hidden;
    height:16px;
    /* background:rgba(255,171,79,1); */
    border-radius:8px;
    float: left;
    overflow: hidden;
  }
  .home-main2 .middle-right{
    margin-right:63px;
    float: right;
  }
  .announcement{
     list-style-type: none;
     margin-top:15px;
     margin-bottom: 6px;
     height:240px;
     overflow:hidden;
     overflow-y:scroll;
     padding-left:0;
     width: 400px;
   }
  .announcement::-webkit-scrollbar{
     display: none;
  }
  ul{
    padding-left:0px;
    overflow-y: scroll;
  }
  ul>li{
    list-style: none;
    text-align: left;
    /* height: 28px; */
    line-height: 50px;
    font-size: 22px;
    color: #FFFFFF;
    display: inline-block;
    white-space: nowrap;

    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  /* 第三块 */
  /* 设备分布 */
  .equipment{
    padding-left:21px;
    padding-top: 30px;
    height:55px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .equipment>span{
    float: left;
    font-size:26px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:21px;
    }
  .equipment>img{
    width: 59px;
    height: 14px;
    float: left;
    margin-left:16px;
  }
  .data-boxs{
    margin-left:21px;
  }
  .map-box{
    width:730px;
    height:304px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .map-box>img{
    width:624px;
    height:304px;
    display: block;
    margin:0 auto;
  }
  .data-box,.data-box4{
    margin-left:21px;
  }
  .home-main3 .item-middle{
    width:50%;
    float: left;
    text-align: left;
    margin-bottom: 20px;

  }
  .home-main3 .middle-left{
    font-size:22px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:21px;
    margin-bottom:17px;
  }
  .home-main3 .middle-m{
    width:100%;
    margin-right:10px;
    height:16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .home-main3 .middle-m-d{
    /* width:160px; */
    max-width: 171px;
    overflow: hidden;
    height:16px;
    /* background:rgba(255,171,79,1); */
    border-radius:8px;
  }
  .middle-right{
    font-size:20px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:21px;
    margin-left: 10px;
    margin-right: 10px;

  }

  /* 第四块 */
  .footer,.footer-two{
  height: 100%;
  padding: 30px 0px 0px 20px;
  box-sizing: border-box;
  border-radius: 2px;
  color: #FFFFFF;
  }
  .footer>h5{
    padding: 0;
    margin: 0;
    text-align: left;
    margin-bottom: 39px;
    height:25px;
    display: flex;
    align-items: center;
  }
  .footer>h5 img{
    width: 59px;
    height: 14px;
  }
  .footer-two>h5 img{
    width: 59px;
    height: 14px;
  }
  .footer>h5>span,.footer-two>h5>span{
    font-size:26px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:21px;
  }
  .footer p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    flex-wrap: wrap;
    margin: 0;

   }
  .footer p>span{
     width:100%;
     text-align: left;
     font-size:22px;
     font-family:PingFang SC;
     font-weight:500;
     color:rgba(255,255,255,1);
     line-height:21px;
     margin-bottom:29px;
   }
   /* 第五块 */
   .footer-two{
       position: relative;
   }
  .footer-two>h5{
    padding: 0;
    margin: 0;
    text-align: left;
    margin-bottom: 30px;
    height:25px;
    display: flex;
    align-items: center;
  }
  .footer-two p{
    width:100%;
    height:40px;
    margin-bottom:30px;
  }
  .footer-two p>span{
    font-size:22px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:40px;

  }
  .footer-two p>span:nth-of-type(1){
    float: left;
  }
  .footer-two p>span:nth-of-type(2){
    width:140px;
    height:40px;
    float: right;
    background: url(../assets/images/bg_home_tglj.png) no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    margin-right: 20px;
    background:rgba(14,30,75,1);
    border:1px solid rgba(33,191,252,1);
    font-size:22px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(43,250,255,1);
    line-height:40px;
    text-align: center;
  }
  .footer-two p .tg-url{
    display: inline-block;
    width: 600px;
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .footer-two p .copy{
      position: absolute;
      top: 30px;
      right: 20px;
  }
  .footer span,.footer-two span{
    float:left
  }
  .footer img,.footer-two img{
    float:left;
    margin-left: 16px;
  }



  .popup{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(13, 29, 76, 0.8);
    z-index: 100;
    padding: 170px 10px 0;
    box-sizing: border-box;
    color: #fff;
  }
  .popup .popup-content{
    width: 100%;
    height: 650px;
    background: url('../assets/images/bg_qianbao_tx_tc.png') no-repeat;
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
    background: url('../assets/images/ic_tc_gb.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 29px;
    right: 29px;
  }
  .popup .popup-content .popup-form .recharge-box{
    width: 100%;
    height: 550px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: 26px;
    color: #FFFFFF;
  }
  .popup .popup-content .popup-form .recharge-box h4{
    font-size: 28px;
    margin: 30px 0 45px 0;
  }
  .popup .popup-content .popup-form .recharge-box .notice-content{
    height: 500px;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
  }
</style>
