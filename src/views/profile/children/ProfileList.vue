<template>
  <div id="profilelist">
    <div class="inner">
      <div class="inner-list_item bind-iphone">
        <div class="left">
          <i class="iconfont icon-iPhoneX"></i>
          <span>绑定手机</span>
        </div>
        <div class="right">
          <span>{{iphoneCodet}}</span>
          <van-icon name="arrow" size="0.28rem" color="#ccc"/>
        </div>
      </div>
      <div class="inner-list_item" @click="goProfileDetailShow">
        <div class="left">
          <i class="iconfont icon-profile"></i>
          <span>个人主页</span>
        </div>
        <div class="right">
          <van-icon name="arrow" size="0.28rem" color="#ccc"/>
        </div>
      </div>
      <div class="inner-list_item" @click="goChangePsd">
        <div class="left">
          <i class="iconfont icon-lock"></i>
          <span>修改密码</span>
        </div>
        <div class="right">
          <van-icon name="arrow" size="0.28rem" color="#ccc"/>
        </div>
      </div>

      <!--      导游接单-->
      <div class="inner-list_item" v-show="isShowReceipt" @click="guideReceipt">
        <div class="left">
          <img src="~assets/jiedan-icon.svg" alt="">
          <span>在线接单</span>
        </div>
        <div class="right">
          <van-icon name="arrow" size="0.28rem" color="#ccc"/>
        </div>
      </div>

      <!--      我的订单-->
      <div class="inner-list_item"  @click="goMyOrders">
        <div class="left">
          <img src="~assets/my-order-icon.svg" alt="">
          <span>我的订单</span>
        </div>
        <div class="right">
          <van-icon name="arrow" size="0.28rem" color="#ccc"/>
        </div>
      </div>

      <div class="inner-list_item" @click="signOutUser" v-show="singOutFlag">
        <div class="left">
          <i class="iconfont icon-tuichu"></i>
          <span>退出</span>
        </div>
        <div class="right">
          <van-icon name="arrow" size="0.28rem" color="#ccc"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profilelist',
  methods: {
    signOutUser () {
      setTimeout(() => {
        localStorage.setItem('userInfo', '{}')
        localStorage.removeItem('orders')
        this.$store.commit('changeOrderObj', {})
        this.$store.commit('changeUserIsPay', false)
        this.$toast({
          type: 'success',
          message: '您已安全退出',
          duration: 1500
        })
        this.$parent.getUserInfo()
      }, 1000)
    },

    // 更改密码路由
    goChangePsd () {
      this.$router.push('/changepsd')
    },

    // 个人主页路由跳转
    goProfileDetailShow () {
      this.$router.push('/profiledetailshow')
    },

    // 跳转导游接单页面
    guideReceipt () {
      this.$router.push('/guideReceipt')
    },

    // 去我的订单界面
    goMyOrders () {
      this.$router.push('/myorders')
    }
  },
  data () {
    return {}
  },
  props: {
    iphoneCode: {
      type: String,
      default () {
        return ''
      }
    },
    isGuide: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    iphoneCodet () {
      if (this.iphoneCode.length !== 0) {
        return (
          this.iphoneCode.substr(0, 4) + '****' + this.iphoneCode.substr(8)
        )
      } else {
        return ''
      }
    },
    singOutFlag () {
      if (this.iphoneCode.length !== 0) {
        return true
      } else {
        return false
      }
    },

    // 是否显示在线接单
    isShowReceipt () {
      if (this.isGuide.is_guide) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped lang="less">
  #profilelist {
    width: 100%;
    display: flex;
    justify-content: center;

    .inner {
      width: 95%;
      display: flex;
      flex-direction: column;
      border-radius: 0.2rem;
      box-shadow: 0.01rem 0.15rem 0.3rem rgba(0, 0, 0, 0.15);

      .inner-list_item {
        padding: 0.2rem 0.15rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 0.01rem solid #ddd;

        &:active {
          background-color: #eee;
        }

        .left {
          display: flex;
          align-items: center;

          > img {
            width: 0.5rem;
            height: 0.5rem;
          }

          span {
            color: #000;
            font-size: 0.24rem;
            margin-left: 0.1rem;
          }

          i {
            font-size: 0.5rem;
            color: var(--main-color);
          }
        }

        .right {
          display: flex;
          align-items: center;
        }
      }

      .bind-iphone {
        .right {
          span {
            margin-right: 0.2rem;
            font-size: 0.28rem;
          }
        }
      }
    }
  }
</style>
