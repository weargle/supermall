<template>
  <scroll class="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(item, index) in menuList"
           :key="index"
           :class="{active: index == currentIndex}"
           @click="itemClick(index)">{{item.title}}</div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "TabMenu",
    props: {
      menuList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Scroll
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('selectItem', index);
      }
    }
  }
</script>

<style scoped>
  .tab-menu {
    height: 100%;
    background-color: #f6f6f6;
    width: 100px;
  }

  .menu-list {
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
  }

  .menu-list-item.active {
    background-color: #ffffff;
    font-weight: 700;
    color: var(--color-high-text);
    border-left: 3px solid var(--color-high-text);
  }
</style>
