<template>
  <div id="profile">
    <div class="profile-top_bg">
      <img src="~assets/mybg.png" alt="">
      <div class="profile-top_login_view">
<!--        头像-->
        <img :src="singleUserInfo.user_avatar || getDefaultAvator" alt="">
        <div class="submit-login" @click="toLogin" v-show="topSubmitLogin">
          点击登录
        </div>
        <div class="profile-top_login_view_detail" v-show="topProfileView">
           <div class="top">
               <span class="nick_name">{{singleUserInfo.user_nick}}</span>
               <p class="nick_name_profile"><span>个人主页</span><van-icon name="arrow" color="#ccc" size="0.3rem"/></p>
           </div>
           <div class="bottom">
                <p class="fenxsi">粉丝<span>0</span></p>
                <p class="guanzhu">关注<span>0</span></p>
           </div>
        </div>
      </div>
    </div>
    <profile-list class="profilelist" :iphone-code="singleUserInfo.user_phone || ''"/>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import ProfileList from 'views/profile/children/ProfileList'

  export default {
    name: "Profile",
    components: {
      ProfileList,
    },
    data(){
      return {
          singleUserInfo:{},
          topProfileView:false,
          topSubmitLogin:true,
        //默认头像地址
          getDefaultAvator:require('assets/avator.png')
      }
    },
    methods: {
      //跳到登录页
      toLogin() {
        this.$router.push('/login')
        this.changeTabBarShow(false)
      },

      ...mapMutations(['changeTabBarShow']),

      //获取localstorage的用户信息
      getUserInfo(){
        this.singleUserInfo  = JSON.parse(localStorage.getItem('userInfo') || '{}')
      }

    },
    created() {
      this.getUserInfo()
    },
    watch:{
      singleUserInfo(newValue){
         if(newValue.user_nick !== undefined){
           this.topProfileView = true
           this.topSubmitLogin =false
         }else{
           this.topProfileView = false
           this.topSubmitLogin =true
         }
      }
    }
  }
</script>

<style scoped lang="less">
  .profile-top_bg {
    position: relative;

    img {
      width: 100%;
      height: 3rem;
    }

    .profile-top_login_view {
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      width: 95%;
      position: absolute;
      height: 1.6rem;
      border-radius: 0.2rem;
      left: 50%;
      display: flex;
      align-items: center;
      flex-direction: row;
      transform: translateX(-50%);
      bottom: -0.8rem;
      background-color: #fff;
      box-shadow: 0.01rem 0.15rem 0.3rem rgba(0, 0, 0, 0.15);

      img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
      }

      .submit-login {
        border: 0.02rem solid #FF699C;
        font-size: 0.24rem;
        padding: 0 0.3rem;
        height: 0.5rem;
        line-height: 0.5rem;
        color: #FF699C;
        margin-left: 1.2rem;
        border-radius: 0.1rem;
      }
      .profile-top_login_view_detail{
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 0.2rem;
        height: 100%;
        .top{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          flex-wrap: nowrap;
          margin-top: 0.4rem;
          .nick_name{
            font-size: 0.28rem;
          }
          .nick_name_profile{
            font-size: 0.28rem;
            display: flex;
            align-items: center;
            span{
              margin-right: 0.2rem;
            }
          }
        }
        .bottom{
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          margin-top: 0.2rem;
          .fenxsi{
            font-size: 0.28rem;
            span{
              color: var(--main-color);
              padding-left: 0.3rem;
            }
          }
          .guanzhu{
            margin-left: 0.3rem;
            font-size: 0.28rem;
            span{
              color: var(--main-color);
              padding-left: 0.3rem;
            }
          }
        }
      }
    }
  }

  .profilelist {
    margin-top: 1rem;
  }

  #profile {
    padding-bottom: 55px;
  }


</style>