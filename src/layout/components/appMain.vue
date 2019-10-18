<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style scoped>
  .app-main {
    z-index: 9;
    /*84 = navbar + tags-view = 50 +34 */
    width: 100%;
    height: auto;
    position: relative;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    /* overflow: hidden; */
    /* margin-top: 50px; */
  }

  .fixed-header+.app-main {
    /* padding-top: 50px; */
  }
</style>
