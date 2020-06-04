<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button {
    border: 1px solid var(--color-high-text);
    border-radius: 50%;
  }
  .check-button img {
    padding: 2px;
    height: 16px;
    width: 16px;
  }

  .check {
    background-color: var(--color-high-text);
  }
</style>