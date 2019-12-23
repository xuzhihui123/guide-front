<template>
  <div id="profile-detail">
    <nav-bar>
      <div slot="left" class="left" @click="goBack">
        <img src="~assets/arrow-left.svg" alt="">
      </div>
      <div slot="center">
        编辑资料
      </div>
    </nav-bar>
    <div class="top-avator">
      <img :src="userIdAndUserAv.userAvatar" alt="" @click="ImgMax">
    </div>


    <!--    头像大图显示-->
    <van-overlay :show="overLayShow" @click="overLayShow = false" z-index="1000">
      <div class="max-avator">
        <img :src="userIdAndUserAv.userAvatar" alt="">
      </div>
    </van-overlay>


    <div class="content-detail">
      <div class="content-detail_inner">
        <span>昵称</span>
        <input type="text" class="name_input" placeholder="请填写" v-model="submitFormData.userNick">
      </div>
      <div class="content-detail_inner">
        <span>真实姓名</span>
        <input type="text" class="name_input" placeholder="请填写" v-model="submitFormData.userTrueName">
      </div>
      <div class="content-detail_inner">
        <span>手机号码</span>
        <input type="number" class="name_input" placeholder="请填写" v-model="submitFormData.userPhone">
      </div>
      <div class="content-detail_inner">
        <span>身份证</span>
        <input type="text" class="name_input" placeholder="请填写" v-model="submitFormData.userCard">
      </div>
      <div class="content-detail_inner sex" @click="showSexSelect">
        <span>性别</span>
        <div class="inner-sex">
          <span>{{submitFormData.userSex===0 ? '男' : '女'}}</span>
          <van-icon name="arrow" size="0.28rem"/>
        </div>
      </div>
    </div>


    <!--    个人说明-->
    <div class="profile-text">
      <van-cell-group>
        <van-field
                v-model="profileText"
                autosize
                label="个人说明"
                type="textarea"
                maxlength="50"
                placeholder="简单介绍下自己吧！(50字以内，也可以不填写~)"
                show-word-limit
                clearable
        />
      </van-cell-group>
    </div>

    <!--    标签-->
    <div class="profile-tags" @click="goProfileTags">
      <div class="profile-tags_inner">
        <div class="profile-tags_name">标签</div>
        <div class="profile-tags_text">
          <span class="title">{{profileTags}}</span>
          <van-icon name="arrow" size="0.28rem"/>
        </div>
      </div>
    </div>


    <!--保存-->
    <div class="submitFormBtn">
      <div class="submitFormBtn-inner" @click="submitUserProfile">
        保&nbsp;存
      </div>
    </div>

    <van-action-sheet v-model="sexShow" :actions="sexList" @select="onSelectSex" description="请选择性别"
                      :close-on-click-action="true"/>
  </div>
</template>

<script>

  import {mapMutations} from 'vuex'

  //导入组件
  import NavBar from 'common/navbar/NavBar'

  //导入network
  import {getUserInfoById, updateUserProfile, updateUserTextTags} from 'network/profile'

  export default {
    name: "ProfileDetail",
    data() {
      return {
        sexShow: false,
        sexList: [
          {name: '男', color: '#07c160', index: 0},
          {name: '女', color: '#07c160', index: 1}
        ],
        submitFormData: {
          userNick: '',
          userTrueName: '',
          userPhone: '',
          userCard: '',
          userSex: 0
        },
        userIdAndUserAv: {},
        profileText: '',
        profileTags: '',
        overLayShow: false
      }
    },
    methods: {
      ...mapMutations(['changeTabBarShow']),
      goBack() {
        this.$dialog.confirm({
          message: '确定不保存退出吗？'
        }).then(() => {
          this.$router.push('/profile')
        }).catch(() => {

        })
      },
      onSelectSex(item) {
        this.submitFormData.userSex = item.index
      },
      showSexSelect() {
        this.sexShow = true
      },

      //选择标签
      goProfileTags() {
        this.$router.push('/profiletags')
      },

      //获取个人用户的所有信息
      getSingleUser() {
        //获取id
        let userId = JSON.parse(localStorage.getItem('userInfo')).user_id
        getUserInfoById({
          userId
        }).then(r => {
          let {user_nick, user_phone, user_id, user_avatar, user_trueName, user_sex, user_card} = r.data
          this.submitFormData.userNick = user_nick
          this.submitFormData.userPhone = user_phone
          this.submitFormData.userTrueName = user_trueName
          this.submitFormData.userCard = user_card === '0' ? '' : user_card
          this.submitFormData.userSex = user_sex

          this.userIdAndUserAv.userAvatar = user_avatar
          this.userIdAndUserAv.userId = user_id

          //获取个人标签  和  个人说明
          if (!r.profile) {
            this.profileTags = ''
            this.profileText = ''
          }
          if (r.profile) {
            this.profileTags = r.profile.tags.join(',')
            this.profileText = r.profile.text
          }


        })
      },


      //保存提交
      submitUserProfile() {
        //先判断除个人说明和标签
        if (this.submitFormData.userNick === '' || this.submitFormData.userTrueName === '' || this.submitFormData.userPhone === '' || this.submitFormData.userCard === "") {
          return this.$toast({
            type: 'fail',
            message: '主要信息未填写完整！',
            icon: 'cross',
            duration: 1500
          })
        }
        let postObject = {}
        for (let key in this.submitFormData) {
          postObject[key] = this.submitFormData[key]
        }
        for (let key in this.userIdAndUserAv) {
          postObject[key] = this.userIdAndUserAv[key]
        }

        updateUserProfile(postObject).then(r => {
          if (r.code === '503') {
            return this.$toast({
              type: 'fail',
              message: '请检查信息是否正确！',
              icon: 'cross',
              duration: 1500
            })
          } else if (r.code === '506') {
            return this.$toast({
              type: 'fail',
              message: '请检查信息是否正确！',
              icon: 'cross',
              duration: 1500
            })
          } else {
            updateUserTextTags({
              userTags: this.profileTags,
              type: 1,
              userText: this.profileText,
              userId: this.userIdAndUserAv.userId
            })
                .then(r => {
                  if (r.code === '200') {
                    this.$toast({
                      type: 'success',
                      message: '保存成功！',
                      duration: 1500
                    })
                    let d = JSON.parse(localStorage.getItem('userInfo'))
                    d.user_nick = this.submitFormData.userNick
                    d.user_phone = this.submitFormData.userPhone

                    d.profile_text = this.profileText

                    localStorage.setItem('userInfo', JSON.stringify(d))

                    this.$router.push('/profile')
                  } else {
                    this.$toast({
                      type: 'fail',
                      message: '服务器错误！',
                      icon: 'cross',
                      duration: 1500
                    })
                  }
                })
          }

        })

      },


      //头像图片放大
      ImgMax() {
        this.overLayShow = true
      }
    },
    components: {
      NavBar
    },
    created() {
      this.changeTabBarShow(false)
      this.getSingleUser()
    },
    destroyed() {
      this.changeTabBarShow(true)
    }

  }
</script>

<style scoped lang="less">
  #profile-detail {
    background-color: #eee;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .left {
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }

  .top-avator {
    margin-top: 1rem;
    height: 2rem;
    background-color: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }

  }

  .content-detail {
    margin-top: 0.2rem;
    width: 100%;
    padding: 0 0.2rem;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    .content-detail_inner {
      flex: 1;
      height: 0.8rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 0.01rem solid #ddd;
      position: relative;
      line-height: 0.8rem;
      justify-content: space-between;

      span {
        font-size: 0.28rem;
      }

      .name_input {
        position: absolute;
        width: 60%;
        height: 100%;
        top: 0;
        right: 0;
        font-size: 0.28rem;
        text-align: right;
        outline: none;
        border: 0;
        border-radius: 0;
        -webkit-appearance: none;
      }

      .inner-sex {
        display: flex;
        flex-direction: row;
        align-items: center;

        span {
          color: #000;
        }
      }

    }

    .sex {
      border: 0;
    }
  }

  .profile-text {
    margin-top: 0.2rem;
  }

  .submitFormBtn {
    margin-top: 0.2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 0.4rem;

    .submitFormBtn-inner {
      width: 80%;
      height: 0.6rem;
      background-color: var(--main-color);
      border-radius: 0.5rem;
      color: #fff;
      line-height: 0.6rem;
      font-size: 0.3rem;
      text-align: center;
      margin: 0 auto;
    }
  }

  .profile-tags {
    padding: 0 0.2rem;
    background-color: #fff;
    height: 0.8rem;

    &:active {
      background-color: #eee;
    }

    .profile-tags_inner {
      border-top: 0.01rem solid #ddd;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      > div {
        font-size: 0.28rem;
      }

      div.profile-tags_text {
        margin-left: 0.4rem;
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        overflow: hidden;

        span {
          width: 90%;
          text-align: right;
          word-break: keep-all; /* 不换行 */
          white-space: nowrap; /* 不换行 */
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow: ellipsis;
        }
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

  .van-cell {
    padding: 0.2rem;
  }

  /deep/ .van-field__control {
    font-size: 0.28rem;
  }

  /deep/ .van-field__label {
    font-size: 0.28rem;
  }

  /deep/ .van-field__word-limit {
    font-size: 0.26rem;
  }

  @media screen and (min-width: 768px) {
    /deep/ .van-field__label {
      font-size: 0.28rem;
      width: 140px;
    }

    /deep/ .van-field__word-limit {
      font-size: 0.2rem;
    }
  }
</style>