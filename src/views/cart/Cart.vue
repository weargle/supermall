<template>
  <div class="cart">
    <nar-bar class="nar-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nar-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar class="bottom-bar"/>
  </div>
</template>

<script>
  import NarBar from "components/common/narbar/NarBar";
  import Scroll from "components/common/scroll/Scroll";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NarBar,
      Scroll,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
    position: relative;
  }

  .nar-bar {
    background-color: var(--color-tint);
    color: #ffffff;
  }

  .content {
    overflow: hidden;

    position: absolute;
    bottom: 89px;
    top: 44px;
    left: 0;
    right: 0;
  }

  .bottom-bar {
    position: absolute;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
