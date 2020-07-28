<template>
  <div class="cart-list-container">
    <scroll-view class="cart-scroll" ref="scrollView">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item" />
    </scroll-view>
  </div>
</template>

<script>
  import ScrollView from 'components/common/scroll/ScrollView';
  import CartListItem from './CartListItem';

  import {mapGetters} from 'vuex';

  export default {
    name: "CartList",
    components: {
      ScrollView,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scrollView.refresh();
    }
  }
</script>

<style scoped>
  .cart-list-container{
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .cart-scroll{
    height: 100%;
  }
</style>
