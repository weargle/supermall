<template>
  <div id="home">
    <nar-bar class="home-bar">
      <div slot="center">购物街</div>
    </nar-bar>
    <tab-control :titles="titles" class="tab-control"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control :titles="titles"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NarBar from "components/common/narbar/NarBar";
  import TabControl from "components/content/TabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import { getHomeMultidata, getHomeGoods } from "network/home";

  import {itemListenerMixin, BackTopMiXin} from "common/mixin";

  export default {
    name: "Home",
    components: {
      NarBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins: [itemListenerMixin, BackTopMiXin],
    data () {
      return {
        banners: [],
        recommends: [],
        titles: ['流行', '新款', '精选'],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        scrollY: 0
      }
    },
    created() {
      this.getHomeMultidata();

      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted () {
    },
    activated () {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.scrollY, 0);
    },
    deactivated () {
      this.scrollY = this.$refs.scroll.getScrollY();
      this.$bus.$off('itemImageLoad', this.itemImgListener);
    },
    methods: {
      /*点击事件的方法*/
      tabClick (index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll (position) {
        /*判断是否显示返回顶部*/
        this.listenerShowBackTop(position);

        /*决定tabControl是否吸顶*/
        this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
      },
      loadMore () {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      swiperImageLoad () {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /*网络请求的方法*/
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods (type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page ++
        })
      }
    },
    computed: {
      showGoods () {
        return this.goods[this.currentType].list
      }
    }
  }
</script>

<style scoped>
  #home {
    /*margin-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-bar {
    background-color: var(--color-tint);
    color: #ffffff;

    /*position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;*/
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {
    height: calc(100vh - 93px);
    overflow: hidden;
    margin-top: 44px;
  }*/
</style>
