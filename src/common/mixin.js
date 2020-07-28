import {debounce} from './utils';
import BackTop from 'components/common/backTop/BackTop';

export const itemListenerMixin = {
  data() {
    return {
      itemListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scrollView.refresh, 100);
    this.itemListener = () => {
      refresh();
    }
    this.$bus.$on('itemImageLoad', this.itemListener);
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    onClickBackTop() {
      this.$refs.scrollView.scrollTo(0, 0);
    },

    listenShowBackTop(position) {
      this.isShowBackTop = -(position.y) > 1000;
    }
  }
}
