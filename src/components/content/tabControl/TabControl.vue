<template>
  <div class="tab-control-container">
    <div v-for="(item,index) in titles" :key="item"
         class="tab-control-item" :class="{active: index == currentIndex}"
         @click="onClickItem(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: Array,
      currentTabIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    watch: {
      currentTabIndex: function (val, oldVal) {
        this.currentIndex = val;
      }
    },
    methods: {
      onClickItem(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index);
      }
    }
  }
</script>

<style scoped>
  .tab-control-container {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: white;
  }

  .tab-control-item {
    flex: auto;
  }
  .tab-control-item span {
    padding-bottom: 5px;
  }

  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-tint);
  }
</style>
