<template>
  <div id="guide-receipt">
    <div class="goback" @click="goBack">
      返回
    </div>
    <div class="head">
      <div class="head-top">
        <img src="~assets/jiedan-two-icon.svg" alt="" :class="[isGoReceipt?activesTwo:'']">
      </div>
      <div class="body-time" v-show="isGoReceipt">
        <span>{{handleHours}}</span>
        <span class="flag">:</span>
        <span>{{handleMinutes}}</span>
        <span class="flag">:</span>
        <span>{{handleSeconds}}</span>
      </div>
      <div class="flag" v-show="isGoReceipt">
        自动接单中...请勿关闭按钮操作
      </div>
    </div>
    <div :class="['submit-receipt',isGoReceipt?'active':'']" @click="goReceipt">
      {{submitText}}
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

// 导入network
import { guideReceiveOrder, guideStopReceiveOrder } from 'network/order'

export default {
  name: 'GuideReceipt',
  data () {
    return {
      isGoReceipt: false,
      submitText: '开启接单',
      activesTwo: 'activesTwo',
      timeObj: {
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      timeObjInte: null,
      guideId: null
    }
  },
  methods: {
    ...mapMutations(['changeTabBarShow', 'changeUserIsPay']),

    // 获取导游id
    getGuideId () {
      const d = JSON.parse(localStorage.getItem('userInfo') || '{}').user_id
      if (d) {
        this.guideId = d
      }
    },

    // 开始接单submit
    goReceipt () {
      if (this.receiveFlag) {
        return this.$toast({
          type: 'fail',
          message: '您有一条订单待处理哦！',
          icon: 'cross',
          duration: 1500
        })
      }

      this.isGoReceipt = !this.isGoReceipt

      // 判断是否已经被用户结果单了  如果被接单了 则不能在开启接单

      // 开启接单操作
      if (this.isGoReceipt) {
        setTimeout(() => {
          this.activesTwo = 'actives'
        }, 1000)
        this.submitText = '正在接单中...'

        this.timeObjInte = setInterval(() => {
          this.timeObj.seconds += 1
          if (this.timeObj.seconds === 60) {
            this.timeObj.seconds = 0
            this.timeObj.minutes += 1
          }
          if (this.timeObj.minutes === 60) {
            this.timeObj.minutes = 0
            this.timeObj.hours += 1
          }
        }, 1000)

        // 发id给后台
        guideReceiveOrder(this.guideId).then(r => {
          if (!r.code === '200') {
            return this.$toast({
              type: 'fail',
              message: '服务器错误！',
              icon: 'cross',
              duration: 1500
            })
          } else {
            // 开启websocket
            this.$toast({
              message: '您已开始接单!'
            })
          }
        })

        // 关闭了的操作
      } else {
        clearInterval(this.timeObjInte)
        this.timeObj.seconds = 0
        this.timeObj.minutes = 0
        this.timeObj.hours = 0
        this.activesTwo = 'activesTwo'
        this.submitText = '开启接单'
        guideStopReceiveOrder(this.guideId).then(r => {
          if (!r.code === '200') {
            return this.$toast({
              type: 'fail',
              message: '服务器错误！',
              icon: 'cross',
              duration: 1500
            })
          } else {
            this.$toast({
              message: '您已停止接单!'
            })
          }
        })
      }
    },

    // 返回
    goBack () {
      this.$router.go(-1)
    }
  },
  activated () {
    this.changeTabBarShow(false)
    this.getGuideId()
  },
  deactivated () {
    this.changeTabBarShow(true)
    this.getGuideId()
  },
  created () {
    this.getGuideId()
    this.$bus.$on('goGuideReceipt', () => {
      this.isGoReceipt = false
      clearInterval(this.timeObjInte)
      this.timeObj.seconds = 0
      this.timeObj.minutes = 0
      this.timeObj.hours = 0
      this.activesTwo = 'activesTwo'
      this.submitText = '开启接单'
      this.$toast({
        message: '您已停止接单!'
      })
    })

    // 获取是否被用户选中的事件总线
    this.$bus.$on('getToastForSuccess', () => {
      this.$toast({
        message: '有用户选择您拉！',
        type: 'success'
      })
    })
  },
  computed: {
    ...mapState(['receiveFlag']),
    handleSeconds () {
      if (this.timeObj.seconds < 10) {
        return '0' + this.timeObj.seconds
      } else {
        return this.timeObj.seconds
      }
    },
    handleMinutes () {
      if (this.timeObj.minutes < 10) {
        return '0' + this.timeObj.minutes
      } else {
        return this.timeObj.minutes
      }
    },
    handleHours () {
      if (this.timeObj.hours < 10) {
        return '0' + this.timeObj.hours
      } else {
        return this.timeObj.hours
      }
    }
  }
}
</script>

<style scoped lang="less">
  #guide-receipt {
    background-image: linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%);
    height: 100vh;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    .goback {
      width: 1.2rem;
      height: 0.5rem;
      color: #fff;
      font-size: 0.28rem;
      text-align: center;
      position: absolute;
      top: 0.3rem;
      left: 0.3rem;
      line-height: 0.5rem;
      background-color: rgba(0, 0, 0, .6);
      border-radius: 0.1rem;
    }

    .submit-receipt {
      color: #fff;
      width: 80%;
      font-size: 0.3rem;
      height: 0.8rem;
      border-radius: 0.4rem;
      background-color: transparent;
      border: 0.03rem solid #fff;
      text-align: center;
      line-height: 0.8rem;
      font-weight: 700;
    }

    .active {
      background-color: rgba(0, 0, 0, .5);
      border: none;
    }

    .head {
      display: flex;
      flex-direction: column;
      align-items: center;

      > div.flag {
        margin-top: 0.2rem;
        color: #fff;
        font-size: 0.35rem;
      }

      .head-top {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        border: 0.04rem solid #fff;
        display: flex;
        justify-content: center;
        align-items: center;

        > img {
          width: 2rem;
          height: 2rem;
        }

        > img.activesTwo {
          transition: all 1s;
          transform: scale(1.7);
        }

        > img.actives {
          animation: imgRotate 1.5s linear infinite;
        }
      }

      .body-time {
        display: flex;
        flex-direction: row;
        font-size: 0.8rem;
        color: #fff;
        margin-top: 0.4rem;
        justify-content: center;

        > span.flag {
          margin: 0 0.2rem;
        }
      }
    }
  }

  @keyframes imgRotate {
    0% {
      transform: rotate(0) scale(1.7);
    }
    50% {
      transform: rotate(180deg) scale(1.7);
    }
    100% {
      transform: rotate(360deg) scale(1.7)
    }
  }

</style>
