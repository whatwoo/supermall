<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control v-show="isTabFixed" class="tab-control" ref="tabControl1" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>


  <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore"> 
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>

  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

</div>
</template>

<script>
import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    
  },
  mounted() {

  },
  mixins: [itemListenerMixin, backTopMixin],

  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y

    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    //事件监听

    tabClick(index) {
      switch(index) {
        case 0: this.currentType = 'pop'; break;
        case 1: this.currentType = 'new'; break;
        case 2: this.currentType = 'sell'; break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    
    

    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }

}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    /* padding-bottom: 49px; */
    position: relative;
    height: 100vh;
  }

  .home-nav {
    background-color: #FF5777;
    color: #fff;
    z-index: 5;
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0; */
  }

  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 5;
  } */

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>