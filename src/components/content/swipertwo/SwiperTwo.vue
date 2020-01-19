<template>
  <swiper :options="swiperOptions" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item,i) in 6" :key="i">
      <div class="swiper-list_item">
        <img src="~assets/pre-guide.jpg" alt="">
        <span class="name">周划水</span>
        <span class="fw">1888次服务</span>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
  import "swiper/dist/css/swiper.css";
  import {swiper, swiperSlide} from "vue-awesome-swiper";

  export default {
    name: "SwiperTwo",
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        index: null,
        swiperOptions: {
          //每张播放时长3秒，自动播放
          autoplay: false,
          //滑动速度
          freeMode: true,
          freeModeMomentumVelocityRatio: 2,
          observer: true,
          slidesPerView: 'auto',
        },
      };
    },
    methods: {},
    props: {
      //传过来的轮播数据
      viewList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    created() {
    }
  }
</script>

<style scoped lang="less">
  .swiper-list_item {
    width: 100%;
    height: 100%;
    font-size: 0.28rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 2rem;
      height: 2rem;
    }
    span.name{
      color: #000;
      font-size: 0.28rem;
      font-weight: 700;
      margin-top: 0.1rem;
    }
    span.fw{
      color: #666;
      font-size: 0.24rem;
      margin-top: 0.1rem;
    }
  }

  .swiper-slide {
    width: 2rem;
    height: 3rem;
    border-radius: 0.1rem;
    margin-right: 0.2rem;
    overflow: hidden;
    border-top: 0.01rem solid #ddd;
    border-left: 0.01rem solid #ddd;
    border-right: 0.01rem solid #ddd;
    border-bottom: 0.04rem solid #ddd;
  }
</style>