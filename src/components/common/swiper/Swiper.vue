<template>
  <swiper :options="swiperOption" ref="mySwiper" v-if="viewList.length>0" >
    <!-- slides -->
    <swiper-slide v-for="(item,index) in viewList" :key="index" :style="{'background-image':'url('+item+')'}">
<!--      <img :src="item.image" alt/>-->
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

let vm = null
export default {
  name: 'Swiper',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      index: null,
      swiperOption: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
          // type: 'fraction',
          // type : 'progressbar',
          // type : 'custom',
        },
        observer: true,
        // 每张播放时长3秒，自动播放
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        // 滑动速度
        speed: 1000,
        // delay:1000
        on: {
          // 切换到下一张的事件
          slideChange () {
            vm.index = this.activeIndex
          }
        }
      }
    }
  },
  methods: {

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
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  created () {
    vm = this
  }
}
</script>
<style lang='less' scoped>
img {
  width: 100%;
}
.swiper-slide{
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 2.8rem;
}
.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
  bottom: 5px;
}
/deep/.swiper-pagination-bullet{
  width: 0.2rem;
  height: 0.2rem;
  background: #fff;
  opacity: 1;
}
  /deep/.swiper-pagination-bullet-active{
    background: var(--main-color);
    opacity: 1;
  }
</style>
<style>
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet{
    margin: 0 0.15rem;
  }
</style>
