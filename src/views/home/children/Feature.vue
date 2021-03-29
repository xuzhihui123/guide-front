<template>
        <div id="feature">
              <div class="feature-inner_listItem" v-for="(item,i) in featureImgList" :key="i" @click="goRouter(item.routerPath)">
                <span :style="{'color':item.titleStyle}" class="title">{{item.title}}</span>
                <span class="title-flag" :style="item.titleFlagStyle">{{item.titleFlag}}</span>
                <img :src="item.image" alt="">
              </div>
        </div>
</template>

<script>
export default {
  name: 'Feature',
  props: {
    featureImgList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    goRouter (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped lang="less">
#feature{
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  >div{
    width: 33.3%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.25rem 0;
    flex-direction: column;
    height: 2.4rem;
    border: 0.01rem solid #eee;
    border-top: 0;
    img{
      width: 0.85rem;
      height: 0.85rem;
    }
    span.title{
      font-size: 0.26rem;
      font-weight: 700;
    }
    span.title-flag{
      padding: 0 0.25rem;
      font-size: 0.18rem;
      height: 0.3rem;
      border-radius: 0.3rem;
      line-height: 0.3rem;
      background-color: red;
    }

  }
}
</style>
