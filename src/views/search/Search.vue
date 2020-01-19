<template>
     <div id="search">
         我是search
     </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "Search",
    methods:{
      ...mapMutations(['changeTabBarShow'])
    },
    destroyed() {
      this.changeTabBarShow(true)
    },
    created() {
      this.changeTabBarShow(false)
    }
  }
</script>

<style scoped lang="less">

</style>