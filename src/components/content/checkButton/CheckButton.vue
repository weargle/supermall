<template>
  <div class="check-button" :class="{ check: isCheck }">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isCheck: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #a3a3a5;
  }

  .check {
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>
