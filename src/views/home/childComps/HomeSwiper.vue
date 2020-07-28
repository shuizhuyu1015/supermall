<template>
  <div>
    <swiper>
      <swiper-item v-for="banner in banners" :key="banner.image">
        <a :href="banner.link">
          <img :src="banner.image">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper';

  export default {
    name: "HomeSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: Array
    }
  }
</script>

<style scoped>

</style>
