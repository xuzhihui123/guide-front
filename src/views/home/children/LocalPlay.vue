<template>
  <div id="local-play">
    <div class="local-play_header">
                  <span class="flag">

                  </span>
                  <span class="text">
                      猜你喜欢
                  </span>
      <span class="text-flag">推荐</span>
    </div>

  <div class="social-content">
    <waterfall :data="userList" :width="width" :gutterWidth="gutterWidth">
      <template>
        <div v-for="(item,index) in userList" :key="index" class="social-content_item" @click="goChatPage(item.user.user_id)">
          <img :lazy-src="item.user.user_avatar" alt="加载错误" @load="imgLoad">
          <p class="social-content_item_n">
            <span>{{item.user.user_name}}</span>
            <span>戳我聊天</span>
          </p>
          <p class="social-content_item_c">{{(item.profile && item.profile.text) || 'Ta还没有个人说明哦~'}}</p>
        </div>
      <!-- <img v-if="item.img" :lazy-src="item.img" alt="加载错误"/> -->
    </template>
  </waterfall>

    </div>

  </div>
</template>

<script>

import { getUserList } from 'network/home'
export default {
  name: 'LocalPlay',
  components: {
  },
  data () {
    return {
      userList: [],
      fontSize: null
    }
  },
  created () {
    this.getUserList()
    this.getHtmlRootFont()
  },
  computed: {
    width () {
      const w = this.fontSize * 0.4
      const windowWidth = document.documentElement.clientWidth - w
      const resultWidth = (windowWidth - this.fontSize * 0.2) / 2
      return resultWidth - 1.5
    },
    gutterWidth () {
      return this.fontSize * 0.2
    }
  },
  methods: {
    async getUserList () {
      const d = await getUserList()
      this.userList = d.data
    },
    // 获取当前html的font-size
    getHtmlRootFont () {
      const htmlDom = document.documentElement
      this.fontSize = htmlDom.currentStyle
        ? Number(htmlDom.currentStyle.fontSize.substring(0, htmlDom.currentStyle.fontSize.lastIndexOf('p')))
        : Number(getComputedStyle(htmlDom, null).fontSize.substring(0, getComputedStyle(htmlDom, null).fontSize.lastIndexOf('p')))
    },
    imgLoad () {
      this.$bus.$emit('imgLoads')
    },
    goChatPage (id) {
      this.$emit('goChatPage', id)
    }
  }
}
</script>

<style scoped lang="less">
  #local-play {
    display: flex;
    flex-direction: column;

    .local-play_header {
      padding: 0.2rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      .flag {
        width: 0.1rem;
        height: 0.4rem;
        background-color: var(--main-color);
      }

      .text {
        font-weight: 700;
        color: #000;
        font-size: 0.3rem;
        margin-left: 0.1rem;
      }
      .text-flag{
        font-size: 0.18rem;
        height: 0.28rem;
        padding: 0 0.15rem;
        line-height: 0.28rem;
        color: #fff;
        background-color: var(--main-color);
        margin-left: 0.1rem;
        border-radius: 0.05rem;
      }
    }
    .social-content{
      padding: 0.2rem;
      img{
        width: 100%;
        border-radius: 0.1rem;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
      .social-content_item{
        display: flex;
        flex-direction: column;
        background: #fff;
        margin-bottom: 0.2rem;
        border-radius: 0.1rem;
        box-shadow: 0 0.05rem 0.15rem -0.05rem rgba(0,0,0,.5);
        p{
          padding: 0.15rem;
        }
        >.social-content_item_n{
          font-size: 0.24rem;
          font-weight: 700;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          >span:nth-child(1){
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          >span:nth-child(2){
            text-align: center;
            width: 40%;
            margin-left: 0.1rem;
    font-size: 0.16rem;
    padding: 0rem 0.1rem;
    line-height: 0.26rem;
    border-radius: 0.05rem;
    color: #fff;
    font-weight: normal;
 background-image: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
          }
        }
        >.social-content_item_c{
          color: #444;
          padding-top: 0;
          padding-bottom: 0;
          margin-bottom: 0.2rem;
          overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2; /*行数*/
        }
      }
    }
  }

</style>
<style lang="less">
  //  #local-play  .vue-waterfall .vue-waterfall-column {
  //   width: 48%  !important;
  // }
</style>
