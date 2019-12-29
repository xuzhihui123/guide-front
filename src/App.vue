<template>
  <div id="app">
    <tab-bar :tab-bar-icon="tabBarIcons" :active-color="activeColors" v-show="tabBarShow"/>
    <transition enter-active-class="fadeIn animated" leave-active-class="fadeOut animated"
    :duration="{enter:200,leave:200}" mode="out-in">
      <keep-alive exclude="Login,Register,Profile,ProfileDetail,ChangePassword">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  import TabBar from 'common/tabbar/TabBar'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        activeColors: '#FF699C',
        tabBarIcons: [
          {
            name: '首页',
            active: require('assets/nav_2_active.png'),
            inactive: require('assets/nav_2.png'),
            router:'/home',
            index:100
          },
          {
            name: '发现',
            active: require('assets/nav_3_active.png'),
            inactive: require('assets/nav_3.png'),
            router:'/find',
            index:101
          },
          {
            name: '订单',
            active: require('assets/nav_4_active.png'),
            inactive: require('assets/nav_4.png'),
            router:'/orders',
            index:102
          },
          {
            name: '我的',
            active: require('assets/nav_5_active.png'),
            inactive: require('assets/nav_5.png'),
            router:'/profile',
            index:103
          }
        ]
      }
    },
    components: {
      TabBar
    },
    computed:{
      ...mapState(['tabBarShow'])
    }
  };
</script>
<style lang="less">
  @import 'assets/css/calc.less';
</style>
