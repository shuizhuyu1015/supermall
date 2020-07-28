<template>
  <div class="detail-container">
    <detail-nav-bar class="detail-nav" ref="detailNav" @titleClick="onTitleClick" />

    <scroll-view class="detail-scroll" ref="scrollView" :probe-type="3" @scroll="onContentScroll">
      <detail-swiper :images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="onImageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-coment-info ref="comment" :comments="comments" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll-view>

    <detail-bottom-bar @addCart="onAddCart" />

    <back-top v-show="isShowBackTop" @click.native="onClickBackTop" />
  </div>
</template>

<script>
  import ScrollView from 'components/common/scroll/ScrollView';
  import GoodsList from 'components/content/goods/GoodsList';

  import DetailNavBar from './components/DetailNavBar';
  import DetailSwiper from './components/DetailSwiper';
  import DetailBaseInfo from './components/DetailBaseInfo';
  import DetailShopInfo from './components/DetailShopInfo';
  import DetailGoodsInfo from './components/DetailGoodsInfo';
  import DetailParamInfo from './components/DetailParamInfo';
  import DetailComentInfo from './components/DetailComentInfo';
  import DetailBottomBar from './components/DetailBottomBar';

  import {DetailRequest, Goods, Shop, GoodsParam} from 'network/detail';
  import {itemListenerMixin, backTopMixin} from 'common/mixin';
  import {debounce} from "common/utils";
  import {mapActions} from 'vuex';

  export default {
    name: "GoodsDetail",
    mixins: [itemListenerMixin, backTopMixin],
    components: {
      ScrollView,
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComentInfo,
      DetailBottomBar
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        comments: [],
        recommends: [],

        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      this.iid = this.$route.params.iid;

      this.getDetail();
      this.getRecommend();

      // 需要等图片加载完之后确定各个主题的偏移量，以备点击标题滚动到对应主题
      // 而每次图片加载完成会进行页面刷新，为了this.themeTopYs赋值防抖
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // 追加一个最大值，用于滚动时判断标题的下标改变
        this.themeTopYs.push(Number.MAX_VALUE);
      }, 100);
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemListener);
    },
    methods: {
      ...mapActions(['addCart']),

      onImageLoad() {
        this.$refs.scrollView.refresh();
        this.getThemeTopY();
      },

      onTitleClick(index) {
        this.$refs.scrollView.scrollTo(0, -this.themeTopYs[index]);
      },

      onContentScroll(position) {
        const positionY = -position.y;
        const lenght = this.themeTopYs.length;
        for (let i = 0; i < lenght - 1; i++) {
          if (this.currentIndex != i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex = this.currentIndex;
          }
        }
        // 是否显示回到顶部
        this.listenShowBackTop(position);
      },

      onAddCart() {
        const goods = {
          iid: this.iid,
          title: this.goods.title,
          desc: this.goods.desc,
          price: this.goods.realPrice,
          image: this.topImages[0]
        }
        // commit走mutations同步state数据，dispatch走actions异步处理业务，最终还是走mutations
        // 推荐用dispatch
        // this.$store.commit('addCart', goods);

        // this.$store.dispatch('addCart', goods).then(res => {
        //
        // });
        // mapActions将vuex里的方法映射到当前组件自己的方法
        this.addCart(goods).then(res => {
          this.$toast.show(res);
        })
      },

      getDetail() {
        DetailRequest.getDetail(this.iid).then(res => {
          const result = res.result;
          this.topImages = result.itemInfo.topImages;
          this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services);
          this.shop = new Shop(result.shopInfo);
          this.detailInfo = result.detailInfo;
          this.paramInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule);
          this.comments = result.rate.list;
        })
      },

      getRecommend() {
        DetailRequest.getRecommend().then(res => {
          this.recommends = res.data.list;
        })
      }
    }
  }
</script>

<style scoped>
  .detail-container {
    position: relative;
    z-index: 100;
    background-color: white;
    height: 100vh;
  }

  .detail-scroll{
    height: calc(100% - 44px - 49px);
  }

  .detail-nav {
    position: relative;
    z-index: 99;
    background-color: white;
  }
</style>
