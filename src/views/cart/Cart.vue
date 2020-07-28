<template>
  <div class="cart-container">
    <nav-bar class="cart-navbar">
      <div slot="center">购物车({{cartListLength}})</div>
    </nav-bar>

    <cart-list />

    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import CartList from './components/CartList';
  import CartBottomBar from './components/CartBottomBar';

  import {mapGetters} from 'vuex';

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartListLength'])
    }
  }
</script>

<style scoped>
  .cart-navbar{
    background-color: var(--color-tint);
    color: white;
    font-size: 16px;
    font-weight: bold;
  }
</style>
