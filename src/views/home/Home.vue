<template>
  <div id="home">
    <b-scroll class="bscroll" ref="bscroll">
      <!--       头部搜索和轮播图-->
      <div class="home-header_swapper">
        <!--              头部搜索和定位-->
        <home-search/>
      </div>

      <!--         轮播图-->
      <div class="swiper-wapper">
        <swiper :view-list="bannerList"/>
      </div>

      <!-- <van-notice-bar :text="noticeBarText" left-icon="volume-o" class="notice-bar" :scrollable="true"/> -->

      <!--    feature开始-->
      <!-- <feature :feature-img-list="featureImgList"/> -->

      <!--    质量交友开始-->
      <pre-guide class="preguide"/>

      <!--      当地必玩开始-->
      <local-play @goChatPage="goChatPage"/>
    </b-scroll>
  </div>
</template>

<script>

// 导入组件
import HomeSearch from 'views/home/children/HomeSearch'
import Swiper from 'common/swiper/Swiper'
import PreGuide from 'views/home/children/PreGuide'
import LocalPlay from 'views/home/children/LocalPlay'
import BScroll from 'common/bscroll/BScroll'
// 导入防抖
import { debounce } from 'commonjs/utils'

// 导入network
import { getBanner } from 'network/home'

export default {
  name: 'Home',
  components: {
    // HomeItemBar,
    HomeSearch,
    Swiper,
    // Feature,
    PreGuide,
    BScroll,
    LocalPlay
  },
  data: function () {
    return {
      bannerList: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1724329732,2533612603&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=129474270,2801435851&fm=26&gp=0.jpg'],
      featureImgList: [
        {
          image: require('assets/home-feature_icon1.png'),
          title: '线上购票',
          titleFlag: '今日特价限量抢',
          titleStyle: '#ff4a28',
          titleFlagStyle: {
            'background-color': '#ffe4df',
            color: '#ff4a28'
          },
          routerPath: '/nowbuytickets'
        },
        {
          image: require('assets/home-feature_icon2.png'),
          title: '在线寻导',
          titleFlag: '总有一款适合你',
          titleStyle: '#07c7f6',
          titleFlagStyle: {
            'background-color': '#daf7fe',
            color: '#07c7f6'
          },
          routerPath: '/nowfindGuide'
        },
        {
          image: require('assets/home-feature_icon3.png'),
          title: '预约酒店',
          titleFlag: '私享奢华套餐',
          titleStyle: '#ff9400',
          titleFlagStyle: {
            'background-color': '#ffefd9',
            color: '#ff9400'
          },
          routerPath: '/nowbuytickets'
        },
        {
          image: require('assets/home-feature_icon4.png'),
          title: '景区导购',
          titleFlag: '免费送豪礼',
          titleStyle: '#ff4a28',
          titleFlagStyle: {
            'background-color': '#ffe4df',
            color: '#ff4a28'
          },
          routerPath: '/nowbuytickets'
        },
        {
          image: require('assets/home-feature_icon5.png'),
          title: '在线商城',
          titleFlag: '现金红包大放送',
          titleStyle: '#07c7f6',
          titleFlagStyle: {
            'background-color': '#daf7fe',
            color: '#07c7f6'
          },
          routerPath: '/nowbuytickets'
        },
        {
          image: require('assets/home-feature_icon6.png'),
          title: '在线租车',
          titleFlag: '旅途畅游新玩法',
          titleStyle: '#ff9400',
          titleFlagStyle: {
            'background-color': '#ffeee8',
            color: '#ff9400'
          },
          routerPath: '/nowbuytickets'
        }
      ],
      noticeBarText: '欢迎进入寻导网，本网站致力于在线寻找导游，爱旅游的小伙伴赶紧戳下方在线寻导，为你的旅游计划精致一场吧~'
    }
  },
  created () {
    // this.getBannerList()
  },
  methods: {
    goMore () {

    },
    // 获取轮播图
    getBannerList () {
      getBanner().then(r => {
        if (r.status.code === '200') {
          this.bannerList = r.data
        }
      })
    },
    goChatPage (id) {
      if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).user_id) {
        this.$router.push(`/profiledetailshow/${id}`)
      } else {
        this.$router.push('/login')
        return this.$toast({
          type: 'fail',
          message: '请先登录',
          icon: 'cross',
          duration: 1500
        })
      }
    }
  },
  mounted () {
    const refresh = debounce(this.$refs.bscroll.refresh, 300)
    this.$bus.$on('imgLoads', () => {
      refresh()
    })
  },
  deactivated () {
    this.$bus.$off('imgLoads')
  }
}
</script>

<style scoped lang="less">
  #home {
    height: 100vh;
    .preguide{
      margin-top: -1.4rem;
}
  }

  .notice-bar {
    margin-top: -1.4rem;
    margin-bottom: 0.2rem;
    font-size: 0.28rem;
    padding: 0 0.3rem;
    height: 0.8rem;
    line-height: 0.6rem;
  }

  /deep/ .van-notice-bar__wrap {
    height: 0.6rem;
  }

  /deep/ .van-notice-bar__left-icon, .van-notice-bar__right-icon {
    font-size: 0.28rem;
    min-width: 0.4rem;
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
background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }

  .swiper-wapper {
    position: relative;
    left: 50%;
    bottom: 1.5rem;
    transform: translateX(-50%);
    width: 6.8rem;
    border-radius: 0.2rem;
    height: 2.8rem;
    overflow: hidden;
  }

</style>
