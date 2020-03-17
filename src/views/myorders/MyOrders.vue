<template>
  <div :class="['my-orders',isShowEmpty?'my-orders-empty':'']">
    <van-nav-bar
            title="历史订单"
            class="navbar"
    />
    <b-scroll class="wrapper" ref="bscroll">
      <!--       导游的历史订单-->
      <div class="content" v-show="isShowGuide && !isShowEmpty" v-for="(item,i) in orderDataList" :key="i" @click="goSingleOrder(item.guideorder.orderid)">
        <!--      放用户的头像-->
        <img :src="item.userModel.user_avatar" alt="">
        <div class="left-content">
          <div class="left-content_head">
            <!--            放详细地址-->
            <div class="left-title">
              <div class="inner-title">{{item.guideorder.detailedlocation}}</div>
              <van-icon name="arrow" size="0.28rem"/>
            </div>
            <div class="right-status" style="color: #ff5822;font-size: 0.26rem;font-weight: 700">{{item.guideorder.opinion === '订单取消' ? '订单已取消' : '订单已完结'}}</div>
          </div>
          <!--        写订单来源-->
          <div class="left-content_order_from">
            订单来源：{{item.guideorder.orderfrom}}
          </div>
          <!--        写用户的电话和待付款-->
          <div class="left-content_user">
            <img src="~assets/phone-icon.svg" alt="">
            <div class="left-content_user_left">
              用户电话：{{item.userModel.user_phone}}
            </div>
          </div>

        </div>
      </div>

      <!--       用户的历史订单-->
      <div class="content" v-show="!isShowGuide && !isShowEmpty" v-for="(item,i) in orderDataList" :key="i+6" @click="goSingleOrder(item.guideorder.orderid)">
        <!--      放导游的头像-->
        <img :src="item.guideModel.guide_avatar" alt="">
        <div class="left-content">
          <div class="left-content_head">
            <!--            放详细地址-->
            <div class="left-title">
              <div class="inner-title">{{item.guideorder.detailedlocation}}</div>
              <van-icon name="arrow" size="0.28rem"/>
            </div>
            <div class="right-status" style="color: #ff5822;font-size: 0.26rem;font-weight: 700">{{item.guideorder.opinion === '订单取消' ? '订单已取消' : '订单已完结'}}</div>
          </div>
          <!--        写订单来源-->
          <div class="left-content_order_from">
            订单来源：{{item.guideorder.orderfrom}}
          </div>
          <!--        写导游的电话和待付款-->
          <div class="left-content_user">
            <img src="~assets/phone-icon.svg" alt="">
            <div class="left-content_user_left">
              导游电话：{{item.guideModel.guide_phone}}
            </div>
          </div>
          <!--        用户操作模块-->
          <!--        再来一单-->
          <div class="user-submit_control">
            <div class="submit_content" @click.stop="secondSubimt">
              再来一单
            </div>
          </div>
        </div>
      </div>

      <!--       空订单-->
      <div class="empty-show" v-show="isShowEmpty">
        <img src="~assets/main-logo.png" alt="">
        <span>暂无新的订单信息哦~</span>
      </div>
    </b-scroll>

  </div>
</template>

<script>
  import BScroll from 'common/bscroll/BScroll'

  //导入network
  import {getAlreadyOrder} from 'network/order'

  export default {
    name: "MyOrders",
    data() {
      return {
        isShowEmpty: false,
        isShowGuide:false,
        orderDataList: []
      }
    },
    methods: {
      //获取已完成的订单
      async getAllMyOrders() {
        let userInfo = JSON.parse(localStorage.getItem('userInfo') || "{}")
        //如果有flag  则是导游
      if(userInfo.user_id){
        if (userInfo.is_guide) {
          let data = await getAlreadyOrder({guide_id: userInfo.user_id, user_id: 0})
          this.orderDataList = data.data
          this.isShowGuide = true
        } else {  //用户的
          let data = await getAlreadyOrder({guide_id: 0, user_id: userInfo.user_id})
          this.orderDataList = data.data
          this.isShowGuide = false
        }
      }
      },

      //再来一单
      secondSubimt(){
        this.$router.push('/nowfindGuide')
      },


      //跳转到单个订单详情页面
      goSingleOrder(id){
        this.$router.push('/histroySingleOrder/'+id)
      }
    },
    watch: {
      //监听数据有无变化 空数据则显示无订单信息 否则显示订单信息
      orderDataList: {
        immediate: true,
        handler(newValue) {
          if (newValue.length !== 0) {
            this.isShowEmpty = false
          } else {
            this.isShowEmpty = true
          }
        }
      }
    },
    components: {
      BScroll
    },
    created() {
      this.getAllMyOrders()
    }
  }
</script>

<style scoped lang="less">
  .my-orders {
    background-color: #eee;
    height: 100vh;
    position: relative;
  }
  .my-orders-empty{
    background-color: #fff;
  }

  .wrapper {
    position: absolute;
    top: 60px;
    bottom: 60px;
    left: 0;
    right: 0;
  }

  .content {
    box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 0.1rem;
    width: 95%;
    display: flex;
    margin: 0 auto;
    margin-bottom: 0.2rem;
    padding: 0.2rem 0.2rem 0;

    &:active {
      background-color: rgba(0, 0, 0, .1);
    }

    > img {
      width: 0.6rem;
      height: 0.6rem;
    }

    .left-content {
      padding-bottom: 0.3rem;
      flex: 1;
      min-width: 0;
      margin-left: 0.2rem;
      display: flex;
      flex-direction: column;

      .left-content_head {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .left-title {
          width: 70%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          > .inner-title {
            width: 90%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 0.3rem;
            color: #000;
            font-weight: bold;
            word-break: break-word;
          }
        }

        .right-status {
          color: #000;
          font-size: 0.28rem;
        }
      }

      .left-content_order_from {
        flex: 1;
        font-size: 0.26rem;
        color: #999;
        padding-bottom: 0.2rem;
        border-bottom: 0.01rem solid #eee;
      }

      .left-content_user {
        width: 100%;
        font-size: 0.26rem;
        display: flex;
        margin-top: 0.2rem;
        align-items: center;
        >img{
          margin-right: 0.1rem;
          width: 0.3rem;
          height: 0.3rem;
        }
        .left-content_user_right {
          font-weight: 700;
        }

      }

      .user-submit_control {
        margin-top: 0.2rem;
        display: flex;
        justify-content: flex-end;

        > div {
          padding: 0 0.25rem;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          border-radius: 0.05rem;
          border: 0.01rem solid #03a9f4;
          color: #03a9f4;
          font-size: 0.28rem;
        }
      }
    }
  }

  .navbar {
    background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);
  }

  .van-nav-bar__title {
    color: #ffffff;
  }

  .empty-show {
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
</style>