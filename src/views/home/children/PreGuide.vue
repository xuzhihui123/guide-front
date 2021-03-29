<template>
        <div id="preguide">
<!--          //头部-->
          <home-item-bar @goPreGuideMore="goMore">
            <div slot="left">优质社交</div>
          </home-item-bar>
<!--          swiper展示-->
          <div class="pre-guide_swiper" >
              <swiper-two @singleItemClick="singleItemClick"/>
          </div>
        </div>
</template>

<script>
import HomeItemBar from 'content/homeitembar/HomeItemBar'
import SwiperTwo from 'content/swipertwo/SwiperTwo'
export default {
  name: 'PreGuide',
  components: {
    HomeItemBar,
    SwiperTwo
  },
  methods: {
    goMore () {
      console.log('111')
    },
    singleItemClick (clickEvent, swiperEvent) {
      console.log(swiperEvent)
    }

  }
}
</script>

<style scoped lang="less">
.pre-guide_swiper{
 padding: 0.2rem;
}
</style>
