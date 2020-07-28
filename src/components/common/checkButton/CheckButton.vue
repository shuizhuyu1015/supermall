<template>
  <div class="check-button" @click="onCheckChange">
    <img v-if="checked" class="check-img" src="~assets/img/common/switch_pre.png" alt="">
    <img v-else class="check-img" src="~assets/img/common/switch_n.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      checked: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onCheckChange(){
        this.$emit('checkChange');
      }
    }
  }
</script>

<style scoped>
  .check-button{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .check-img{
    width: 26px;
  }
</style>
