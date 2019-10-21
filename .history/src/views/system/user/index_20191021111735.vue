<template>
  <div class="p-box">
    <div class="search-box">
      <div class="date-box">
        <span>
          <!-- 关键词： -->
          {{$t('systemes.keyword')}}
        </span>
        <div class="date-picker">
          <div class="input-btn">
            <input type="text" v-model="keyword" :placeholder="$t('systemes.enterkeywordsearch')">
          </div>
        </div>
      </div>
      <div class="date-box">
        <span>
          <!-- 类型： -->
          {{$t('systemes.type')}}
          </span>
        <div>
          <div class="input-btn select-btn">
            <button class="selectBtn" :class="activeType==i.id?'activeType':''" v-for="(i,index) in selectInfo" v-bind:key="index" :data-name="i.name" @click="selectedBtn(i)">{{i.name}}</button>
          </div>
        </div>
      </div>
      <div class="date-box">
        <span>
          <!-- 状态： -->
          {{$t('systemes.status')}}
          </span>
        <div>
          <div class="input-btn select-btn">
            <button class="selectBtn" :class="selectStatus==i.id?'activeType':''" v-for="(i,index) in selectStatusInfo" v-bind:key="index" :data-name="i.name" @click="selectStatusBtn(i)">{{i.name}}</button>
          </div>
        </div>
        <div class="search-btn" @click="toQuery">
          <!-- 查询 -->
          {{$t('systemes.query')}}
          </div>
      </div>
    </div>
    <div class="data-box">
      <div style="width:100%!important;margin-top:20px">
        <el-table :data="data" :header-row-class-name="handlemyclass"  style="width: 100%!important" :row-class-name="setClassName" :cell-style="finalCellStyle">
          <el-table-column prop="username" :label="$t('systemes.username')" min-width="100" align="center"/>
          <el-table-column style="color:red" prop="phone" :label="$t('systemes.phone')" min-width="120" align="center"/>
          <el-table-column style="color:red" :show-overflow-tooltip="true" prop="email" :label="$t('systemes.mailbox')" min-width="120" align="center"/>
          <!-- <el-table-column label="上级代理" min-width="180" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.dept.name }}</div>
            </template>
          </el-table-column> -->
					<el-table-column :label="$t('systemes.usertype')" min-width="180" align="center">
					  <template slot-scope="scope">
					    <div>{{ scope.row.job.name }}</div>
					  </template>
					</el-table-column>
					<el-table-column :label="$t('systemes.merchantidentification')" min-width="180" align="center">
					  <template slot-scope="scope">
					    <div>{{ scope.row.merchantId }}</div>
					  </template>
					</el-table-column>
          <el-table-column :label="$t('systemes.status')" align="center" min-width="180" >
            <template slot-scope="scope">
              <div v-for="item in dicts" :key="item.id">
                <el-tag v-if="scope.row.enabled.toString() === item.value" :type="scope.row.enabled ? '' : 'info'">{{ item.label }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="createTime" :label="$t('systemes.creationdate')" min-width="200" align="center">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- <button class="more-btn" :current-page="page + 1" @click="pageChange">更多</button> -->
    </div>
  </div>
</template>

<script>
import '../../../utils/screen'
import { record, recordQuery } from '@/api/produc'
import { Toast } from 'mint-ui';
import { formatDate } from '../../../utils/date.js'
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import initDict from '@/mixins/initDict'
import { parseTime } from '@/utils/index'
import { getToken } from "@/utils/auth";

import { del } from '@/api/user'
import { getDepts } from '@/api/dept'
import { getAll } from '@/api/role'
import { getInfo } from '@/api/login'

export default {
  mixins: [initData, initDict],
  data(){
    return {
      list: [],
      pageNo: 1,
      pageSize: 10,
      keyword:'',
      total:0,//总条数
      lielist:[],//每条数据的详情
      selectInfo:[{name:'全部', key: '',id:0},{name:'用户名',id:1,key:'username'},{name:"邮箱",id:2,key:'email'}],
      activeType:0,
      selectStatusInfo:[{name:'全部', key: '',id:0},{name:'激活', key: 'true',id:1},{name:"锁定", key: 'false',id:2}],
      selectStatus:0,
      deptName: '',
      typeKey:'username',
      statusKey:null,
      deptId: null,
    }
  },
  created(){
    // this.request();
    this.getDeptDatas()
    this.$nextTick(() => {
      this.init()
      // 加载数据字典
      this.getDict('user_status')
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/users'
      const sort = 'id,desc'
      const type = this.typeKey
      const value = this.keyword
      const enabled = this.statusKey
      this.params = { page: this.page, size: this.size, sort: sort, deptId: this.deptId }
      if (type && value) { this.params[type] = value }
      if (enabled !== '' && enabled !== null) { this.params['enabled'] = enabled }
      return true
    },
    // 用户信息列表
     getUserDate() {
       getInfo().then(res=>{
         console.log(122)
         console.log(res)
         this.depts = res.content
       })
      // this.axios
      //   .get("http://shipz.jie360.com.cn/auth/info", {
      //     headers: {
      //       Authorization: "Bearer " + getToken(),
      //       "Access-Control-Allow-Origin": "localhost:8000"
      //     }
      //   })
      //   .then(function(response) {
      //     console.log(response.data);

      //   });
    },
    getDeptDatas() {
      const sort = 'id,desc'
      const params = { sort: sort }
      if (this.deptName) { params['name'] = this.deptName }
      getDepts(params).then(res => {
        console.log(122)
        console.log(res)
        this.depts = res.content
      })
    },
    selectedBtn(e){
      // console.log(e.target.dataset.name)
      console.log(e)
      this.activeType=e.id;
      this.typeKey=e.key
    },
    selectStatusBtn(e){
      // console.log(e.target.dataset.name)
      console.log(e)
      this.selectStatus=e.id;
      this.statusKey=e.key
    },
    request: function() {

    },
    getMore(){
      let pageTotal=Math.ceil(this.total/this.pageSize)
      this.pageNo++
      if(this.pageNo>pageTotal){
        // this.$message({
        //   message: "没有更多了",
        //   type: "none"
        // });
        Toast({
          message: '没有更多了',
          duration: 3000,
          iconClass: 'iconfont icon-jinggao'
        });
        return false
      }
      this.request();
    },
    // getMoreDetail(){

    // },
    //查看详情
    reveal($index, row) {
      this.FC = true
      cashlist(row.date,1).then(res => {
        this.lielist = eval(res.list)
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
    height: auto;
    /* padding-bottom: 150px; */
    box-sizing: border-box;
  }
  .p-box .search-box{
    width: 100%;
    height: 245px;
    background: url('../../../assets/images/bg_user.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 30px 20px;
    box-sizing: border-box;
    font-size: 22px;
  }
  .p-box .search-box .date-box{
    width: 100%;
    display: flex;
    align-items: center;
    color: #fff;
    position: relative;
  }
  .p-box .search-box .date-box span{
    margin-right: 25px;
  }
  .p-box .search-box .date-box:first-of-type span{
    margin-right: 0px;
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
  }
  .activeType{
    border: 1px solid #21BFFC;
    background: #0E1E4B;
  }
  .activeStatus{
    border: 1px solid #21BFFC;
    background: #0E1E4B;
  }
  .p-box .search-box .date-box .date-picker .input-btn input{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
  }
  .p-box .search-box .search-btn{
    position: absolute;
    right: 20px;
    width: 140px;
    height: 40px;
    border: 1px solid rgba(33, 191, 252, 1);
    background: rgba(14, 30, 75, 1);
    text-align: center;
    line-height: 40px;
    color: rgba(43, 250, 255, 1);
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
    background: url('../../../assets/images/bg_qianbao_tx_tc.png') no-repeat;
    background-size: 100% 100%;
    padding: 30px 15px 30px 15px;
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
    background: url('../../../assets/images/ic_tc_gb.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 29px;
    right: 29px;
  }
  .popup .popup-content .table-box{
    margin-top: 15px;
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
  }
  .el-table th, .el-table tr{
    height: 80px !important;
  }
  .el-table td, .el-table th{
    padding: 0 !important;
  }
  .el-table .cell{
    font-size: 24px !important;
    line-height: 40px !important;
  }
  /* .el-table::before{
    height: 0 !important;
  } */
  .el-table__empty-text{
    text-align: left !important;
    color: #fff;
    font-size: 24px !important;
  }

  .el-table .cell .el-tag{
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgba(14, 30, 75, 1);
    border: 1px solid rgba(33, 191, 252, 1);
    padding: 0 !important;
    color: rgba(19, 206, 102, 1) !important;
  }
  .el-table th>.cell, .el-table th div{
    /* display: flex; */
}
.el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid transparent !important;
}
</style>
