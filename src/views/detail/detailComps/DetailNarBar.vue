<template>
  <div>
    <nar-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" class="back">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in title" class="title-item"
             :key="index"
             :class="{active: index == currentIndex}"
             @click="titleClick(index)">{{item}}</div>
      </div>
    </nar-bar>
  </div>
</template>

<script>
  import NarBar from "components/common/narbar/NarBar";

  export default {
    name: "DetailNabBar",
    components: {
      NarBar
    },
    data () {
      return {
        title: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick (index) {
        this.currentIndex = index;
        this.$emit('titleClick', index);
      },
      backClick () {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
    /*transform: scale(10, 10);*/
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back {
    vertical-align: middle;
    /*margin-top: 12px;*/
  }
</style>
