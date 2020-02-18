<template>
  <div id="detail">
    <detail-bar class="detail-bar"/>
    <scroll class="content"> 
      <detail-swiper :top-images="topImages"/> 
      <detail-base-info :goods="goods"/>
      <detail-shop-info/>
    </scroll>
    
  </div>
</template>

<script>

  import DetailBar from "./childComps/DetailBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import Scroll from "components/scroll/Scroll"

  import {getDetailMessage,Goods} from 'network/detail'

  export default {
    name: "Detail",
    components: {
      DetailBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll
    },
    data() {
      return {
        iid:null,
        topImages: [],
        goods: {}
      }
    },
    created() {
      //得到商品的iid
      this.iid = this.$route.params.id
      
      //根据商品的iid得到详细商品的数据
      getDetailMessage(this.iid) .then(res => {
        // console.log(res);
        const data = res.data.result

        //获取轮播图信息
        this.topImages = data.itemInfo.topImages

        //获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        
      })
    }
  }
</script>

<style scoped>

  .detail-bar {
    position: relative;
  }

  .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 10;
    background-color: #fff;
  }

</style>