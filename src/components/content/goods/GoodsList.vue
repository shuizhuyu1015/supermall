<template>
  <div class="goods-container">
    <goods-list-item v-for="(item,index) in goods" :key="item.acm" :goods-item="item" />
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem';

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: Array
    },
  }
</script>

<style scoped>
  .goods-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
