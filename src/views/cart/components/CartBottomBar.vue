<template>
  <div class="cart-bottom-container">
    <div class="cart-all-selected" @click="onSelectAll">
      <check-button class="all-selected-button" :checked="isAllSelected" />
      <div>全选</div>
    </div>
    <div class="cart-amount">
      <div>合计：</div>
      <div class="total-price">¥{{totalPrice}}</div>
    </div>
    <div class="cart-settle" @click="onToSettle">去结算({{selectedCount}})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/common/checkButton/CheckButton';

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return this.$store.state.cartList.filter(item => item.checked)
          .reduce((total, currentItem) => {
            return total + currentItem.price * currentItem.count;
          }, 0).toFixed(2);
      },
      selectedCount() {
        return this.$store.state.cartList.filter(item => item.checked).length;
      },
      isAllSelected() {
        if (this.$store.state.cartList.length == 0) return false;
        return !this.$store.state.cartList.find(item => !item.checked);
      }
    },
    methods: {
      onSelectAll() {
        if (this.isAllSelected) {
          this.$store.state.cartList.forEach(item => item.checked = false);
        } else {
          this.$store.state.cartList.forEach(item => item.checked = true);
        }
      },

      onToSettle() {
        if (this.selectedCount == 0) {
          this.$toast.show('请先选择要购买的商品');
          return;
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-container{
    position: fixed;
    bottom: 49px;
    left: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    line-height: 40px;
    font-size: 15px;
    background-color: #eeeeee;
  }

  .cart-all-selected{
    display: flex;
    align-items: center;
    width: 100px;
  }
  .all-selected-button{
    width: 50px;
  }

  .cart-amount{
    flex: auto;
    display: flex;
    align-items: center;
  }
  .total-price{
    color: var(--color-high-text);
    font-weight: bold;
    font-size: 16px;
  }

  .cart-settle{
    text-align: center;
    color: white;
    background-color: var(--color-tint);
    width: 100px;
  }
</style>
