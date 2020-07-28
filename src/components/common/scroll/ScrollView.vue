<template>
  <div class="scroll-wrapper" ref="scrollWrapper">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "ScrollView",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.scrollWrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad,
      })

      if (this.probeType == 2 || this.probeType == 3){
        this.scroll.on('scroll', (position) => {
          // console.log(position)
          this.$emit('scroll', position);
        })
      }

      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          // console.log('上拉加载')
          this.$emit('pullingUp');
        })
      }

    },
    methods: {
      scrollTo(x, y, delay=500) {
        this.scroll.scrollTo(x, y, delay);
      },

      refresh() {
        this.scroll.refresh();
      },

      finishPullUp() {
        this.scroll.finishPullUp();
      }
    }
  }
</script>

<style scoped>

</style>
