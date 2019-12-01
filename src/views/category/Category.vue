<template>
  <div class="category">
    <nar-bar class="nar-bar">
      <div slot="center">商品分类</div>
    </nar-bar>
    <div class="content">
      <tab-menu :menu-list="menuList"
                @selectItem="selectItem" class="tab-menu"/>
      <scroll class="tab-content" ref="scroll">
        <tab-content-category :sub-categories="showSubcategory"/>
        <tab-control :titles="titles" @tabClick="tabClick"/>
        <tab-content-detail :category-detail="showCategoryDetail"/>
      </scroll>
    </div>
  </div>
</template>

<script>
  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";
  import TabContentDetail from "./childComps/TabContentDetail";

  import NarBar from "components/common/narbar/NarBar";
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/TabControl/TabControl";

  import { POP, SELL, NEW } from "common/const";
  import { TabControlMiXin, itemListenerMixin } from "common/mixin";

  import {
    getCategory,
    getSubcategory,
    getCategoryDetail
  } from "network/Category";

  export default {
    name: "Category",
    components: {
      TabContentCategory,
      NarBar,
      Scroll,
      TabMenu,
      TabControl,
      TabContentDetail
    },
    mixins: [TabControlMiXin, itemListenerMixin],
    data() {
      return {
        menuList: [],
        categoryData: [],
        currentIndex: -1,
        titles: ['综合', '新品', '销量'],
        scrollY: 0
      }
    },
    created() {
      getCategory().then(res => {
        this.menuList = res.data.category.list;
        for (let i = 0; i < res.data.category.list.length; i++) {
          this.categoryData[i] = {
            subCategories: {},
            categoryDetail: {
              "pop": [],
              'new': [],
              'sell': []
            }
          };
        }
        this.getSubCategories(0);
      });
    },
    activated () {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.scrollY, 0);
    },
    deactivated() {
      this.scrollY = this.$refs.scroll.getScrollY();
      this.$bus.$off('itemImageLoad', this.itemImgListener);
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex == -1 || !this.categoryData[this.currentIndex]) {
          return {};
        }
        return this.categoryData[this.currentIndex].subCategories;
      },
      showCategoryDetail() {
        if (this.currentIndex == -1) {
          return [];
        }
        return this.categoryData[this.currentIndex]
          .categoryDetail[this.currentType];
      }
    },
    methods: {
      getSubCategories(index) {
        this.currentIndex = index;
        const maitKey = this.menuList[index].maitKey;
        getSubcategory(maitKey).then(res => {
          this.categoryData[index].subCategories = res.data;
          this.categoryData = {...this.categoryData};
          this.getCategoryDetail(POP);
          this.getCategoryDetail(NEW);
          this.getCategoryDetail(SELL);
        })
      },
      getCategoryDetail(type) {
        const miniWallkey = this.menuList[this.currentIndex].miniWallkey;
        getCategoryDetail(miniWallkey, type).then(res => {
          this.categoryData[this.currentIndex].categoryDetail[type] = res;
          this.categoryData = {...this.categoryData};
        })
      },
      selectItem(index) {
        this.getSubCategories(index);
      }
    }
  }
</script>

<style scoped>
  .category {
    position: relative;
    height: 100vh;
  }

  .nar-bar {
    background-color: var(--color-tint);
    color: #ffffff;
    font-weight: 700;
  }

  .content {
    position: absolute;
    display: flex;
    overflow: hidden;

    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }

  .tab-menu {
  }

  .tab-content {
    flex: 1;
  }
</style>
