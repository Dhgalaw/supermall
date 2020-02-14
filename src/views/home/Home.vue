<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
            :pullUpLoad="true"
            @scroll="scrollContent"
            @loadMore="loadMore"
            >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-views/>
      <tab-control :titles="['流行','最新','热门']"
                  @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>


      <!-- <div>
        <li>网络1</li>
        <li>网络2</li>
        <li>网络3</li>
        <li>网络4</li>
        <li>网络5</li>
        <li>网络6</li>
        <li>网络7</li>
        <li>网络8</li>
        <li>网络9</li>
        <li>网络10</li>
        <li>网络11</li>
        <li>网络12</li>
        <li>网络13</li>
        <li>网络14</li>
        <li>网络15</li>
        <li>网络16</li>
        <li>网络17</li>
        <li>网络18</li>
        <li>网络19</li>
        <li>网络20</li>
        <li>网络21</li>
        <li>网络22</li>
        <li>网络23</li>
        <li>网络24</li>
        <li>网络25</li>
        <li>网络26</li>
        <li>网络27</li>
        <li>网络28</li>
        <li>网络29</li>
        <li>网络30</li>
        <li>网络31</li>
        <li>网络32</li>
        <li>网络33</li>
        <li>网络34</li>
        <li>网络35</li>
        <li>网络36</li>
        <li>网络37</li>
        <li>网络38</li>
        <li>网络39</li>
        <li>网络40</li>
        <li>网络41</li>
        <li>网络42</li>
        <li>网络43</li>
        <li>网络44</li>
        <li>网络45</li>
        <li>网络46</li>
        <li>网络47</li>
        <li>网络48</li>
        <li>网络49</li>
        <li>网络50</li>
        <li>网络51</li>
        <li>网络52</li>
        <li>网络53</li>
        <li>网络54</li>
        <li>网络55</li>
        <li>网络56</li>
        <li>网络57</li>
        <li>网络58</li>
        <li>网络59</li>
        <li>网络60</li>
        <li>网络61</li>
        <li>网络62</li>
        <li>网络63</li>
        <li>网络64</li>
        <li>网络65</li>
        <li>网络66</li>
        <li>网络67</li>
        <li>网络68</li>
        <li>网络69</li>
        <li>网络70</li>
        <li>网络71</li>
        <li>网络72</li>
        <li>网络73</li>
        <li>网络74</li>
        <li>网络75</li>
        <li>网络76</li>
        <li>网络77</li>
        <li>网络78</li>
        <li>网络79</li>
        <li>网络80</li>
        <li>网络81</li>
        <li>网络82</li>
        <li>网络83</li>
        <li>网络84</li>
        <li>网络85</li>
        <li>网络86</li>
        <li>网络87</li>
        <li>网络88</li>
        <li>网络89</li>
        <li>网络90</li>
        <li>网络91</li>
        <li>网络92</li>
        <li>网络93</li>
        <li>网络94</li>
        <li>网络95</li>
        <li>网络96</li>
        <li>网络97</li>
        <li>网络98</li>
        <li>网络99</li>
        <li>网络100</li>
      </div> -->
    </scroll>

    <!-- 监听组件的点击需要加上native -->
    <back-top @click.native="backClick"               
              v-show="isShowBackTop" />
    

    

  </div>
</template>

<script>

  import HomeSwiper from "./childhome/HomeSwiper";
  import RecommendView from "./childhome/RecommendView";
  import FeatureViews from "./childhome/FeatureViews";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "network/home";


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureViews,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list:[] },
          'new': {page: 0, list:[] },
          'sell': {page: 0, list:[] }
        },
        currentType: 'pop',
        isShowBackTop:false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求多个数据
      this.getHomeMultidata()

      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      
      
    },
    mounted() {
      //监听item中图片加载完成 使用事件总线
      const refresh = this.debounce(this.$refs.scroll.refresh(),500)
      this.$bus.$on('itemImageLoad',() => {
        refresh()
      });
    },
    methods: {

      //事件监听相关的方法
      debounce(func,delay) {
        let timer = null
        return function(...args) {
          if(timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this,args)
          },delay)
        }
      },
      tabClick(index) {
        // console.log(index);
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0,300);
      },
      scrollContent(position) {
        // console.log(position);
        if (position.y < -3000) {
          this.isShowBackTop = true;
        }
      },
      loadMore() {
        console.log("加载更多");
        this.getHomeGoods(this.currentType);
        
      },

      //网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        let page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page +=1
          this.$refs.scroll.finishPullUp();

        })
        
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh; /*100%视口*/
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    

  }
</style>
