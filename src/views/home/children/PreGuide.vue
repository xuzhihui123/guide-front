<template>
        <div id="preguide">
<!--          //头部-->
          <home-item-bar @goPreGuideMore="goMore">
            <div slot="left">优选向导</div>
          </home-item-bar>
<!--          swiper展示-->
          <div class="pre-guide_swiper">
              <swiper-two/>
          </div>
        </div>
</template>

<script>
  import HomeItemBar from "content/homeitembar/HomeItemBar";
  import SwiperTwo from "content/swipertwo/SwiperTwo";
  export default {
    name: "PreGuide",
    components:{
      HomeItemBar,
      SwiperTwo
    },
    methods:{
      goMore(){
        console.log('111');
      }
    }
  }
</script>

<style scoped lang="less">
.pre-guide_swiper{
 padding: 0.2rem;
}
</style>