<template>
  <div class="toast-wrapper" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message='', duration=2000) {
        this.message = message;
        this.isShow = true;

        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        }, duration);
      }
    }
  }
</script>

<style scoped>
  .toast-wrapper{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
    padding: 8px 10px;
    border-radius: 5px;
    background-color: rgba(0,0,0,.75);
    color: white;
    max-width: calc(100% - 30px);
  }
</style>
