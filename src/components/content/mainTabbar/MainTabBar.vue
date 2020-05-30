<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="#d81e06">
      <img slot="item-icon" src="~assets/img/tabbar/buy_line.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/buy_face.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/class_line.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/class_face.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/buycar_line.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/buycar_face.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile_line.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_face.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/Tabbar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>