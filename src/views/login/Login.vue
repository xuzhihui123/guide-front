<template>
  <div id="login">
    <!--    navbar-->
    <div class="right">
      <div class="right_inner" @click="goBack">
        先逛逛
      </div>
    </div>

    <login-logo/>

    <!--    登录表单-->
    <div class="form">
      <!--        账号-->
      <div class="username">
        <img :src="clickInputIcon.userName.inactive" alt="">
        <input type="text" placeholder="请输入账号" v-model="userName" @focus="changeIcon" @blur="changeIconU" v-focus>
      </div>
      <!--      密码-->
      <div class="password">
        <img :src="clickInputIcon.passWord.inactive" alt="">
        <input type="password" placeholder="请输入密码" v-model="passWord" @focus="changeIconT" @blur="changeIconTu">
      </div>

      <div class="submit-login" @click="goLogin">
        登&nbsp;录
      </div>

      <!--      忘记密码？-->
      <div class="forget-psd_register">
        <div class="forget">忘记密码?</div>
        <div class="flag">|</div>
        <div class="register" @click="goRegis">现在注册</div>
      </div>
    </div>

    <!--    选择注册导游还是用户-->
    <van-action-sheet v-model="hidenRegister" :actions="actions" @select="onSelectRegis" description="请选择注册类型"/>
  </div>
</template>

<script>
// 引入vuex的方法
import { mapMutations } from 'vuex'

// 引入组件
import LoginLogo from 'content/loginlogo/LoginLogo'

// 引入network
import { loginForm, guideLogin } from 'network/login'
import { getOngoingOrder } from 'network/order'

export default {
  name: 'Login',
  methods: {
    ...mapMutations(['changeTabBarShow']),
    goBack () {
      this.$router.push('/home')
    },
    changeIcon () {
      this.clickInputIcon.userName.inactive = require('assets/login-user-icon-active.svg')
    },
    changeIconT () {
      this.clickInputIcon.passWord.inactive = require('assets/login-user-lock-active.svg')
    },
    changeIconU () {
      this.clickInputIcon.userName.inactive = require('assets/login-user-icon.svg')
    },
    changeIconTu () {
      this.clickInputIcon.passWord.inactive = require('assets/login-user-lock.svg')
    },

    goRegis () {
      this.hidenRegister = true
    },
    onSelectRegis (item) {
      // 传入0是进入导游  传入1是进入用户
      this.$router.push(`/register/${item.flag}`)
      this.hidenRegister = false
    },

    // 用户的请求方法
    userLoginMethod () {
      return loginForm({
        userName: this.userName,
        userPassWord: this.passWord
      })
    },

    // 导游得请求方法
    guideLoginMethod () {
      return guideLogin({
        guideName: this.userName,
        guidePassWord: this.passWord
      })
    },

    // 登录点击
    goLogin () {
      Promise.all([this.userLoginMethod(), this.guideLoginMethod()]).then(r => {
        const [user, guide] = r
        // 如果都没有返回错误
        if ((!user.data) && (!guide.data)) {
          return this.$toast({
            type: 'fail',
            message: '账号或密码错误！',
            icon: 'cross',
            duration: 1500
          })
        }
        // 如果用户登录成功
        if (user.data && (!guide.data)) {
          this.$toast({
            type: 'success',
            message: '登录成功!',
            duration: 1500
          })
          // //登录成功保存 localstorage
          const { user_avatar, user_name, user_nick, user_phone, user_id } = user.data
          const userData = { user_avatar, user_name, user_nick, user_phone, user_id }
          localStorage.setItem('userInfo', JSON.stringify(userData))

          getOngoingOrder({ guide_id: 0, user_id }).then(r => {
            // 表示有进行中的订单
            if (r.code === '200') {
              this.$store.commit('changeOrderObj', r.msg[0])
              // 设置储存
              localStorage.setItem('orders', JSON.stringify(r.msg[0]))
              this.$router.push('/profile')
            } else {
              this.$router.push('/profile')
            }
          })

          // 页面跳转到 profile
        }

        // 如果导游登录成功
        if (guide.data && (!user.data)) {
          this.$toast({
            type: 'success',
            message: '登录成功!',
            duration: 1500
          })
          // 登录成功保存 localstorage
          const userData = { user_avatar: guide.data.guide_avatar, user_name: guide.data.guide_name, user_nick: guide.data.guide_nick, user_phone: guide.data.guide_phone, user_id: guide.data.guide_id, is_guide: 'y' }
          localStorage.setItem('userInfo', JSON.stringify(userData))
          this.$store.commit('changeGuideId', guide.data.guide_id)

          getOngoingOrder({ guide_id: guide.data.guide_id, user_id: 0 }).then(r => {
            if (r.code === '200') {
              this.$store.commit('changeOrderObj', r.msg[0])
              // 设置储存
              localStorage.setItem('orders', JSON.stringify(r.msg[0]))
              this.$store.commit('changeReceiveFlag', true)
              localStorage.setItem('receiveFlag', JSON.stringify({ flag: true }))
              this.$router.push('/profile')
            } else {
              localStorage.removeItem('receiveFlag')
              this.$store.commit('changeReceiveFlag', false)
              this.$router.push('/profile')
            }
          })
          // 页面跳转到 profile
        }
      })
    }
  },
  data () {
    return {
      userName: '',
      passWord: '',
      clickInputIcon: {
        userName: {
          inactive: require('assets/login-user-icon.svg')
        },
        passWord: {
          inactive: require('assets/login-user-lock.svg')
        }
      },
      hidenRegister: false,
      actions: [
        { name: '我想成为导游', flag: 0 },
        { name: '我想成为用户', flag: 1 }
      ]
    }
  },
  destroyed () {
    this.changeTabBarShow(true)
  },
  created () {
    this.changeTabBarShow(false)
  },
  components: {
    LoginLogo
  }
}
</script>

<style scoped lang="less">
  #login {
    width: 100%;
    height: 100vh;
  }

  .right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0.2rem 0;
    padding-right: 0.2rem;

    .right_inner {
      text-align: center;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.26rem;
      padding: 0 0.3rem;
      border-radius: 0.3rem;
      border: 0.01rem solid var(--main-color);
      color: var(--main-color);

      &:active {
        background-color: #eee;
      }
    }

  }

  .form {
    padding: 0 0.8rem;
    display: flex;
    flex-direction: column;

    .username, .password {
      display: flex;
      height: 0.8rem;
      position: relative;

      input {
        width: 100%;
        height: 100%;
        outline: none;
        border-left-width: 0;
        border-right-width: 0;
        border-top-width: 0;
        border-bottom: 0.01rem solid #ddd;
        font-size: 0.3rem;
        background-color: transparent;
        -webkit-appearance: none;
        border-radius: 0;
        padding-left: 1rem;
        padding-right: 0.5rem;
        color: #444;
      }

      img {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 0.5rem;
        height: 0.5rem;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 2rem 2rem;
      }
    }

    .password {
      margin-top: 0.5rem;
    }

    .submit-login {
      width: 100%;
      height: 0.8rem;
      font-size: 0.3rem;
      line-height: 0.8rem;
      text-align: center;
      margin-top: 1rem;
      color: #fff;
      background-color: #FF5B8E;
      border-radius: 0.4rem;
    }

    .forget-psd_register {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: 0.5rem;
      >div{
        font-size: 0.24rem;
        color: #444;
      }
      .flag{
        margin: 0 0.2rem;
      }
    }
  }
</style>
