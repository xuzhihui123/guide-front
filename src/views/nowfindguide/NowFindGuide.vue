<template>
  <div class="now-find_guide">
    <!--          top-->
    <div class="now-find_guide-top">
      <div class="bgBack" :style="{'background-image':'url('+require('assets/arrow-left-white.svg')+')'}"
           @click="goBack">

      </div>
      <div class="center">
        <div class="left-form">
          <!--            位置-->
          <div class="location">
            <img src="~assets/location-icon.svg" alt="">
            <input type="text" placeholder="您的位置" v-model="address" @click="getAddressInfo" readonly>
          </div>
          <!--          目的地-->
          <div class="mdd">
            <img src="~assets/daohang-icon.svg" alt="">
            <input type="text" v-model="destinationText" placeholder="请输入您的目的地">
          </div>
        </div>
        <div class="right-submit" @click="submitGetGuide">
          确定
        </div>
      </div>
    </div>

    <!--    获取到的导游列表-->
    <div class="guide-list" v-show="isShowGuideList">
      <div class="guide-item" v-for="(item,i) in guideList" :key="i">
        <div class="guide-item_left">
          <img :src="item.guideModel.guide_avatar" alt="">
          <div class="content">
            <p>姓名：<span>{{item.guideModel.guide_trueName}}</span></p>
            <p>点赞数：<span>{{item.guideModel.guide_like}}</span></p>
          </div>
          <div class="guide-item_left_flag">
            <span>当前在线</span>
            <img src="~assets/true-icon.svg" alt="">
          </div>
        </div>
        <div class="guide-item_right" @click="selectSingleGuide(item.guideModel.guide_id)">
          选择他
        </div>
      </div>
    </div>

    <baidu-map :center="add" :zoom="zoomMap" class="baiduMap" @click="clickMap" v-show="isShowMap" ref="Mymap"
               ak="vgrSAB4UtprjZHvfPP9yxpLfR73IqysG">
      <bm-local-search :keyword="destinationText" :auto-viewport="true" :location="add" @markersset="markerssets"
                       :panel="false"></bm-local-search>
    </baidu-map>

    <!--    搜索到的地区的显示-->
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in"
                :duretion="{enter:200,leave:200}">
      <div class="show-address_div" v-show="isShowAddressDiv">
        <b-scroll class="wrapper" ref="bscroll">
          <div class="show-address_div_content">
            <div class="show-address_div_item" v-for="(item,i) in DesaddrList" :key="i"
                 @click="changeInputDestin(item)">
              <img src="~assets/find-guide-location-icon.svg" alt="">
              <div class="right">
                <span class="title">{{item.title}}</span>
                <span class="address">{{item.address}}</span>
              </div>
            </div>
          </div>
        </b-scroll>
      </div>
    </transition>

    <!--     没获取到导游列表显示-->
    <div class="cry-error" v-show="!isShowGuideList">
      <img src="~assets/main-logo.png" alt="">
      <span>暂未获取到匹配的在线导游哦~</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

// 导入network
import { getAddress, getOnlineGuide, selectGuideAndCreateOrder } from 'network/order'

import BScroll from 'common/bscroll/BScroll'

export default {
  name: 'NowFindGuide',
  data () {
    return {
      destinationText: '',
      postDestinationText: '',
      postDetailText: '',
      address: '',
      isShowMap: false,
      isShowAddressDiv: false,
      isShowGuideList: false,
      add: '',
      zoomMap: 14,
      DesaddrList: [],
      guideList: [],
      userId: null,
      socket: null
    }
  },
  methods: {
    ...mapMutations(['changeTabBarShow']),
    goBack () {
      this.$router.go(-1)
    },

    // 调用地址赋值
    getAddressInfo () {
      this.$dialog.confirm({
        title: '获取您的定位信息'
      }).then(async () => {
        const d = await getAddress()
        this.address = d.province + ',' + d.city
        this.add = d.city
      }).catch(() => {
        this.address = '获取位置失败'
        this.add = ''
      })
    },

    // 获取在线导游
    submitGetGuide () {
      const d = JSON.parse(localStorage.getItem('userInfo') || '{}')
      if (d.is_guide) {
        return this.$toast({
          type: 'fail',
          message: '您是导游哦！',
          icon: 'cross',
          duration: 1500
        })
      }
      if (this.address === '获取位置失败') {
        return this.$toast({
          type: 'fail',
          message: '请先获取位置信息！',
          icon: 'cross',
          duration: 1500
        })
      }
      if (!d.user_name) {
        this.$toast({
          type: 'fail',
          message: '请先登录！',
          icon: 'cross',
          duration: 1500
        })
        this.$router.push('/login')
      } else {
        // 如果没有输入目的地
        if (!this.destinationText) {
          return this.$toast({
            type: 'fail',
            message: '请输入目的地！',
            icon: 'cross',
            duration: 1500
          })
        } else {
          getOnlineGuide({
            orderDst: '连江县'
          }).then(r => {
            if (r.status.code === '200') {
              // 如果获取到了  不显示目的地列表
              this.isShowAddressDiv = false
              // 显示导游列表
              this.isShowGuideList = true
              this.guideList = r.data
            } else if (r.status.code === '500') {
              this.guideList = []
              this.isShowAddressDiv = false
              return this.$toast({
                type: 'fail',
                message: '该地区暂无人接单！',
                duration: 1500
              })
            } else {
              this.isShowAddressDiv = false
              return this.$toast({
                type: 'fail',
                message: '服务器错误！',
                duration: 1500
              })
            }
          })
        }
      }
    },

    clickMap ({ target }) {
      console.log(target)
    },

    // 目的地改变 生成的检索数组
    markerssets (d) {
      if (!this.destinationText) {
        this.isShowAddressDiv = false
      }

      this.DesaddrList = d
    },

    // 选中选择的目的地
    changeInputDestin (item) {
      this.destinationText = item.title
      if (item.city) {
        this.postDestinationText = item.city
        this.postDetailText = item.province + ',' + item.city + ',' + item.address + ',' + item.title
      } else {
        this.postDestinationText = item.address
        this.postDetailText = item.address + ',' + item.title
      }
    },

    // 获取用户id
    getUserId () {
      const d = JSON.parse(localStorage.getItem('userInfo') || '{}').user_id
      if (d) {
        this.userId = d
      }
    },

    // 选择导游
    selectSingleGuide (guide_id) {
      this.$dialog.confirm({
        title: '确认选择导游'
      }).then(() => {
        selectGuideAndCreateOrder({
          guide_id,
          user_id: this.userId,
          orderDst: '连江县',
          orderPrice: '面议',
          detailedLocation: this.postDetailText
        }).then(r => {
          if (!r.status) {
            return this.$toast({
              type: 'fail',
              message: '您已有一个订单待操作！',
              icon: 'cross',
              duration: 1500
            })
          }
          if (r.status.code === '200') {
            this.$toast({
              message: '选择成功！'
            })
            this.$store.commit('changeOrderObj', r.data)
            // 保存信息到localstorage 持久储存
            localStorage.setItem('orders', JSON.stringify(r.data))
            this.$router.push('/orders')
          }
        })
      }).catch(() => {
        this.$toast({
          type: 'info',
          message: '已取消'
        })
      })
    }

  },

  destroyed () {
    this.changeTabBarShow(true)
  },
  created () {
    this.changeTabBarShow(false)
    this.getAddressInfo()
    // 获取用户id
    this.getUserId()
  },
  components: {
    BScroll
  },
  watch: {
    // 监听目的地text信息为空的话清空 地址列表
    destinationText (newValue) {
      // 如果没有就隐藏 地址列表
      if (!newValue) {
        this.isShowAddressDiv = false
        this.DesaddrList = []
      } else {
        this.isShowAddressDiv = true
      }
    },
    DesaddrList (newValue) {
      if (newValue) {
        this.$refs.bscroll.refresh()
      }
    }
  }

}
</script>

<style scoped lang="less">
  .now-find_guide {
    .show-address_div {
      position: absolute;
      width: 90%;
      height: 8rem;
      background-color: #fff;
      top: 3.5rem;
      left: 50%;
      transform: translateX(-50%);
      border: 0.01rem solid #eee;
      padding: 0.2rem 0;
      overflow: hidden;

      .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }

      .show-address_div_content {
        display: flex;
        flex-direction: column;

        .show-address_div_item {
          padding: 0.2rem;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          border-bottom: 0.01rem solid #eee;

          img {
            width: 0.3rem;
            height: 0.3rem;
          }

          > .right {
            flex: 1;
            margin-left: 0.2rem;
            display: flex;
            flex-direction: column;

            > span.title {
              font-size: 0.3rem;
              color: #444;
            }

            > span.address {
              font-size: 0.28rem;
              color: #999;
            }
          }
        }
      }
    }

    .now-find_guide-top {
      position: relative;
      width: 100%;
      height: 4.5rem;
      background-image: linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%);
      display: flex;
      align-items: center;
      justify-content: center;

      .bgBack {
        top: 0.2rem;
        left: 0.2rem;
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        background-repeat: no-repeat;
        background-size: 0.5rem 0.5rem;
        background-position: center center;
      }

      .center {
        margin-top: 0.2rem;
        width: 90%;
        height: 2.5rem;
        padding: 0 0.2rem;
        background-color: #fff;
        box-shadow: 3px 2px 13px 4px rgba(0, 0, 0, .1);
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;
        justify-content: space-between;

        .right-submit {
          width: 1rem;
          height: 1rem;
          background-color: #1cb2f5;
          color: #fff;
          border-radius: 50%;
          font-size: 0.3rem;
          line-height: 1rem;
          text-align: center;
          box-shadow: 3px 0px 4px 1px rgba(0, 0, 0, 0.5)
        }

        .left-form {
          display: flex;
          flex: 1;
          flex-direction: column;

          > div {
            display: flex;
            flex-direction: row;
            align-items: center;

            > img {
              width: 0.5rem;
              height: 0.5rem;
            }

            input {
              margin-left: 0.2rem;
              width: 80%;
              height: 0.6rem;
              border: none;
              border-radius: 0;
              border-bottom: 0.01rem solid #ccc;
              padding: 0 0.3rem;
              font-size: 0.3rem;
              color: #444;
            }
          }

          .location {
            margin-bottom: 0.3rem;
          }
        }
      }
    }

    .guide-list {
      padding: 0.2rem;
      display: flex;
      flex-direction: column;

      .guide-item {
        width: 100%;
        height: 1.8rem;
        padding: 0 0.3rem;
        border-left: 0.08rem solid #1cb2f5;
        border-radius: 0.1rem;
        border-top: 0.01rem solid #eee;
        border-right: 0.01rem solid #eee;
        border-bottom: 0.01rem solid #eee;
        box-shadow: 3px 2px 4px 1px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        margin-bottom: 0.3rem;
        justify-content: space-between;

        .guide-item_right {
          width: 1.2rem;
          height: 0.5rem;
          line-height: 0.5rem;
          text-align: center;
          color: #fff;
          border-radius: 0.1rem;
          font-size: 0.28rem;
          background-image: linear-gradient(135deg, #2AFADF 10%, #4C83FF 100%);
        }

        .guide-item_left {
          display: flex;
          flex: 1;
          align-items: center;

          > img {
            width: 0.9rem;
            height: 0.9rem;
            border-radius: 50%;
          }

          .content {
            width: 45%;
            display: flex;
            flex-direction: column;
            margin-left: 0.3rem;

            p {
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 0.28rem;
              color: #444;
              font-weight: 700;

              span {
                color: #999;
              }
            }
          }

          .guide-item_left_flag {
            display: flex;
            align-items: center;

            span {
              font-size: 0.28rem;
              color: #1afa29;
            }

            img {
              width: 0.3rem;
              height: 0.3rem;
            }
          }
        }
      }
    }

    .cry-error {
      padding-top: 0.5rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 4rem;
        height: 4rem;
      }

      span {
        margin-top: 0.2rem;
        font-size: 0.4rem;
        color: #ccc;
      }
    }
  }

  .baiduMap {
    width: 100%;
    height: 8rem;
  }

</style>
