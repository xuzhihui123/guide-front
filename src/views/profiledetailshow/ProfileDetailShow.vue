<template>
  <div id="profile-detail_show">
    <!-- 导航栏 -->
    <nav-bar :nav-bar-bg="navbarBg" class="navbar">
      <div slot="center" class="center">个人主页</div>
      <div class="left" slot="left" @click="goBack">
        <img src="~assets/arrow-left.svg" alt/>
      </div>
    </nav-bar>

    <!-- 背景图 -->
    <div class="top_bg">
      <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2492633268,262337583&fm=26&gp=0.jpg" alt/>
    </div>

    <!-- 个人信息展示 -->
    <div class="top_inner">
      <div class="top_inner_top">
        <img :src="profileDetailData[0].userAvatar" alt @click="showAvator"/>
        <div class="right">
          <span class="nick_name">{{profileDetailData[0].userNick}}</span>
          <span class="sex">{{profileDetailData[0].userSex===0 ? '男' : '女'}}</span>
        </div>
      </div>
      <div class="top_inner_bottom">
        <div class="profile_say">
          <span>个人说明：</span>
          <span>{{profileDetailData[1].profileText}}</span>
        </div>
        <div class="profile_tag">
          <div>个性标签：</div>
          <span v-for="(item,i) in profileDetailData[1].profileTags" :key="i">{{item}}</span>
        </div>
      </div>
    </div>

    <!-- //大图头像展示 -->
    <van-overlay :show="avatarShow" @click="avatarShow = false" z-index="1000">
      <div class="max-avator">
        <img :src="profileDetailData[0].userAvatar" alt="">
      </div>
    </van-overlay>

    <!-- 个人动态展示 -->
    <div class="top_dynamics">
      <div class="top_dynamics_title">动态</div>
      <div class="top_dynamics_content">
        <div class="show-hideen">该主人很懒，什么都没留下~</div>
      </div>
    </div>

    <!-- 发送消息按钮展示 -->
   <div class="submit-message" v-if="showMessageBtn" @click="goChat">发送消息</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

// 导入组件
import NavBar from 'common/navbar/NavBar'

// 导入network
import { getUserInfoById } from 'network/profile'

export default {
  name: 'ProfileDetailShow',
  components: {
    NavBar
  },
  data () {
    return {
      navbarBg: 'transparent',
      avatarShow: false,
      profileDetailData: [
        { userNick: '', userSex: null, userAvatar: '' },
        {
          profileText: '',
          profileTags: []
        }
      ],
      defaultAvatar: require('assets/avator.png'),
      showMessageBtn: false
    }
  },
  methods: {
    ...mapMutations(['changeTabBarShow']),
    goChat () {
      this.$router.push(`/chat/${this.$route.params.id}`)
    },
    goBack () {
      this.$router.push('/profile')
    },
    // 获取个人用户信息
    getUserByIdDetail () {
      this.showMessageBtn = !!this.$route.params.id
      const data = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const userId = this.$route.params.id ? this.$route.params.id : data.user_id
      if (userId) {
        getUserInfoById({
          userId
        }).then(r => {
          this.profileDetailData[0].userNick = r.data.user_nick || ''
          this.profileDetailData[0].userSex = r.data.user_sex || 0
          this.profileDetailData[0].userAvatar =
                  r.data.user_avatar || this.defaultAvatar

          if (r.profile !== null) {
            this.profileDetailData[1].profileText = r.profile.text
            if (r.profile.tags[0] === '') {
              this.profileDetailData[1].profileTags = []
            } else {
              this.profileDetailData[1].profileTags = r.profile.tags
            }
          } else {
            this.profileDetailData[1].profileText = ''
            this.profileDetailData[1].profileTags = []
          }
        })
      } else {
        this.profileDetailData[0].userAvatar = this.defaultAvatar
      }
    },

    // 展示大头像
    showAvator () {
      this.avatarShow = true
    }
  },
  created () {
    this.changeTabBarShow(false)

    this.getUserByIdDetail()
  },
  destroyed () {
    this.changeTabBarShow(true)
  }
}
</script>
<style lang='less' scoped>
  .top_bg {
    width: 100%;
    line-height: 0;
    position: relative;

    img {
      width: 100%;
    }
  }

  .top_inner {
    position: relative;
    top: -0.8rem;
    background-color: #fff;
    padding: 0 0.2rem;
    width: 100%;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    display: flex;
    flex-direction: column;

    .top_inner_top {
      display: flex;
      flex-direction: row;
      padding-top: 0.4rem;
      padding-bottom: 0.2rem;
      border-bottom: 0.01rem solid #eee;

      .right {
        display: flex;
        flex-direction: column;
        line-height: 0.35rem;
        justify-content: space-around;
        margin-left: 0.4rem;

        span {
          font-size: 0.28rem;
        }
      }

      > img {
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
      }
    }

    .top_inner_bottom {
      margin-top: 0.2rem;
      display: flex;
      flex-direction: column;
      line-height: 0.45rem;
      padding-bottom: 0.2rem;

      .profile_tag {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        font-size: 0.28rem;

        span {
          color: var(--main-color);
        }
      }

      .profile_tag {
        margin-top: 0.2rem;
      }

      .profile_tag span {
        padding: 0 0.1rem;
        border: 0.01rem solid var(--main-color);
        margin-right: 0.2rem;
        margin-bottom: 0.2rem;
        font-size: 0.24rem;
        border-radius: 0.05rem;
      }

      .profile_say {
        font-size: 0.28rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }

  .top_dynamics {
    margin-top: -0.6rem;
    padding: 0 0.2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    min-height: 4rem;

    .top_dynamics_title {
      padding: 0.2rem 0;
      font-size: 0.28rem;
      border-bottom: 0.01rem solid #eee;
      font-weight: 700;
    }

    .top_dynamics_content {
      .show-hideen {
        font-size: 0.3rem;
        margin-top: 0.3rem;
        color: #444;
      }
    }
  }

  .max-avator {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 100%;
    }
  }

  #navbar {
    .center {
      font-weight: 400;
      color: #000;
    }
  }

  .navbar {
    .left {
      height: 100%;
      display: flex;
      align-items: center;

      img {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
  }

  #profile-detail_show {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #eee;
  }
      .submit-message {
      width: 89%;
      height: 0.8rem;
      margin: 0 auto;
      font-size: 0.3rem;
      line-height: 0.8rem;
      text-align: center;
      margin-top: 1rem;
      color: #fff;
      background-color: var(--main-color);
      border-radius: 0.15rem;
      &:active{
        background: cornflowerblue;
      }
    }
</style>
