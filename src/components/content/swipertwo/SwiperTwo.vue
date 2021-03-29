<template>
  <swiper :options="swiperOptions" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item,i) in 6" :key="i">
      <div class="swiper-list_item">
        <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2984445827,844937947&fm=26&gp=0.jpg" alt="">
        <span class="name">
          <span class="name_n">可可</span>
          <span class="name_fl">古灵精怪</span>
        </span>
        <span class="fw">快来戳我聊天吧</span>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
let that
export default {
  name: 'SwiperTwo',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    // 传过来的轮播数据
    viewList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      index: null,
      swiperOptions: {
        // 每张播放时长3秒，自动播放
        autoplay: false,
        // 滑动速度
        freeMode: true,
        freeModeMomentumVelocityRatio: 2,
        observer: true,
        slidesPerView: 'auto',
        on: {
          click (e) {
            that.$emit('singleItemClick', e, this)
          }
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  created () {
    that = this
  },
  methods: {

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
      width: 100%;
    }
    >span.name{
      color: #000;
      font-size: 0.28rem;
      font-weight: 700;
      margin-top: 0.1rem;
      display: flex;
      align-items: center;
      .name_fl{
        margin-left: 0.1rem;
      font-size: 0.16rem;
      padding: 0rem 0.1rem;
      line-height: 0.26rem;
      border-radius: 0.05rem;
      color: #fff;
      font-weight: normal;
      background-color: #ff4a28;
      }
      .name_n{

      }
    }
    span.fw{
      color: #666;
      font-size: 0.24rem;
      margin-top: 0.2rem;
    }
  }

  .swiper-slide {
    width: 2rem;
    height: 3.5rem;
    margin-right: 0.2rem;
    overflow: hidden;
    border-radius: 0.1rem;
    background-color: #fff;
    // border-top: 0.01rem solid #ddd;
    // border-left: 0.01rem solid #ddd;
    // border-right: 0.01rem solid #ddd;
    // border-bottom: 0.04rem solid #ddd;
  }
</style>
