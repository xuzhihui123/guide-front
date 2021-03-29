<template>
  <div id="register">
    <nav-bar navBarBg="#3072f5">
      <div slot="left" class="left" @click="goBack">
        <img src="~assets/arrow-left.svg" alt="">
      </div>
      <div slot="center">
        注册
      </div>
    </nav-bar>

    <login-logo class="loginLogo"/>

    <!--    登录表单-->
    <div class="form">
      <!--        账号-->
      <div class="username">
        <span :style="inputBg" v-show="closeFlag" @click="clearInput"></span>
        <input type="text" placeholder="请输入账号" v-model="userName" @input="changeShowFlag" v-focus>
      </div>
      <div class="psd-toast">
        用户名需大于等于6位小于14位
      </div>
      <!--      密码-->
      <div class="password">
        <span :style="inputBg" v-show="closeFlagT" @click="clearInputT"></span>
        <input type="text" placeholder="请输入密码" v-model="passWord" @input="changeShowFlagT">
      </div>
      <div class="psd-toast">
        密码需大于等于6位小于14位
      </div>
      <!--      手机号-->
      <div class="password">
        <input type="number" placeholder="请输入手机号" v-model="iphone" @input="changeShowFlagT">
      </div>

      <div class="submit-regis" @click="submitRegisForm">
        注&nbsp;册
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex的方法
import { mapMutations } from 'vuex'

// 引入组件
import NavBar from 'common/navbar/NavBar'
import LoginLogo from 'content/loginlogo/LoginLogo'

// 引入网络请求
import { registerForm } from 'network/register'

export default {
  name: 'Register',
  data () {
    return {
      userName: '',
      passWord: '',
      iphone: '',
      guideTrueName: '',
      inputBg: {
        backgroundImage: 'url(' + require('assets/input-close.svg') + ')'
      },
      closeFlag: false,
      closeFlagT: false
    }
  },
  methods: {
    ...mapMutations(['changeTabBarShow']),
    goBack () {
      this.$router.push('/login')
    },
    changeShowFlag () {
      if (this.userName !== '') {
        this.closeFlag = true
      } else {
        this.closeFlag = false
      }
    },
    changeShowFlagT () {
      if (this.passWord !== '') {
        this.closeFlagT = true
      } else {
        this.closeFlagT = false
      }
    },
    clearInput () {
      this.userName = ''
      this.closeFlag = false
    },
    clearInputT () {
      this.passWord = ''
      this.closeFlagT = false
    },
    submitRegisForm () {
      // 如果是用户
      if ((this.userName === '' && this.passWord === '' && this.iphone === '') || (this.userName === '' || this.passWord === '' || this.iphone === '')) {
        return this.$toast({
          type: 'fail',
          message: '请检查信息是否完整!',
          icon: 'cross',
          duration: 1000
        })
      }
      registerForm({
        userName: this.userName,
        userPassWord: this.passWord,
        userPhone: this.iphone
      }).then(r => {
        if (r.status.code === '501') {
          return this.$toast({
            type: 'fail',
            message: '用户名不符合标准!',
            icon: 'cross',
            duration: 1500
          })
        } else if (r.status.code === '503') {
          return this.$toast({
            type: 'fail',
            message: '请检查手机号码是否正确!',
            icon: 'cross',
            duration: 1500
          })
        } else if (r.status.code === '502') {
          return this.$toast({
            type: 'fail',
            message: '密码不符合标准!',
            icon: 'cross',
            duration: 1500
          })
        } else if (r.status.code === '504') {
          return this.$toast({
            type: 'fail',
            message: '用户已存在！',
            icon: 'cross',
            duration: 1500
          })
        } else if (r.status.code === '200') {
          this.$toast({
            type: 'success',
            message: '注册成功!',
            duration: 1500
          })
          // 保存数据到localstorage
          const { user_avatar, user_name, user_nick, user_phone, user_id } = r.data
          const userData = { user_avatar, user_name, user_nick, user_phone, user_id }
          localStorage.setItem('userInfo', JSON.stringify(userData))

          // 页面跳转到 profile
          this.$router.push('/profile')
        }
      })
    }

  },
  watch: {
    userName () {
      this.userName = this.userName.replace(/[^A-Za-z0-9]/g, '')
    },
    passWord () {
      this.passWord = this.passWord.replace(/[^A-Za-z0-9]/g, '')
    },
    isGuide (newValue) {
      if (newValue === '0') {
        this.isGuideShow = true
      } else {
        this.isGuideShow = false
      }
    }
  },
  created () {
    this.changeTabBarShow(false)
  },
  destroyed () {
    this.changeTabBarShow(true)
  },
  components: {
    NavBar,
    LoginLogo
  }
}
</script>

<style scoped lang="less">
  .left {
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }

  .loginLogo {
    padding-top: 0;
    margin-top: 1.5rem;
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
        padding-left: 0.2rem;
        padding-right: 0.5rem;
        color: #444;
      }

      span {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        right: 0;
        background-repeat: no-repeat;
        background-size: 0.3rem 0.3rem;
        background-position: center center;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .password {
      margin-top: 0.5rem;
    }

    .psd-toast {
      margin-top: 0.1rem;
      font-size: 0.24rem;
      color: #bbb;
      padding-left: 0.2rem;
    }

    .submit-regis {
      width: 100%;
      height: 0.8rem;
      font-size: 0.3rem;
      line-height: 0.8rem;
      text-align: center;
      margin-top: 1rem;
      color: #fff;
      background-color: var(--main-color);
      border-radius: 0.4rem;
    }

  }
</style>
