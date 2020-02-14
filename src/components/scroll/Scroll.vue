<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type:Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default:false
      }
    },
    mounted() {
      //创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true
      });

      //监听滚动的位置
      if (this.probeType ==2 || this.probeType ==3) {
        this.scroll.on('scroll',position => {
        // console.log(position);
        this.$emit('scroll',position);
      });
      }
      

      //上拉加载更多
      if (this.pullUpLoad == true) {
        this.scroll.on('pullingUp',() => {
        this.$emit('loadMore');
      });
      }
      
    },
    methods: {
      scrollTo(x,y,time = 300) {
        //先判断scroll是否创建 再执行有关函数
        this.scroll && this.scroll.scrollTo(x,y,time);
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll && this.scroll.refresh();
        console.log('----');
        
      }
    }
  }
</script>

<style scoped>

</style>