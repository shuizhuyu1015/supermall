<template>
  <div class="recommend-container">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: Array
    }
  }
</script>

<style scoped>
  .recommend-container {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 8px solid #eeeeee;
  }

  .recommend-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    text-align: center;
  }
  .recommend-item img {
    width: 66px;
    height: 66px;
  }
</style>
