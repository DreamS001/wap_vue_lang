<template>
  <div class="p-box">
    <div class="search-box">
      <div class="date-box">
        <span style="width:2.5rem;">{{$t('financeCash.customQuery')}}：</span>
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
        <span style="width:2.5rem;">{{$t('financeCash.serial_number')}}：</span>
        <div class="date-picker">
          <div class="" style="width:100%">
            <input style="width:100%" type="text" v-model="pipelineNum">
          </div>
        </div>
      </div>
      <div class="date-box">
        <span style="width:2.5rem;">{{$t('financeCash.member_name')}}：</span>
        <div class="date-picker">
          <div class="" style="width:100%">
            <input style="width:100%" type="text" v-model="member_name">
          </div>
        </div>
      </div>
      <div class="date-box">
        <span style="width:2.5rem;">{{$t('financeCash.contact_information')}}：</span>
        <div class="date-picker">
          <div class="" style="width:100%">
            <input style="width:100%" type="text" v-model="contact_information">
          </div>
        </div>
      </div>
      <div class="date-box">
        <span style="width:2.5rem;">{{$t('financeCash.transaction_amount1')}}：</span>
        <!-- <div class="date-picker">
          <div class="" style="width:100%">
            <input style="width:100%" type="text" v-model="pipelineNum">
          </div>
        </div> -->
        <div class="date-picker">
          <div class="input-btn">
            <input type="text"  v-model="beginMoney" :placeholder="$t('financeCash.input_amount')">
          </div>
          <span>-</span>
          <div class="input-btn">
            <input type="text"  v-model="endMoney" :placeholder="$t('financeCash.input_amount')">
          </div>
        </div>
      </div>
          <!-- 类型： -->
      <!-- <div class="date-box">
        <span style="width:3rem;">
          {{$t('financeCash.transaction_type')}}
          </span>
        <div style="width: 90%;display:flex;">
          <div class="input-btn select-btn">
            <button class="selectBtn" :class="activeType==i.id?'activeType':''" v-for="(i,index) in selectInfo" v-bind:key="index" :data-name="i.name" @click="selectedBtn(i)">{{i.name}}</button>
          </div>
        </div>
      </div> -->
      <div class="date-box">
        <span  style="width:3rem;">
          <!-- 类型： -->
          {{$t('financeCash.trading_status')}}
          </span>
        <div style="width: 90%;display:flex;">
          <div class="input-btn select-btn">
            <button class="selectBtn" :class="activeStatus==i.id?'activeType':''" v-for="(i,index) in selectStatus" v-bind:key="index" :data-name="i.name" @click="selectedBtnStatus(i)">{{i.name}}</button>
          </div>
        </div>
      </div>
      <div class="rest-btn" @click="restBtn">{{$t('financeCash.rest')}}</div>
      <div class="search-btn" @click="searchData">{{$t('financeCash.query')}}</div>
    </div>
    <div class="data-box">
      <div style="width:100%!important;margin-top:20px">
        <el-table :data="list" :header-row-class-name="handlemyclass"  style="width: 100%!important" :row-class-name="setClassName" :cell-style="finalCellStyle">
          <el-table-column prop="create_time" :label="$t('financeCash.cash_time')" min-width="190" align="center"/>
          <el-table-column style="color:red" prop="merchant_order_id" :label="$t('financeCash.serial_number')" min-width="160" align="center"/>
          <el-table-column style="color:red" prop="charge_token_id" :label="$t('financeCash.member_name')" min-width="170" align="center"/>
          <el-table-column style="color:red" prop="remark" :label="$t('financeCash.contact_information')" min-width="150" align="center"/>
          <el-table-column style="color:red" prop="remark" :label="$t('financeCash.withdrawal_amount')" min-width="150" align="center"/>
          <el-table-column style="color:red" prop="third_trade_id" :label="$t('financeCash.wallet_adress')" min-width="230" align="center"/>

          <el-table-column prop="order_status" :label="$t('financeCash.approval_status')" align="center" min-width="150" >
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.order_status==300">{{$t('financeCash.sh_success')}}</el-tag>
              <el-tag type="danger" v-if="scope.row.order_status==200">{{$t('financeCash.sh_fail')}}</el-tag>
              <el-tag type v-if="scope.row.order_status==100">{{$t('financeCash.in_audit')}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column style="color:red" prop="remark" :label="$t('financeCash.remark')" min-width="150" align="center"/>
          <el-table-column style="color:red" prop="charge_amount" :label="$t('financeCash.audit_time')" min-width="150" align="center"/>
          <!-- <el-table-column label="操作" min-width="150" align="center">
            <template slot-scope="scope">
              <div class="ck-btn" @click="reveal(scope.$index, scope.row)">查看详情</div>
            </template>
          </el-table-column> -->
        </el-table>
      </div>

      <button class="more-btn" @click="getMore">{{$t('financeCash.more')}}</button>
    </div>

    <div class="popup" v-if="FC" @click="closePopup">
      <div class="popup-content">
        <div>
          <el-table
            :data="lielist"
            :header-row-class-name="handlemyclass"
            :cell-style="finalCellStyle"
            style="width: 100%!important"
            height="270"
             :row-class-name="setClassName"
          >
            <el-table-column prop="date" label="日期" min-width="100" align="center"/>
            <el-table-column prop="act_profit" label="动态钱包收益（$）" min-width="160" align="center"/>
            <el-table-column prop="sta_profit" label="静态钱包收益（$）" min-width="160" align="center"/>
            <el-table-column prop="charge_price" label="充值金额（$）" min-width="150" align="center"/>
            <el-table-column prop="device_expend" label="购买机器人支出（$）" min-width="170" align="center"/>
            <el-table-column prop="cash_withdraw" label="提现支出（$）" min-width="170" align="center"/>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../utils/screen'
import { topupList, topupQueryList } from '@/api/finance'
import { Toast } from 'mint-ui';
import { formatDate } from '../../utils/date.js'
import { financeEarnings,financeCash } from '@/utils/i18n'// 国际化主题名字

import Cookies from 'js-cookie'
var lang=Cookies.get('language') || 'en';
export default {
  data(){
    return {
      list: [],
      pageNo: 1,
      pageSize: 10,
      pipelineNum:'',//流水号
      todayDate:'',
      beginDate: '',
      endDate: '',
      total:0,//总条数
      FC:false,
      lielist:[],//每条数据的详情
      selectInfo:[{name:'全部', key: '',id:0},{name:'充值',id:1,key:'chongzhi'},{name:"提现",id:2,key:'tixian'}],
      selectStatus:[{name:'全部', key: '',id:0},{name:'审核成功',id:1,key:'success'},{name:"驳回",id:2,key:'reject'},{name:"审核中",id:3,key:'inAudit'}],
      activeType:0,
      activeStatus:0,
      beginMoney:'',//开始金额
      endMoney:'',//结束金额
      member_name:'',
      contact_information:''
    }
  },
  created(){
    var date = new Date()
    this.todayDate = formatDate(date, 'yyyy-MM-dd')
    this.request();
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
      this.pipelineNum='',
      this.beginMoney='',
      this.endMoney='',
      this.contact_information='',
      this.member_name=''
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
      topupQueryList(this.pageNo, this.pageSize, this.beginDate, this.endDate, this.pipelineNum).then(
        res => {
          if(res.code==200){
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
      this.lielist=[]
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
    height: 600px;
    background: url('../../assets/images/bg_mingxi1.png') no-repeat;
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
    height: 650px;
    background: url('../../assets/images/bg_qianbao_tx_tc.png') no-repeat;
    background-size: 100% 100%;
    padding: 30px 35px 30px 30px;
    box-sizing: border-box;
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