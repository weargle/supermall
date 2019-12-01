<template>
  <div class="bottom-bar">
    <div class="check-context">
      <check-button class="check-button"
                    :is-check="isSelectAll"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      总计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{calculate}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import { mapGetters } from 'vuex';

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList', 'cartLength']),
      totalPrice() {
        console.log(this.cartList);
        return '￥' + this.cartList.filter(item => item.checked)
          .reduce((preValue, item) => {
            console.log(item);
            return preValue + item.price * item.count;
          }, 0).toFixed(2);
      },
      calculate() {
        return this.cartList.filter(item => item.checked).length;
      },
      isSelectAll() {
        if (this.cartLength == 0) {
          return false
        }
        return this.cartList.every(item => item.checked);
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false);
        } else {
          this.cartList.forEach(item => item.checked = true);
        }
      },
      calcClick() {
        if (this.cartLength == 0) {
          this.$toast.show('请添加商品', 2000);
        } else if (!this.isSelectAll) {
          this.$toast.show('请选择购买的商品', 2000);
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eeeeee;
  }

  .check-context {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    text-align: center;
    width: 90px;
    background-color: red;
  }
</style>
