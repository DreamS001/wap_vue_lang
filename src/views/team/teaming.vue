<template>
  <div class="team-box">
    <div class="team-tree">
      <div class="tree-content">
        <div class="backBtn" @click="restBtn">重置</div>
        <div class="first-level public-box" @click="clickQuery(depts)">
          <img class="user-img" src="../../assets/images/img_team_tx.png" alt="">
          <div class="user-name">{{depts.username}}</div>
          <!-- <div class="desc-box">投资金额:${{depts.id}}</div>
          <div class="desc-box">团队人数:{{depts.isCut}}人</div> -->
          <span class="row-line" v-if="treeTatal >1"></span>
          <span class="clu-line" v-if="treeTatal !=0"></span>
        </div>
        <div class="second-level" v-if="treeTatal !=0">
          <ul class="second-box clearfloat" ref="ul" :style="{width:widthnum}" v-if="treeTatal>=3">
            <li class="public-box second-item" ref="ulLi" v-for="(i,index) in treeUserData" v-bind:key="index" @click="clickQuery(i)">
              <img class="user-img" src="../../assets/images/img_team_tx.png" alt="">
              <div class="user-name">{{i.username}}</div>
              <!-- <div class="desc-box">投资金额:${{i.total_amount}}</div>
              <div class="desc-box">团队人数:{{i.cash_amount}}人</div> -->
              <span class="clu-line"></span>
            </li>
          </ul>

          <!-- 二级只有一个时 -->
          <ul class="second-box clearfloat one" ref="ul" style="width:100%" v-else-if="treeTatal==1">
            <li class="public-box second-item" ref="ulLi" v-for="(i,index) in treeUserData" v-bind:key="index" @click="clickQuery(i)">
              <img class="user-img" src="../../assets/images/img_team_tx.png" alt="">
              <div class="user-name">{{i.username}}</div>
              <!-- <div class="desc-box">投资金额:${{i.total_amount}}</div>
              <div class="desc-box">团队人数:{{i.cash_amount}}人</div> -->
              <span class="clu-line"></span>
            </li>
            <!-- <li class="public-box second-item" ref="ulLi">
              <img class="user-img" src="../../assets/images/img_team_tx.png" alt="">
              <div class="user-name">1111111</div>
              <div class="desc-box">投资金额:$11111</div>
              <div class="desc-box">团队人数:1111人</div>
              <span class="clu-line"></span>
            </li> -->
          </ul>

          <!-- 二级只有两个时 -->
          <ul class="second-box clearfloat tow" ref="ul" style="width:100%" v-else-if="treeTatal==2">
            <li class="public-box second-item" ref="ulLi" v-for="(i,index) in treeUserData" v-bind:key="index" @click="clickQuery(i)">
              <img class="user-img" src="../../assets/images/img_team_tx.png" alt="">
              <div class="user-name">{{i.username}}</div>
              <!-- <div class="desc-box">投资金额:${{i.total_amount}}</div>
              <div class="desc-box">团队人数:{{i.cash_amount}}人</div> -->
              <span class="clu-line"></span>
            </li>
            <!-- <li class="public-box second-item" ref="ulLi" v-for="(i,index) in 2" v-bind:key="index">
              <img class="user-img" src="../../assets/images/img_team_tx.png" alt="">
              <div class="user-name">1111111</div>
              <div class="desc-box">投资金额:$11111</div>
              <div class="desc-box">团队人数:1111人</div>
              <span class="clu-line"></span>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
    <div class="team-form">
      <div class="search-box">
        <div class="date-box">
          <span>自定义：</span>
          <div class="date-picker">
            <div class="input-btn" @click="selectbeginDate">
              <input type="text" readonly v-model="beginDate" placeholder="请选择日期">
            </div>
            <span style="text-align:center;">至</span>
            <div class="input-btn" @click="selectendDate">
              <input type="text" readonly v-model="endDate" placeholder="请选择日期">
            </div>
          </div>
          <div class="rest-btn" @click="restBtn2">重置</div>
        </div>
        <div class="date-box">
          <span>会员编号：</span>
          <div class="date-picker">
            <div class="" style="width:100%">
              <input type="text" style="width:100%" v-model="memberNum" placeholder="">
            </div>
          </div>
        </div>
        <div class="date-box">
          <span>会员编号：</span>
          <div class="date-picker">
            <div class="" style="width:100%">
              <input type="text" style="width:100%" v-model="account" placeholder="">
            </div>
          </div>
        </div>
        <div class="date-box">
          <span>联系方式：</span>
          <div class="date-picker">
            <div class="" style="width:100%">
              <input type="text" style="width:100%" v-model="contact" placeholder="">
            </div>
          </div>
          <div class="search-btn" @click="searchData">查询</div>
        </div>
      </div>
      <div class="data-box">
        <div style="width:100%!important;margin-top:20px">
          <el-table :data="userData" :header-row-class-name="handlemyclass"  style="width: 100%!important" :row-class-name="setClassName" :cell-style="finalCellStyle">
            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="日期" min-width="160" align="center">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.create_time) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="会员编号" align="center" min-width="160">
              <template slot-scope="scope">
                <div>{{ scope.row.id}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="username" label="会员名称" align="center" min-width="160"/>
            <el-table-column prop="phone" label="联系方式" align="center" min-width="160"/>
            <el-table-column label="邮箱" align="center" min-width="160">
              <template slot-scope="scope">
                <div>{{ scope.row.email }}</div>
              </template>
            </el-table-column>
            <el-table-column label="投资金额（$）" align="center" min-width="160">
              <template slot-scope="scope">
                <div>{{ scope.row.total_amount }}</div>
              </template>
            </el-table-column>
            <el-table-column label="当前余额（$）" align="center" min-width="160">
              <template slot-scope="scope">
                <div>{{ scope.row.cash_amount }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="260" align="center" min-width="160">
              <template slot-scope="scope">
                <div class="ck-btn" size="mini" @click="reveal(scope.$index, scope.row)">查看详情</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <button class="more-btn" @click="getMore">更多</button>
      </div>
    </div>

    <div class="popup" v-if="FC">
      <div class="popup-content">
        <h5>查看详情</h5>
        <div class="close-icon" @click="closePopup"></div>
        <div class="table-box">
          <el-table
            :data="userList"
            :header-row-class-name="handlemyclass"
            :cell-style="finalCellStyle"
            style="width: 100%!important"
            height="350"
            :row-class-name="setClassName"
          >
            <el-table-column prop="username" label="会员" min-width="150" align="center"/>
            <el-table-column prop="id" label="会员编号" min-width="180" align="center"/>
            <el-table-column prop="amount" label="投资金额（$）" min-width="170" align="center"/>
            <el-table-column prop="num" label="团队人数（人）" align="center" min-width="180"></el-table-column>
          </el-table>
        </div>
        <!-- <button class="more-btn" @click="getMoreDetail">更多</button> -->
      </div>
    </div>
  </div>
</template>

<script>

import '../../utils/screen'
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import initDict from '@/mixins/initDict'
import { del } from '@/api/user'
import { getDepts } from '@/api/dept'
import { getAll } from '@/api/role'
import { parseTime } from '@/utils/index'
import { formatDate } from '../../utils/date.js'

import { Toast } from 'mint-ui';
import { getUserList } from '@/api/data'
import { persAll,detail } from "@/api/team";
export default {
  mixins: [initData, initDict],
  data(){
    return {
      list: [],
      todayDate:'',
      beginDate: '',
      endDate: '',
      memberNum:'',//会员编号
      account:'',//账号
      contact:'',//联系方式
      total:0,//总条数
      treeTatal:0,
      FC:false,
      userList:[],//每条数据的详情

      deptName: '',
      // depts: [],
      deptId: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      queryTypeOptions: [
          { key: 'username', display_name: '用户名' },
          { key: 'email', display_name: '邮箱' }
        ],
      enabledTypeOptions: [
        { key: 'true', display_name: '激活' },
        { key: 'false', display_name: '锁定' }
      ],
      examine: {
        merchantId: '',
        email: '',
        phone: '',
        username: '',
        length: '',
        offlinePrice: '',
        merchantRate: ''
      },
      nameing: '',
      FC: false,
      userData:[],
      treeUserData:[],
      pageNo: 1,
      pageSize: 10,
      id:'',
      name:'',
      name1:'',
      investorId:'',
      widthnum:'',//ul的宽度
      depts:{},//一级信息
    }
  },
  created(){
    var date = new Date()
    this.todayDate = formatDate(date, 'yyyy-MM-dd')
    this.getDeptDatas()
    this.$nextTick(() => {
      this.init()
      // 加载数据字典
      this.getDict('user_status')
    })
    persAll().then(res => {
      console.log(res);
      // this.investorId=res.content[0].merchantCode
      this.investorId=res.content[0].merchantCode
      this.queryData(this.investorId)
      this.treeUserDataQuery(this.investorId)
    });
  },
  mounted(){
    // this.liW()
    this.$nextTick(()=>{ // 页面渲染完成后的回调
        // console.log(this.$refs.ulLi.offsetWidth)
    })
  },
  methods: {
    liW() {
      this.$nextTick(() => {
        // let liw = this.$refs.ulLi.offsetWidth;
        // let len = this.$refs.ul.children.length;
        // this.widthnum = (liw + 20 ) * len - 20 + "px";
        
        
      });
    },
    parseTime,
    checkPermission,
    beforeInit() {
      console.log(123123)
      var investorId = this.investorId

      console.log(investorId)

      this.url = 'api/users?deptId=' + investorId
      const sort = 'id,desc'
      const query = this.query
      const type = query.type
      const value = query.value
      const enabled = query.enabled
      this.params = {
        page: this.page,
        size: this.size,
        sort: sort,
        deptId: this.deptId
      }
      if (type && value) {
        this.params[type] = value
      }
      if (enabled !== '' && enabled !== null) {
        this.params['enabled'] = enabled
      }
      return true
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
    restBtn2(){
      this.beginDate='',
      this.endDate='',
      this.memberNum=''
      this.account=''
      this.contact=''
    },
    searchData(){
      this.pageNo=1
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
      this.id=this.memberNum
      this.name=this.account
      this.name1=this.contact
      this.queryData(this.investorId)
    },

    queryData(id){
      getUserList(id, this.beginDate,this.endDate, this.id,this.name, this.name1,this.pageNo, this.pageSize).then(res=>{
        console.log(res)
        if(res.code==200){
          this.userData=res.data.list
          this.total=res.data.total
          let liw = 2.67 ;
          let len = this.total;
          console.log(len)
          this.widthnum = (liw + 0.4 ) * len - 0.4 + "rem";
          console.log(liw * len);
          console.log(this.widthnum)
        }else{
          Toast({
            message: res.msg,
            duration: 3000,
            iconClass: 'iconfont icon-cs-sb-1'
          });
        }
        

        // let liw = this.$refs.ulLi.offsetWidth;
        // let liw = 130 ;
        // let len = this.total;
        // console.log(len)
        // this.widthnum = (liw + 20 ) * len - 20 + "px";
      })
    },
    //获取树形二级
    treeUserDataQuery(id){
      getUserList(id, this.beginDate,this.endDate, this.id,this.name, this.name1,this.pageNo, 100000).then(res=>{
        console.log(res)
        if(res.code = 200){
          this.treeUserData=res.data.list
          this.treeTatal=res.data.total
          let liw = 2.67 ;
          let len = this.treeTatal;
          console.log(len)
          this.widthnum = (liw + 0.4 ) * len - 0.4 + "rem";
          console.log(liw * len);
          console.log(this.widthnum)
        }else{
          Toast({
            message: res.msg,
            duration: 3000,
            iconClass: 'iconfont icon-cs-sb-1'
          });
        }
      })
    },
    //重置
    restBtn(){
      location.reload() 
    },
    clickQuery(e){
      console.log(e)
      this.depts=e
      // this.queryData(e.merchantCode)
      this.treeUserDataQuery(e.merchant_id)
      this.investorId=e.merchant_id
      this.queryData(this.investorId)
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
      // this.request();
      this.queryData(this.investorId)
    },
    // getMoreDetail(){

    // },
    //查看详情
    reveal($index, row) {
      detail(row.id).then(res=>{
        console.log(res)
        if(res.code==200){
          this.FC = true
          this.userList=res.data
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
      this.userList=[]
    },
    getDeptDatas() {
      const sort = 'id,desc'
      const params = { sort: sort }
      console.log(params)
      console.log(213)
      if (this.deptName) {
        params['name'] = this.deptName
      }
      getDepts(params).then(res => {
        console.log(122)
        console.log(res.content[0])
        this.depts = res.content[0]
        this.depts.username=res.content[0].name
        this.depts.merchant_id=res.content[0].merchantCode
        console.log(this.depts)
      })
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


    //获取url中参数
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    }
  },
}
</script>

<style scoped>
  .team-box{
    width: 100%;
    padding-bottom: 150px;
    box-sizing: border-box;
  }
  .team-box .team-tree{
    width: 100%;
    /* height: 600px; */
  }
  .team-box .team-tree .tree-content{
    width: 100%;
    height: 100%;
    padding: 60px 35px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  .team-box .team-tree .tree-content .backBtn{
    width: 140px;
    height: 40px;
    border: 1px solid rgba(33, 191, 252, 1);
    background: rgba(14, 30, 75, 1);
    position: absolute;
    top: 60px;
    left: 35px;
    text-align: center;
    line-height: 40px;
    font-size: 22px;
    color: rgba(43, 250, 255, 1);
  }
  .team-box .team-tree .tree-content .public-box{
    width: 200px;
    height: 210px;
    background: url('../../assets/images/bg_team_touxiang.png') no-repeat;
    background-size: 100% 100%;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    position: relative;
  }
  .team-box .team-tree .tree-content .first-level .row-line{
    display: block;
    width: 460px;
    height: 1px;
    background: rgba(0, 190, 255, 1);
    position: absolute;
    bottom: -30px;
  }
  .team-box .team-tree .tree-content .first-level .clu-line{
    display: block;
    width: 2px;
    height: 26px;
    background: rgba(0, 190, 255, 1);
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
  }
  .team-box .team-tree .tree-content .public-box .user-img{
    width: 70px;
    height: 70px;
  }
  .team-box .team-tree .tree-content .public-box .user-name{
    width: 100%;
    font-size: 24px;
    text-align: center;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .team-box .team-tree .tree-content .public-box .desc-box{
    width: 100%;
    text-align: left;
    line-height: 25px;
    font-size: 14px;
  }
  .team-box .team-tree .tree-content .second-level{
    width: 100%;
    height: 240px;
    overflow-x: auto;
    position: relative;
    margin-top: 30px;
  }
  
  .team-box .team-tree .tree-content .second-level .second-box{
    width: auto;
    height: 100%;
    overflow-x: auto;
		white-space:nowrap;
  }
  .team-box .team-tree .tree-content .second-level .public-box.second-item{
    float: left;
    /* margin-right: 20px;no */
    margin-right: 30px;
    margin-top: 30px;
  }
  .team-box .team-tree .tree-content .second-level .public-box.second-item::after{
    content: '';
    width: 2px;
    height: 26px;
    background: rgba(0, 190, 255, 1);
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    /* z-index: 999; */
  }

  .team-box .team-tree .tree-content .second-level .second-box.one{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .team-box .team-tree .tree-content .second-level .second-box.tow{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .team-box .team-tree .tree-content .second-level .second-box.tow .second-item{
    margin-right: 0;
  }
  .team-box .team-tree .tree-content .second-level .second-box.tow .second-item:last-of-type{
    margin-left: auto;
  }
  /* .team-box .team-tree .tree-content .second-level .public-box.second-item .clu-line{
    display: block;
    width: 2px;
    height: 26px;
    background: rgba(0, 190, 255, 1);
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
  } */
  .team-box .team-tree .tree-content .second-level .public-box.second-item:last-of-type{
    margin-right: 0;
  }
  .team-form{

  }
  .team-form .search-box{
    width: 100%;
    height: 310px;
    background: url('../../assets/images/bg_team.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding: 25px 20px;
    box-sizing: border-box;
    font-size: 22px;
  }
  .team-form .search-box .date-box{
    width: 100%;
    display: flex;
    align-items: center;
    color: #fff;
    position: relative;
  }
  .team-form .search-box .date-box span{
    display: inline-block;
    width: 130px;
  }
  .team-form .search-box .date-box .date-picker{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    height: 50px;
    border: 2px solid rgba(47, 228, 255, 1);
    background: rgba(24, 136, 203, 0.3);
  }
  .team-form .search-box .date-box .date-picker .input-btn{
    width: 180px;
    height: 50px;
  }
  .team-form .search-box .date-box .date-picker .input-btn input{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
  }
  .team-form .search-box .search-btn{
    width: 140px;
    height: 40px;
    border: 1px solid rgba(33, 191, 252, 1);
    background: rgba(14, 30, 75, 1);
    text-align: center;
    line-height: 40px;
    color: rgba(43, 250, 255, 1);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
  }
  
  .rest-btn{
    width: 140px;
    height: 40px;
    border: 1px solid rgba(33, 191, 252, 1);
    background: rgba(14, 30, 75, 1);
    text-align: center;
    line-height: 40px;
    color: rgba(43, 250, 255, 1);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
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
    background: rgba(13, 29, 76, 0.8);
    z-index: 100;
    padding: 170px 10px 0;
    box-sizing: border-box;
    color: #fff;
  }
  .popup .popup-content{
    width: 100%;
    height: 650px;
    background: url('../../assets/images/bg_qianbao_tx_tc.png') no-repeat;
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
    background: url('../../assets/images/ic_tc_gb.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 29px;
    right: 29px;
  }
  .popup .popup-content .table-box{
    margin-top: 15px;
  }

  /*清除浮动代码*/
   .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
   .clearfloat{zoom:1}
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
    /* line-height: 100% !important; */
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
  .el-table::before{
    height: 0 !important;
  }
  .el-table__empty-text{
    text-align: left !important;
    color: #fff;
    font-size: 24px !important;
  }
  .el-table th>.cell, .el-table th div{
    display: flex;
}
.el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid transparent !important;
}
</style>