<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
        <!-- {{generateTitle(item.children[0].meta.title)}} -->
      </app-link>
    </template>

    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu" />

        <app-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta"  :title="child.meta.title" />
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

import { generateTitle } from '@/utils/i18n'// 国际化主题名字

import Cookies from 'js-cookie'
var lang=Cookies.get('language') || 'en';
export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    generateTitle,
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        // console.log(item)
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          if(lang=='en'){
            if(item.meta.title=='首页'){
              console.log(item.meta.title)
              item.meta.title='Home'
            }
            this.onlyOneChild = item
          }else{
            if(item.meta.title=='首页'){
              console.log(item.meta.title)
              item.meta.title='首页'
            }
            this.onlyOneChild = item
          }
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    }
  }
}
</script>

<style>
  .el-menu-item.is-active {
    background:rgba(47,228,255,0.3) !important;
    color: #2FE4FF ;
    /* border-right:4px solid #2FE4FF; */
    /* width: 189px !important; */
  }
  .el-menu-item:hover,.el-submenu__title:hover{
    background:rgba(47,228,255,0.3) !important;
    color: #2FE4FF !important;
    /* border-right:4px solid #2FE4FF; */
    /* width: 189px !important; */
  }
  .el-menu{
    background: transparent !important;
    color:#efefff !important;
  }

  .el-menu-item:hover{
    outline: 0 !important;
    color: #409EFF !important;
    /* border-right:4px solid #2FE4FF !important; */
    /* width: 189px !important; */
}
.el-menu-item.is-active {
    color: rgba(47, 228, 255, 1) !important;
    background: rgba(47,228,255,0.3) !important;
}
.sidebar-container .nest-menu .el-submenu>.el-submenu__title:focus, .sidebar-container .nest-menu .el-submenu>.el-submenu__title:hover{
    outline: 0 !important;
    color: #409EFF !important;
    background: rgba(47,228,255,0.3) !important;
}
@media screen and (-webkit-min-device-pixel-ratio:0) {

  /* Webkit内核兼容CSS选择器样式 放到这里 */
    #app .sidebar-container {
     /* width: 190px !important; */

    }
    .el-submenu__icon-arrow{
      position: absolute;
      top: 50%;
      right: 30px !important;
    }
    .el-submenu__title:hover> .el-submenu__icon-arrow{
    position: absolute;
    /* right:10px !important; */
   }
  }


  .menu-wrapper{
    width: 100%;
    height: 100%;
  }
  .menu-wrapper .router-link-exact-active{
    /* height: 100%; */
    width: 100%;
  }
  .menu-wrapper a{
    width: 100%;
  }
  .el-menu-item{
    width: 100% !important;
    height: 80px !important;
    border-right:0px solid transparent !important;
    font-size: 26px;
    display: flex;
    align-items: center;
  }
  .el-menu-item.is-active{
    width: 100% !important;
    height: 80px !important;
    border-right:0px solid transparent !important;
    font-size: 26px;
    display: flex;
    align-items: center;
  }
  .menu-wrapper .el-submenu{
    width: 100% !important;
    height:100% !important;
    border-right:0px solid transparent !important;
    font-size: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .menu-wrapper .el-submenu .el-submenu__title{
    width: 100% !important;
    height: 80px !important;
    font-size: 26px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .el-submenu__icon-arrow{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 40px;
    font-size: 26px !important;
  }
  .el-menu-item:hover, .el-submenu__title:hover{
    border-right:0px solid transparent !important;
  }

  .menu-wrapper .el-submenu .el-menu,.menu-wrapper .el-submenu .el-menu a{
    width: 100% !important;
  }
  .menu-wrapper .el-menu-item span{
    margin-left: 60px !important;
  }
  .menu-wrapper .el-submenu .el-submenu__title span{
    margin-left: 60px !important;
  }
</style>
