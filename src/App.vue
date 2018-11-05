<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/scss/vux.scss';
#app,.page {
  width: 100%;
  height: 100%;
  font-size: 14px;
}
.scroll{
  height: auto !important;
  top: 1.6rem !important;
  bottom:0 !important;
}
</style>
