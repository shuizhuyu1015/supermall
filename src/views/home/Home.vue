<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div class="home-nav-center" slot="center">购物街</div>
    </nav-bar>
    <tab-control v-show="isShowFixedTab" class="home-tab-control" :titles="['流行', '新款', '精选']" :currentTabIndex="currentTabIndex" @tabClick="onClickTab" />

    <scroll-view class="home-content" ref="scrollView"
                 :probeType="3"
                 :pullUpLoad="true"
                 @scroll="onContentScroll"
                 @pullingUp="onLoadMore">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" :currentTabIndex="currentTabIndex" @tabClick="onClickTab" />
      <goods-list class="goods-list-wrapper" :goods="goods[currentTab].list" />
    </scroll-view>

    <back-top v-show="isShowBackTop" @click.native="onClickBackTop" />

  </div>
</template>

<script>
  import ScrollView from 'components/common/scroll/ScrollView';
  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';

  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';

  import {HomeRequest} from 'network/home';
  import {itemListenerMixin, backTopMixin} from 'common/mixin';

  export default {
    name: "Home",
    mixins: [itemListenerMixin, backTopMixin],
    components: {
      ScrollView,
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentTab: 'pop',
        isShowFixedTab: false,
      }
    },
    computed: {
      currentTabIndex() {
        let index = 0;
        switch (this.currentTab) {
          case "pop":
            index = 0;
            break;
          case 'new':
            index = 1;
            break;
          case 'sell':
            index = 2;
            break;
        }
        return index;
      }
    },
    created() {
      this.getHomeMultidata();

      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      // const refresh = debounce(this.$refs.scrollView.refresh, 50);
      // this.$bus.$on('itemImageLoad', () => {
      //   refresh();
      // })
    },
    deactivated() {
      this.$bus.$off('itemImageLoad', this.itemListener);
    },
    methods: {
      // ---事件监听相关方法---

      onClickTab(index) {
        switch (index) {
          case 0:
            this.currentTab = 'pop';
            break;
          case 1:
            this.currentTab = 'new';
            break;
          case 2:
            this.currentTab = 'sell';
            break;
        }
      },

      onContentScroll(position) {
        // console.log(position)
        this.isShowFixedTab = -(position.y) > 1000;
        // 是否显示回到顶部
        this.listenShowBackTop(position);
      },

      onLoadMore() {
        this.getHomeGoods(this.currentTab);
      },

      // ----网络请求相关方法-----
      getHomeMultidata() {
        HomeRequest.getHomeMultidata().then(res => {
          if (res.success) {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          }
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        HomeRequest.getHomeGoods(type, page).then(res => {
          if(res.success) {
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page += 1;

            this.$refs.scrollView.finishPullUp();
          }
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding: 44px 0 49px;
    /*position: relative;*/
  }

  .home-nav {
    background-color: var(--color-tint);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
  }
  .home-nav-center {
    font-size: 16px;
    font-weight: bold;
    color: white;
  }

  .home-tab-control {
    /*距离顶部40时产生吸顶效果*/
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .home-content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

</style>
