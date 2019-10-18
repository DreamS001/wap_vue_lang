<template>
  <div id="app">
    <router-view  :key="activeDate" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      activeDate:''
    }
  },
  mounted(){
  },
  created(){
    this.getdate()
  },
  methods:{
    getdate(){
      this.activeDate = Date.parse(new Date());
      console.log(this.activeDate)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url('./assets/images/wap-bg.png') no-repeat; 
  background-size: 100% 100%;
  background-attachment:fixed;
  overflow: hidden;
}
#app .container-box{
  width: 100%;
  height: 100%;
  color: aliceblue;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
