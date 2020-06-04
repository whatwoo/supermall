<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
            :is-checked="isSelectAll" 
            class="check-button"
            @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),

    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((pre, item) => {
        return pre + item.price * item.count
      }, 0)
    },

    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },

    isSelectAll() {
      if (this.cartList.length === 0) return false
      // return !(this.cartList.filter(item => !item.checked).length)
      return !(this.cartList.find(item => !item.checked))
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    
    calcClick() {
      if (!this.checkLength) {
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 40px;
    position: relative;
    line-height: 40px;
    box-shadow: 0 1px 4px #FF5777;
  }

  .check-content {
    align-items: center;
    display: flex;
    margin-left: 10px;
    width: 60px;
    font-size: 14px;
  }

  .check-button {
    height: 17px;
    width: 17px;
    line-height: 17px;
    margin-right: 5px;
  }

  .price {
    margin-left: 50px;
    color: #FF500F;
    flex: 1;
  }

  .calculate {
    width: 100px;
    background-color: #FF5777;
    text-align: center;
    color: #fff;
  }
</style>