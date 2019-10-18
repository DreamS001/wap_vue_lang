<template>
  <el-scrollbar class="sidebar-wrapper" style="overflow:hidden" wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :unique-opened="$store.state.settings.uniqueOpened"
      mode="vertical"
      text-color="rgba(231,239,255,1)"
      active-text-color="#409EFF"
    >
      
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem},
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      // return !this.sidebar.opened
      return false
    }
  },
  methods: {

  },
}
</script>



<style>
#app .sidebar-container a{
  display: inline-block;
  width: 100%;
  overflow: hidden;
}
  .sidebar-wrapper{
    margin-top: 130px;
  }
</style>
<style scoped>

      
.el-menu{
  background-color:transparent !important;
}
.el-scrollbar__wrap{
  overflow: hidden !important;
}

</style>
