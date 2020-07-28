<template>
  <div class="bottom-container">
    <div class="left-wrapper">
      <div class="left-item-wrapper">
        <img src="~assets/img/detail/detail_server.png" alt="">
        <div>客服</div>
      </div>
      <div class="left-item-wrapper">
        <img src="~assets/img/detail/detail_shop.png" alt="">
        <div>店铺</div>
      </div>
      <div class="left-item-wrapper">
        <img src="~assets/img/detail/detail_collect.png" alt="">
        <div>收藏</div>
      </div>
    </div>
    <div class="center-wrapper" @click="onAddToCart">加入购物车</div>
    <div class="right-wrapper">购买</div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      onAddToCart() {
        this.$emit('addCart');
      }
    }
  }
</script>

<style scoped>
  .bottom-container{
    display: flex;
    width: 100%;
    height: 49px;
    line-height: 49px;
    position: fixed;
    bottom: 0;
  }

  .left-wrapper{
    flex: 2;
    background-color: white;
    display: flex;
    justify-content: space-evenly;
  }
  .left-item-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .left-item-wrapper img {
    width: 24px;
    height: 24px;
  }
  .left-item-wrapper>div {
    line-height: 20px;
    font-size: 14px;
  }

  .center-wrapper{
    flex: 1;
    text-align: center;
    background-color: gold;
  }

  .right-wrapper{
    flex: 1;
    text-align: center;
    background-color: #ff8198;
  }
</style>
