<template>
  <div id="detail">
    <DetailBar/>
  </div>
</template>

<script>

  import DetailBar from "./childComps/DetailBar"

  export default {
    name: "Detail",
    components: {
      DetailBar
    },
    data() {
      return {
        iid:null
      }
    },
    created() {
      this.iid = this.$route.params.id
      console.log(this.iid);
      
    }
  }
</script>

<style scoped>

</style>