<template>
  <div class="detail">
    <detail-nar-bar class="nar-bar" @titleClick="titleClick" ref="nar"/>
    <scroll class="content" ref="scroll" :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"
                         @detailImageLoad="detailImageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top v-show="isShowBackTop" @click.native="backTopClick"/>
  </div>
</template>

<script>
  import DetailNarBar from "./detailComps/DetailNarBar";
  import DetailSwiper from "./detailComps/DetailSwiper";
  import DetailBaseInfo from "./detailComps/DetailBaseInfo";
  import DetailShopInfo from "./detailComps/DetailShopInfo";
  import DetailGoodsInfo from "./detailComps/DetailGoodsInfo";
  import DetailParamInfo from "./detailComps/DetailParamInfo";
  import DetailCommentInfo from "./detailComps/DetailCommentInfo";
  import DetailRecommendInfo from "./detailComps/DetailRecommendInfo";
  import DetailBottomBar from "./detailComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getDetail, Goods, Shop, GoodsParam} from "network/detail";
  import {getRecommend} from "network/detail";

  import {itemListenerMixin, BackTopMiXin} from "common/mixin";
  import {debounce} from "common/utils";

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNarBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar,
      BackTop
    },
    mixins: [itemListenerMixin, BackTopMiXin],
    data () {
      return {
        id: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        themeTopYs: [],
        getThemeTopYs: null,
        currentIndex: 0,
        isShowBackTop: false
      }
    },
    created() {
      this.id = this.$route.query.id

      getDetail(this.id).then(res => {
        const data = res.result;
        //获取轮播图
        this.topImages = data.itemInfo.topImages;
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        //创建店铺信息对象
        this.shop = new Shop(data.shopInfo);
        //保存商品的详情
        this.detailInfo = data.detailInfo;
        //获取商品参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //获取用户评价
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }
        //在数据更新完后延迟回调
        //图片加载没完计算出来的坐标不对
        /*this.$nextTick(() => {
          this.themeTopYs = [];

          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        })*/
      });
      getRecommend().then(res => {
        //获取推荐信息
        this.recommendList = res.data.list;
      })
    },
    mounted() {
      this.getThemeTopYs = debounce(() => {
        this.themeTopYs = [];

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Infinity);
      }, 200);
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener);
    },
    methods: {
      ...mapActions(['addCart']),

      detailImageLoad() {
        this.getThemeTopYs();
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
      },
      contentScroll(position) {
        const positionY = -position.y;
        const length = this.themeTopYs.length;
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex != i && (this.themeTopYs[i] <= positionY
            && this.themeTopYs[i + 1] > positionY)) {
            this.currentIndex = i;
            this.$refs.nar.currentIndex = i;
          }
        }
        this.listenerShowBackTop(position);
      },
      addToCart() {
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.id;

        this.addCart(product).then(res => {
          this.$toast.show(res, 2000);
        });
      }
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }

  .nar-bar {
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    background: #ffffff;
  }
</style>
