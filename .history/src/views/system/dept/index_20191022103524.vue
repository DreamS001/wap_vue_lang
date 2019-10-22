<template>
  <div class="p-box">
    <!--工具栏-->
    <div class="search-box">
      <!-- 搜索 -->
      <div class="search-item">
        <span>
          <!-- 名称 -->
          {{$t('systemes.name')}}：
          </span>
        <el-input v-model="query.value" clearable :placeholder="$t('systemes.proxy_code_search')" class="filter-item search-input" @keyup.enter.native="toQuery"/>
        <div style="display: inline-block;">
          <el-button
            class="filter-item filter-btn"
            size="mini"
            @click="changeExpand">{{ $parent.expand ? '折叠' : '展开' }}</el-button>
        </div>
      </div>
      <div class="search-item">
        <span>
          <!-- 名称： -->
          {{$t('systemes.name')}}：
          </span>
        <el-select v-model="query.enabled" clearable :placeholder="$t('systemes.status')" class="filter-item select-input" style="width: 90px" @change="toQuery">
          <el-option v-for="item in enabledTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
        </el-select>
        <el-button class="filter-item filter-btn" size="mini" @click="toQuery">{{$t('systemes.query')}}</el-button>
      </div>
    </div>
    <!--表格渲染-->
    <div class="data-box">
      <div style="width:100%!important;margin-top:20px">
        <tree-table :expand-all="expand" :data="data" :columns="columns" size="medium"  style="width: 100%!important" :row-class-name="setClassName" :header-row-class-name="handlemyclass">
          <el-table-column :label="$t('systemes.proxy_code')" align="center" min-width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.merchantCode }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('systemes.sponsored_links')" align="center" min-width="200">
            <template slot-scope="scope">
              <el-button size="mini" class="copy" data-clipboard-action="copy" :data-clipboard-text="'http://investor.jie360.com.cn/register/?key='+scope.row.registerUrl" @click="copyUrl">点击复制</el-button>
            </template>
          </el-table-column>
          <el-table-column :label="$t('systemes.status')" align="center" min-width="200">
            <template slot-scope="scope">
              <div v-for="item in dicts" :key="item.id">
                <el-tag v-if="scope.row.enabled.toString() === item.value" :type="scope.row.enabled ? '' : 'info'">{{ item.label }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('systemes.creationdate')" min-width="200">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
        </tree-table>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../utils/screen'
import treeTable from '@/components/TreeTable'
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import initDict from '@/mixins/initDict'
import { del } from '@/api/dept'
import { parseTime } from '@/utils/index'
import { Toast } from 'mint-ui';
import { systemes } from '@/utils/i18n'

import  Codkies from 'js-cookie'
var lang=cookies.get('language') || 'en';
export default {
  components: {  treeTable },
  mixins: [initData, initDict],
  data() {
    return {
      columns: [
        {
          text: '名称',
          value: 'name'
        }
      ],
      enabledTypeOptions: [
        { key: 'true', display_name: '正常' },
        { key: 'false', display_name: '禁用' }
      ],
      delLoading: false, expand: true
    }
  },
  created() {
    if(lang=='en'){
      this.enabledTypeOptions=[
        { key: 'true', display_name: '正常' },
        { key: 'false', display_name: '禁用' }
      ],
    }
    this.$nextTick(() => {
      this.init()
      // 加载数据字典
      this.getDict('dept_status')
    })
  },
  methods: {
    systemes,
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/dept'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const value = query.value
      const enabled = query.enabled
      if (value) { this.params['name'] = value }
      if (enabled !== '' && enabled !== null) { this.params['enabled'] = enabled }
      return true
    },
    changeExpand() {
      this.expand = !this.expand
      this.init()
    },
		copyUrl(){
			let _this = this;
     let clipboard = new this.clipboard(".copy");
     clipboard.on('success', function () {
      //  _this.$message({
			// 	 message:'复制成功!',
			// 	 type:'success'
      //  })
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
    setClassName({row, rowIndex}) {
      let index = rowIndex + 1;
      if(index %2 == 0){
          return 'warning-row'
      }else{
        return 'success-row'
      }
    },
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      return 'test'
    },

  }
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
    background: url('../../../assets/images/bg_mingxi2.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 25px 20px;
    box-sizing: border-box;
    font-size: 22px;
  }
  .p-box .search-box .search-item{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }
  .p-box .search-box .search-item span{
    font-size: 22px;
    color: #FFFFFF;
  }
  .p-box .search-box .search-item .filter-btn{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }
  .p-box .search-box .search-item .select-input{
    height: 50px;
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
    font-size: 24px !important;
    line-height: 40px !important;
    display: flex;
    justify-content: center;
    align-items: center;
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
  }
  .el-button{
    height: 40px !important;
    background: #0E1E4B;
    border: 1px solid #21BFFC;
    line-height: 40px !important;

  }
  .el-button:focus,.el-button:hover{
    background: #0E1E4B;
    border: 1px solid #21BFFC;
  }
  .el-button span{
    font-size: 22px !important;
    color: #2BFAFF;
  }
  .search-input{
    width:400px !important;
    height:50px !important;
  }
  .search-input .el-input__inner{
    width: 100%;
    height: 100%;
    background: transparent !important;
    border: 1px solid rgba(33, 191, 252, 1) !important;
  }
  .p-box .search-box .search-item .select-input .el-input--suffix{
    height: 100% !important;
  }
  .p-box .search-box .search-item .select-input .el-input--suffix .el-input__inner{
    height: 100% !important;
    background: transparent !important;
    border: 1px solid rgba(33, 191, 252, 1) !important;
  }
  .el-select-dropdown{
    background: rgba(24, 136, 203, 0.8) !important;
    border: 1px solid rgba(33, 191, 252, 1) !important;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background: #0E1E4B !important;
  }
  .el-select-dropdown__item{
    color: #fff;
  }
  .el-table th>.cell, .el-table th div{
    display: flex;
}
.el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid transparent !important;
}
.el-button{
  background:#0E1E4B !important;
  padding: 0 !important;
  border: 1px solid transparent !important;
  display: flex;
  justify-content: center;
  align-items: center;
  border: .013333rem solid #21bffc !important;
}
</style>
