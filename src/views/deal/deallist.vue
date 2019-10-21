<template>
  <div class="p-box">
    <div class="search-box">
      <div class="date-box">
        <span>{{$t('financeCash.customQuery')}}：</span>
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
        <span>{{$t('financeCash.serial_number')}}：</span>
        <div class="date-picker">
          <div class="" style="width:100%;">
            <input style="width:100%;" type="text" v-model="pipelineNum" placeholder="">
          </div>
        </div>
      </div>
      <div class="rest-btn" @click="restBtn">{{$t('financeCash.rest')}}</div>
      <div class="search-btn" @click="searchData">{{$t('financeCash.query')}}</div>
    </div>
    <div class="data-box">
      <div style="width:100%!important;margin-top:20px">
        <el-table :data="list" :header-row-class-name="handlemyclass"  style="width: 100%!important" :row-class-name="setClassName" :cell-style="finalCellStyle">
          <el-table-column prop="complete_time" :label="$t('financeCash.date')" min-width="190" align="center"/>
          <el-table-column style="color:red" prop="merchant_order_id" :label="$t('financeCash.serial_number')" min-width="200" align="center"/>
          <el-table-column style="color:red" prop="merchant_order_id" :label="$t('financeCash.name')" min-width="200" align="center"/>
          <el-table-column style="color:red" prop="qcf_device_num" :label="$t('financeCash.device_number')" min-width="180" align="center"/>
          <el-table-column style="color:red" prop="order_amount" :label="$t('financeCash.transaction_amount')" min-width="170" align="center"/>
          <el-table-column prop="order_status" :label="$t('financeCash.trading_status')" min-width="170" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div class="status-box" style="color:rgba(255, 73, 73, 1);" v-if="scope.row.order_status===0">{{$t('financeCash.not_submitted')}}</div>
              <div class="status-box" style="color:rgba(19, 206, 102, 1);" v-else-if="scope.row.order_status===3">{{$t('financeCash.successful_trade')}}</div>
              <div class="status-box" style="color:rgba(47, 228, 255, 1);" v-else-if="scope.row.order_status===5">{{$t('financeCash.refund_completed')}}</div>
              <div class="status-box" style="color:rgba(19, 206, 102, 1);" v-else-if="scope.row.order_status===7">{{$t('financeCash.order_cancelled')}}</div>
              <div class="status-box" style="color:rgba(255, 73, 73, 1);" v-else>{{$t('financeCash.unknown_state')}}</div>
            </template>
          </el-table-column>
          <el-table-column style="color:red" prop="loc_info" :label="$t('financeCash.remark')"  min-width="150" align="center"/>
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
            height="400"
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
import { tradeQuery} from "@/api/facility";
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
    }
  },
  created(){
    var date = new Date()
    this.todayDate = formatDate(date, 'yyyy-MM-dd')
    this.request();
  },
  methods: {
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
      this.pipelineNum=''
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
      tradeQuery(this.pageNo, this.pageSize, this.beginDate, this.endDate, this.pipelineNum).then(res => {
        // this.list = this.list.concat(eval(res.list))
        // this.total = res.total;
        console.log(res)
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
      });
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
    reveal($index, row) {
      this.FC = true
      cashlist(row.date,1).then(res => {
        // this.lielist = eval(res.list)
        if(res.code==200){
          this.FC = true
          this.lielist = eval(res.data.list)
        }else{
          Toast({
            message: res.msg,
            duration: 3000,
            iconClass: 'iconfont icon-cs-sb-1'
          });
        }
      })
    },
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
          color: '#FF7B61'
        }
      }
      if (columnIndex == 5) {
        return {
          color: '#FF7B61'
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
    height: 170px;
    background: url('../../assets/images/bg_mingxi2.png') no-repeat;
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
