<template>
  <div id="home">
    <b-scroll class="bscroll">
      <!--       头部搜索和轮播图-->
      <div class="home-header_swapper">
        <!--              头部搜索和定位-->
        <home-search/>
      </div>


      <!--         轮播图-->
      <div class="swiper-wapper">
        <swiper :view-list="bannerList"/>
      </div>
      <!--    feature开始-->
      <feature :feature-img-list="featureImgList"/>
      <!--    优选向导开始-->
      <pre-guide class="preguide"/>

      <!--      当地必玩开始-->
      <local-play/>
    </b-scroll>
  </div>
</template>

<script>

  //导入组件
  import HomeSearch from "views/home/children/HomeSearch";
  import Swiper from "common/swiper/Swiper"
  import Feature from "views/home/children/Feature";
  import PreGuide from "views/home/children/PreGuide";
  import LocalPlay from "views/home/children/LocalPlay";
  import BScroll from 'common/bscroll/BScroll'

  //导入network
  import {getBanner} from "network/home";

  export default {
    name: "Home",
    data: function () {
      return {
        bannerList: [],
        featureImgList: [
          {
            image: require('assets/home-feature_icon1.png'),
            title: '线上购票',
            titleFlag: '今日特价限量抢',
            titleStyle: '#ff4a28',
            titleFlagStyle: {
              'background-color': '#ffe4df',
              'color': '#ff4a28'
            }
          },
          {
            image: require('assets/home-feature_icon2.png'),
            title: '预约导游',
            titleFlag: '总有一款适合你',
            titleStyle: '#07c7f6',
            titleFlagStyle: {
              'background-color': '#daf7fe',
              'color': '#07c7f6'
            }
          },
          {
            image: require('assets/home-feature_icon3.png'),
            title: '预约酒店',
            titleFlag: '私享奢华套餐',
            titleStyle: '#ff9400',
            titleFlagStyle: {
              'background-color': '#ffefd9',
              'color': '#ff9400'
            }
          },
          {
            image: require('assets/home-feature_icon4.png'),
            title: '景区导购',
            titleFlag: '免费送豪礼',
            titleStyle: '#ff4a28',
            titleFlagStyle: {
              'background-color': '#ffe4df',
              'color': '#ff4a28'
            }
          },
          {
            image: require('assets/home-feature_icon5.png'),
            title: '在线商城',
            titleFlag: '现金红包大放送',
            titleStyle: '#07c7f6',
            titleFlagStyle: {
              'background-color': '#daf7fe',
              'color': '#07c7f6'
            }
          },
          {
            image: require('assets/home-feature_icon6.png'),
            title: '在线租车',
            titleFlag: '旅途畅游新玩法',
            titleStyle: '#ff9400',
            titleFlagStyle: {
              'background-color': '#ffeee8',
              'color': '#ff9400'
            }
          }
        ]
      }
    },
    created() {
      this.getBannerList()
    },
    methods: {
      // 获取轮播图
      getBannerList() {
        getBanner().then(r => {
          if (r.status.code === '200') {
            this.bannerList = r.data
          }
        })
      }
    },
    components: {
      HomeSearch,
      Swiper,
      Feature,
      PreGuide,
      BScroll,
      LocalPlay
    },
  }
</script>

<style scoped lang="less">
  #home {
    height: 100vh;
  }

  .bscroll {
    position: absolute;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
  }

  .home-header_swapper {
    width: 100%;
    height: 3.2rem;
    position: relative;
    background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }

  .swiper-wapper {
    position: relative;
    left: 50%;
    bottom: 1.5rem;
    transform: translateX(-50%);
    width: 6.8rem;
    height: 2.8rem;
    border-radius: 0.2rem;
    overflow: hidden;
  }

  .preguide {
    margin-top: -1.3rem;
  }
</style>