import {debounce} from "./utils";
import { BACKTOP_DISTANCE, POP, NEW, SELL } from "./const";

export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    /*在图片加载完成后刷新scroll滚动,让scroll重新计算页面大小，才能在滚动完整显示页面*/
    this.itemImgListener = () => {
      this.refresh();
    };
    this.refresh = debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on('itemImageLoad', this.itemImgListener);
  }
};

export const BackTopMiXin = {
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    backTopClick () {
      this.$refs.scroll.scrollTo(0, 0 , 500)
    },
    listenerShowBackTop(position) {
      /*判断是否显示返回顶部*/
      this.isShowBackTop = Math.abs(position.y) > BACKTOP_DISTANCE
    }
  }
};

export const TabControlMiXin = {
  data() {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break;
      }
    }
  }
}
