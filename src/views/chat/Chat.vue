<template>
  <div class="chat-online">
    <van-nav-bar
      left-arrow
      @click-left="goBack"
      :title="friendInfo.user_nick"
      class="navbar"
    />

    <!-- 聊天内容框 -->
    <b-scroll class="bscroll" ref="bscroll" :style="bscrollStyle">
      <div class="social-inner_content">
        <chat-message
          @goProfile="goProfile"
          :item-data="item.currentId"
          :message="item.message"
          :direction="item.currentId === userId ? false : true"
          :avatar="item.currentId === userId ? userAvatar : friendInfo.user_avatar"
          v-for="(item, i) in chatMessageArrList"
          :key="i"
          v-show="item.currentId===userId || item.friendId === userId"
        ></chat-message>
      </div>
    </b-scroll>

    <!-- 底部发送栏 -->
    <div class="message-control" ref="messageControl">
      <div class="message-control_t">
        <input type="text" v-focus v-model="messageText" @keyup.enter="sendMessage"/>
        <img
          src="~assets/chat-emoji.png"
          alt=""
          class="emoji"
          @click="showEmoji"
        />
        <div class="send" @click="sendMessage">发送</div>
      </div>
      <transition name="slide-fade" mode="out-in">
        <VEmojiPicker @select="selectEmoji" v-show="isShowEmoji" />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getUserInfoById } from 'network/profile'
import { insertMsg, getMsgByUserId } from 'network/chat'
import { VEmojiPicker } from 'v-emoji-picker'
import { utf16toEntities, uncodeUtf16 } from 'commonjs/utils'
import BScroll from 'common/bscroll/BScroll'
import ChatMessage from './children/ChatMessage.vue'
export default {
  name: 'Chat',
  components: {
    BScroll,
    VEmojiPicker,
    ChatMessage
  },
  data () {
    return {
      friendId: Number(this.$route.params.id),
      userId: null,
      userAvatar: null,
      friendInfo: {},
      messageText: '',
      isShowEmoji: false,
      bscrollStyle: { bottom: '0' },
      socket: null,
      chatMessageArrList: []
    }
  },
  methods: {
    ...mapMutations(['changeTabBarShow']),
    selectEmoji (emoji) {
      this.messageText += utf16toEntities(emoji.data)
    },
    showEmoji () {
      this.isShowEmoji = !this.isShowEmoji
      // 加个延迟才能正确拿到高度
      this.setBottom()
    },
    async sendMessage () {
      this.isShowEmoji = false
      await insertMsg({ userId: this.userId, friendId: this.friendId, msg: this.messageText })
      this.socket.send(
        JSON.stringify({
          message: uncodeUtf16(this.messageText),
          currentId: this.userId,
          friendId: this.friendId
        })
      )
      this.messageText = ''
      this.setBottom()
    },
    goBack () {
      this.$router.go(-1)
    },
    goProfile (id) {
      this.$router.push(`/profiledetailshow/${id}`)
    },
    linkWebSocket () {
      this.userId = JSON.parse(localStorage.getItem('userInfo')).user_id
      this.userAvatar = JSON.parse(
        localStorage.getItem('userInfo')
      ).user_avatar
      this.socket = new WebSocket(
        `ws://47.93.102.239:9999/tongcheng/websocket/${this.userId}`
      )

      this.socket.addEventListener('open', () => {
        console.log('socket is open...')
      })
      this.socket.addEventListener('error', () => {
        console.log('socket is error')
      })
      this.socket.addEventListener('message', (message) => {
        this.chatMessageArrList.push(JSON.parse(message.data))
      })
      this.socket.addEventListener('close', () => {
        console.log('socket is close...')
      })
    },
    setBottom () {
      setTimeout(() => {
        const messageControl = this.$refs.messageControl
        const messageControlHight = messageControl.offsetHeight
        // 设置bottom
        this.bscrollStyle.bottom = messageControlHight + 'px'
      }, 300)
    },
    async getFriendInfo () {
      const d = await getUserInfoById({ userId: this.friendId })
      this.friendInfo = d.data
    },
    async getChatMessages () {
      const { data } = await getMsgByUserId({ userId: this.userId, friendId: this.friendId })
      const result = data.map((item, i) => {
        const obj = {}
        obj.message = uncodeUtf16(item.msg)
        obj.currentId = item.user_id
        obj.friendId = item.friend_id
        return obj
      })
      this.chatMessageArrList = result
    }
  },
  beforeDestroy () {
    this.changeTabBarShow(true)
  },
  created () {
    this.changeTabBarShow(false)
    this.getFriendInfo()
    // 连接websocket
    this.linkWebSocket()
    // 获取聊天记录
    this.getChatMessages()
  },
  mounted () {
    this.$nextTick(() => {
      const wrapper = document.getElementById('EmojiPicker')
      wrapper.removeChild(document.getElementById('InputSearch'))

      // 计算bottom
      this.setBottom()
    })
  }
}
</script>
<style lang='less' scoped>
.slide-fade-enter-active {
  transition: all 0.5s linear;
}
.slide-fade-leave-active {
  transition: all 0.1s linear;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(30px);
  opacity: 0;
}
.chat-online {
  overflow-x: hidden;
  overflow-y: hidden;
  .message-control {
    padding: 0.15rem;
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    align-items: center;
    width: 100%;
    background-color: #eee;
    position: fixed;
    border-top: 0.01rem solid #ccc;
    bottom: 0;
    left: 0;
    .message-control_t {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      > .emoji {
        width: 0.5rem;
        height: 0.5rem;
      }
      > input {
        outline: none;
        border: 0.01rem solid #eee;
        height: 0.6rem;
        width: 60%;
        padding: 0 0.35rem;
        font-size: 0.26rem;
        color: #444;
        margin-left: 0.3rem;
        border-radius: 0.1rem;
      }
      > .send {
        height: 100%;
        padding: 0 0.4rem;
        background-color: #0cbd09;
        font-size: 0.28rem;
        height: 0.6rem;
        line-height: 0.6rem;
        color: #fff;
        font-weight: 700;
        border-radius: 0.15rem;
        &:active {
          background: #11e40d;
        }
      }
    }
  }
  .navbar {
    background-image: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
  }

  .bscroll {
    top: 46px;
    position: absolute;
    bottom: 0.9rem;
    left: 0;
    right: 0;
    background-color: #fff;
  }

  .social-inner_content {
    display: flex;
    flex-direction: column;
    padding: 0.2rem;
  }

  /deep/ .van-nav-bar__title {
    color: #fff;
    font-weight: 700;
  }
  /deep/.van-nav-bar__left,
  .van-nav-bar__right {
    font-size: 0.2rem;
    padding: 0 0.25rem;
  }
  /deep/.van-nav-bar__arrow {
    font-size: 0.3rem;
    color: #fff;
    font-weight: 700;
  }
}
</style>
<style lang="less">
.chat-online .emoji-picker {
  width: 100% !important;
  margin-top: 0.15rem;
}
.container-emoji {
  height: 2rem !important;
}
</style>
