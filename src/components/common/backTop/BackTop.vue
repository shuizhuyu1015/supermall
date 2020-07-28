<template>
  <div class="back-top-wrapper">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
  }
</script>

<style scoped>
  .back-top-wrapper{
    position: fixed;
    right: 15px;
    bottom: 60px;
    z-index: 99;
  }

  .back-top-wrapper img {
    width: 40px;
    height: 40px;
  }
</style>
