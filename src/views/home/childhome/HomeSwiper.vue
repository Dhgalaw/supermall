<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"

  export default {
    name: "homeswiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad:false
      }
    },
    methods: {
      imageLoad() {
        if(this.isLoad == false) {
          this.$emit('isLoad')
          
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
