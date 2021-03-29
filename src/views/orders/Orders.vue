<template>
  <div class="orders-main">
    <van-nav-bar title="信息列表" class="navbar" />
    <b-scroll class="bscroll" ref="bscroll" v-show="!ifShowEmpty">
      <div class="content-wrapper">
        <div class="content-wrapper_item" v-for="(item,i) in chatList" :key="i" @click="goChatPage(item)">
          <img :src="item.friend.user_avatar" alt="" />
          <div class="right">
             <div class="right-inner">
                 <div class="top">
                     <span class="name">{{item.friend.user_nick}}</span>
                     <span class="time">{{item.create_time | dateFormat('a LT')}}</span>
                 </div>
                 <div class="message">{{item.msg | parseText}}</div>
             </div>
          </div>
        </div>
      </div>
    </b-scroll>

    <div class="empty-show" v-show="ifShowEmpty">
      <img src="~assets/message-empty.png" alt="" />
      <span>还没有聊天信息哦~</span>
    </div>
  </div>
</template>

<script>
// 导入组件
import BScroll from 'common/bscroll/BScroll'
import { chatList } from 'network/chat'

import { getItem } from 'commonjs/utils'

export default {
  name: 'Orders',
  components: {
    BScroll
  },
  data () {
    return {
      ifShowEmpty: true,
      chatList: []
    }
  },

  methods: {
    async getChatList () {
      const userInfo = getItem('userInfo')
      if (userInfo) {
        const { data } = await chatList(userInfo.user_id)
        this.ifShowEmpty = !data.length
        this.chatList = data
      }
    },
    goChatPage (item) {
      this.$router.push(`/chat/${item.friend.user_id}`)
    }
  },
  created () {
    this.getChatList()
  }
}
</script>

<style scoped lang="less">
.orders-main {
  .bscroll {
    position: absolute;
    top: 46px;
    bottom: 50px;
    left: 0;
    right: 0;
    .content-wrapper {
      display: flex;
      width: 100%;
      flex-direction: column;
      flex-wrap: nowrap;
      padding-left: 0.15rem;
      padding-top: 0.2rem;
      > .content-wrapper_item {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        > img {
          width: 0.8rem;
          height: 0.8rem;
        }
        > .right {
          flex: 1;
          padding: 0.15rem 0;
          padding-right: 0.15rem;
          border-top: 0.01rem solid #eee;
          margin-left: 0.15rem;
                        white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
          >.right-inner{
            height: 0.8rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            >.top{
              display: flex;
              justify-content: space-between;
              >.name{
                font-weight: 700;
                font-size: 0.28rem;
                color: #444;
              }
              >.time{
              font-size: 0.24rem;
              color: #ccc;
              }
            }
            >.message{
              font-size: 0.24rem;
              color: #ccc;
white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}

.navbar {
  background-image: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
}

/deep/ .van-nav-bar__title {
  color: #fff;
  font-weight: 700;
}

.content {
  width: 100%;
  padding: 0 0.2rem;
  display: flex;
  padding-top: 0.3rem;
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
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
    border-bottom: 0.01rem solid #eee;
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
    }
    .left-content_user {
      width: 100%;
      font-size: 0.26rem;
      display: flex;
      justify-content: space-between;
      margin-top: 0.2rem;
      .left-content_user_right {
        font-weight: 700;
      }
    }
    .user-submit_control {
      margin-top: 0.3rem;
      display: flex;
      justify-content: flex-end;
      > div {
        padding: 0 0.25rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        border-radius: 0.05rem;
        border: 0.01rem solid #ff5822;
        color: #ff5822;
        font-size: 0.28rem;
      }
    }
  }
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
