<template>
  <div>
    <nav-bar>
      <div slot="left" class="back-wrapper" @click="onClickBack">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title-wrapper">
        <div v-for="(item,index) in titles" :key="item"
             class="item-title" :class="{active: index == currentIndex}"
             @click="onClickItem(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      onClickBack() {
        this.$router.back();
      },

      onClickItem(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index);
      }
    }
  }
</script>

<style scoped>
  .back-wrapper img {
    margin-top: 10px;
  }

  .title-wrapper {
    display: flex;
    font-size: 13px;
  }

  .item-title {
    flex: auto;
  }

  .active {
    color: var(--color-high-text);
  }
</style>
