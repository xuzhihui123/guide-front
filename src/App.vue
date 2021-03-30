<template>
  <div id="app">
    <tab-bar :tab-bar-icon="tabBarIcons" :active-color="activeColors" v-show="tabBarShow"/>
    <transition enter-active-class="fadeIn animated" leave-active-class="fadeOut animated"
                :duration="{enter:200,leave:200}" mode="out-in">
      <keep-alive
              exclude="Login,Register,Profile,ProfileDetail,ChangePassword,ProfileDetailShow,Search,FindDetail,PostRequestion,NowFindGuide,Orders,OrderDetail,MyOrders,HistroyOrderDetails">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import TabBar from 'common/tabbar/TabBar'
import { mapState } from 'vuex'
import { guideStopReceiveOrder } from 'network/order'

export default {
  data () {
    return {
      activeColors: '#FF699C',
      tabBarIcons: [
        {
          name: '首页',
          active: require('assets/nav_2_active.png'),
          inactive: require('assets/nav_2.png'),
          router: '/home',
          index: 100
        },
        {
          name: '发现',
          active: require('assets/nav_3_active.png'),
          inactive: require('assets/nav_3.png'),
          router: '/find',
          index: 101
        },
        {
          name: '订单',
          active: require('assets/nav_4_active.png'),
          inactive: require('assets/nav_4.png'),
          router: '/orders',
          index: 102
        },
        {
          name: '我的',
          active: require('assets/nav_5_active.png'),
          inactive: require('assets/nav_5.png'),
          router: '/profile',
          index: 103
        }
      ]
    }
  },
  watch: {
    guideId: {
      immediate: true,
      handler (newValue) {
        if (newValue) {
          this.openWebscoketGuide(newValue)
        }
      }
    }
  },
  methods: {

    openWebscoketGuide (id) {
      if (typeof (WebSocket) === 'undefined') {
        console.log('您的浏览器不支持WebSocket')
      } else {
        this.socket = new WebSocket(`ws://47.93.102.239:9999/xundao/websocket/${id}`)
        // 打开事件
        this.socket.onopen = function () {
          // console.log("Socket 已打开");
        }
        // 获得消息事件
        this.socket.onmessage = (msg) => {
          // console.log(msg.data);
          if (msg.data.indexOf('{') === 0) {
            this.$store.commit('changeOrderObj', JSON.parse(msg.data))
            // 保存信息到localstorage 持久储存
            localStorage.setItem('orders', JSON.stringify(JSON.parse(msg.data)))
          }
          if (msg.data === '您已经被用户接单') {
            localStorage.setItem('receiveFlag', JSON.stringify({ flag: true }))
            // 被接单后不能在接单
            this.$store.commit('changeReceiveFlag', true)

            // 调用事件总线返回给 guidereceipt界面
            this.$bus.$emit('getToastForSuccess')

            // 此时停止接单
            guideStopReceiveOrder(this.guideId).then(r => {
              if (!r.code === '200') {
                return this.$toast({
                  type: 'fail',
                  message: '服务器错误！',
                  icon: 'cross',
                  duration: 1500
                })
              } else {
                this.$bus.$emit('goGuideReceipt')
                this.$router.push('/orders')
              }
            })
          }

          if (msg.data === '用户已付款') {
            this.$store.commit('changeUserIsPay', true)
          }

          if (msg.data === '用户已取消订单') {
            // 取消订单 设置为true
            this.$store.commit('changeUserCancel', true)
          }
        }
        // 关闭事件
        this.socket.onclose = function () {
          // console.log("Socket已关闭");
        }
        // 发生了错误事件
        this.socket.onerror = function () {
          alert('Socket发生了错误')
          // 此时可以尝试刷新页面
        }
      }
    }

  },
  created () {
  },
  components: {
    TabBar
  },
  computed: {
    ...mapState(['tabBarShow', 'guideId'])
  }
}
</script>
<style lang="less">
  @import 'assets/css/calc.less';
</style>
