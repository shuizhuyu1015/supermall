<template>
  <div class="cart-item-container">
    <check-button class="check-wrapper" :checked="product.checked" @checkChange="onCheckChange" />
    <div class="cart-item-info">
      <img class="item-img" :src="product.image" alt="">
      <div class="item-info">
        <div class="item-title overflow-ellipsis">{{product.title}}</div>
        <div class="item-desc">{{product.desc}}</div>
        <div class="item-other">
          <div class="item-ptice">¥{{product.price}}</div>
          <div class="item-count">x{{product.count}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/common/checkButton/CheckButton';

  export default {
    name: "CartListItem",
    components: {
      CheckButton,
    },
    props: {
      product: Object
    },
    methods: {
      onCheckChange() {
        this.$store.dispatch('changeChecked', this.product);
      }
    }
  }
</script>

<style scoped>
  .cart-item-container{
    display: flex;
    align-items: center;
    height: 120px;
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px solid #eeeeee;
  }

  .check-wrapper{
    width: 40px;
    height: 50px;
    flex: none;
  }

  .cart-item-info{
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
    flex: auto;
  }
  .item-img{
    width: 20%;
    border-radius: 5px;
  }

  .item-info{
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: auto;
    width: 70%;
  }
  .item-title{
    font-size: 15px;
  }
  .item-desc{
    font-size: 14px;
    color: #999999;
    margin: 4px 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .item-other{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
  .item-ptice{
    color: var(--color-high-text);
  }
</style>
