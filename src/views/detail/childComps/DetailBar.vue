<template>
  <div id="detailBar">
    <nav-bar>
      <div slot="left" class="back" @click="goBack">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div  v-for="(item,index) in titles"
              class="title-item"
              :class="{active : index == currentIndex}"
              
              >
          <span @click="indexChange(index)">{{item}}</span>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar"

  export default {
    name: "DetailBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      indexChange(index) {
        this.currentIndex = index
      },
      goBack() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>

  .back img {
    margin-top: 10px;
  }

  .title {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .title-item {
    flex: 1
  }
  .active {
    color: var(--color-high-text)
  }
</style>