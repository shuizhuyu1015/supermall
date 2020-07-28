<template>
  <div class="goods-item-container" @click="onClickItem">
    <img v-lazy="showImg" @load="onImageLoad" >
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <div class="goods-info-other">
        <span class="price">¥{{goodsItem.price}}</span>
        <div class="collect-wrapper">
          <img src="~assets/img/common/collect.svg">
          <span class="collect">{{goodsItem.cfav}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: Object
    },
    computed: {
      showImg() {
        return this.goodsItem.image || this.goodsItem.show.img;
      }
    },
    methods: {
      onImageLoad() {
        this.$bus.$emit('itemImageLoad');
      },

      onClickItem(){
        if (this.goodsItem.item_id) {
          this.$router.replace('/detail/' + this.goodsItem.item_id);
        }else {
          this.$router.push('/detail/' + this.goodsItem.iid);
        }
      }
    }
  }
</script>

<style scoped>
  .goods-item-container {
    display: flex;
    flex-direction: column;
    width: 48%;
    margin-bottom: 10px;
  }

  .goods-item-container img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    margin: 3px 6px 0;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info-other{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price {
    color: var(--color-high-text);
  }

  .collect-wrapper {
    display: flex;
    align-items: center;
  }

  .collect-wrapper img {
    margin-top: -2px;
    width: 14px;
    height: 14px;
  }
</style>
