<template>
  <div id="profile-detail">
    <div class="top-avator">
      <img :src="userIdAndUserAv.userAvatar" alt @click="ImgMax"/>
      <div
              class="top-avator_bg"
              :style="{'background-image':'url('+userIdAndUserAv.userAvatar+')',}"
      ></div>
      <div class="goBackIcon" :style="goBackIcon" @click="goBack"></div>
    </div>

    <!--    头像大图显示-->
    <van-overlay :show="overLayShow" @click="overLayShow = false" z-index="1000">
      <div class="max-avator">
        <img :src="userIdAndUserAv.userAvatar" alt/>
      </div>
    </van-overlay>

    <div class="content-detail">
      <div class="content-detail_inner">
        <span>昵称</span>
        <input type="text" class="name_input" placeholder="请填写" v-model="submitFormData.userNick"/>
      </div>
      <div class="content-detail_inner">
        <span>真实姓名</span>
        <input
                type="text"
                class="name_input"
                placeholder="请填写"
                v-model="submitFormData.userTrueName"
        />
      </div>
      <div class="content-detail_inner">
        <span>手机号码</span>
        <input
                type="number"
                class="name_input"
                placeholder="请填写"
                v-model="submitFormData.userPhone"
        />
      </div>
      <div class="content-detail_inner">
        <span>身份证</span>
        <input type="text" class="name_input" placeholder="请填写" v-model="submitFormData.userCard"/>
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
      <div class="submitFormBtn-inner" @click="submitUserProfile">保&nbsp;存</div>
    </div>

    <van-action-sheet
            v-model="sexShow"
            :actions="sexList"
            @select="onSelectSex"
            description="请选择性别"
            :close-on-click-action="true"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

// 导入组件

// 导入network
import {
  getUserInfoById,
  updateUserProfile,
  updateUserTextTags,
  getGuideInfoById,
  updateGuideProfile
} from 'network/profile'

export default {
  name: 'ProfileDetail',
  data () {
    return {
      sexShow: false,
      sexList: [
        { name: '男', color: '#07c160', index: 0 },
        { name: '女', color: '#07c160', index: 1 }
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
      overLayShow: false,
      goBackIcon: {
        'background-image':
              'url(' + require('assets/arrow-left-white.svg') + ')'
      }
    }
  },
  methods: {
    ...mapMutations(['changeTabBarShow']),
    goBack () {
      this.$dialog
        .confirm({
          message: '确定不保存退出吗？'
        })
        .then(() => {
          this.$router.push('/profile')
        })
        .catch(() => {
        })
    },
    onSelectSex (item) {
      this.submitFormData.userSex = item.index
    },
    showSexSelect () {
      this.sexShow = true
    },

    // 选择标签
    goProfileTags () {
      this.$router.push('/profiletags')
    },

    // 获取个人用户的所有信息
    getSingleUser () {
      // 判断是导游还是游客
      const local = JSON.parse(localStorage.getItem('userInfo'))

      const isSava = local.is_save

      // 是导游的话
      if (local.is_guide) {
        const guideId = local.user_id
        getGuideInfoById({ guideId }).then(r => {
          const {
            guide_nick,
            guide_phone,
            guide_id,
            guide_avatar,
            guide_trueName,
            guide_sex,
            guide_card,
            guide_password
          } = r.data
          this.submitFormData.userNick = guide_nick
          this.submitFormData.userPhone = guide_phone
          this.submitFormData.userTrueName = guide_trueName
          this.submitFormData.userCard = guide_card === '0' ? '' : guide_card
          this.submitFormData.userSex = guide_sex

          this.userIdAndUserAv.userAvatar = guide_avatar
          this.userIdAndUserAv.userId = guide_id
          this.userIdAndUserAv.userPassWord = guide_password
          // 获取个人标签  和  个人说明
          if (isSava === 0) {
            if (!r.profile) {
              this.profileTags = ''
              this.profileText = ''
            }
            if (r.profile) {
              this.profileText = r.profile.text === null ? '' : r.profile.text
              this.profileTags = r.profile.tags === null ? '' : r.profile.tags.join(',')
            }
          } else if (isSava === 1) {
            this.profileTags = this.profileTagsStr
            if (!r.profile) {
              this.profileText = ''
            }
            if (r.profile) {
              this.profileText = r.profile.text === null ? '' : r.profile.text
            }
          }
        })
      } else {
        // 获取id
        const userId = local.user_id
        getUserInfoById({
          userId
        }).then(r => {
          const {
            user_nick,
            user_phone,
            user_id,
            user_avatar,
            user_trueName,
            user_sex,
            user_card
          } = r.data
          this.submitFormData.userNick = user_nick
          this.submitFormData.userPhone = user_phone
          this.submitFormData.userTrueName = user_trueName
          this.submitFormData.userCard = user_card === '0' ? '' : user_card
          this.submitFormData.userSex = user_sex

          this.userIdAndUserAv.userAvatar = user_avatar
          this.userIdAndUserAv.userId = user_id
          // 获取个人标签  和  个人说明
          if (isSava === 0) {
            if (!r.profile) {
              this.profileTags = ''
              this.profileText = ''
            }
            if (r.profile) {
              this.profileText = r.profile.text === null ? '' : r.profile.text
              this.profileTags = r.profile.tags === null ? '' : r.profile.tags.join(',')
            }
          } else if (isSava === 1) {
            this.profileTags = this.profileTagsStr
            if (!r.profile) {
              this.profileText = ''
            }
            if (r.profile) {
              this.profileText = r.profile.text === null ? '' : r.profile.text
            }
          }
        })
      }
    },

    // 保存提交
    submitUserProfile () {
      if (
        this.submitFormData.userNick === '' ||
            this.submitFormData.userTrueName === '' ||
            this.submitFormData.userPhone === '' ||
            this.submitFormData.userCard === ''
      ) {
        return this.$toast({
          type: 'fail',
          message: '主要信息未填写完整！',
          icon: 'cross',
          duration: 1500
        })
      }
      // 如果是导游
      if (JSON.parse(localStorage.getItem('userInfo')).is_guide) {
        const postObject = {}
        postObject.guideNick = this.submitFormData.userNick
        postObject.guidePassWord = this.userIdAndUserAv.userPassWord
        postObject.guideAvatar = this.userIdAndUserAv.userAvatar
        postObject.guideCard = this.submitFormData.userCard
        postObject.guidePhone = this.submitFormData.userPhone
        postObject.guideId = this.userIdAndUserAv.userId
        postObject.guideTrueName = this.submitFormData.userTrueName
        postObject.guideSex = this.submitFormData.userSex
        updateGuideProfile(postObject).then(r => {
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
              type: 2, // 导游
              userText: this.profileText,
              userId: this.userIdAndUserAv.userId
            }).then(r => {
              if (r.code === '200') {
                this.$toast({
                  type: 'success',
                  message: '保存成功！',
                  duration: 1500
                })
                const d = JSON.parse(localStorage.getItem('userInfo'))
                d.user_nick = this.submitFormData.userNick
                d.user_phone = this.submitFormData.userPhone

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
      } else {
        const postObject = {}
        for (const key in this.submitFormData) {
          postObject[key] = this.submitFormData[key]
        }
        for (const key in this.userIdAndUserAv) {
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
            }).then(r => {
              if (r.code === '200') {
                this.$toast({
                  type: 'success',
                  message: '保存成功！',
                  duration: 1500
                })
                const d = JSON.parse(localStorage.getItem('userInfo'))
                d.user_nick = this.submitFormData.userNick
                d.user_phone = this.submitFormData.userPhone

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
      }
    },

    // 头像图片放大
    ImgMax () {
      this.overLayShow = true
    }
  },
  components: {},
  created () {
    this.changeTabBarShow(false)
    this.getSingleUser()
  },
  destroyed () {
    this.changeTabBarShow(true)
  },
  computed: {
    ...mapState(['profileTagsStr'])
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
    padding-top: 1rem;
    height: 3rem;
    background-color: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;

    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      position: relative;
      z-index: 2;
    }

    .goBackIcon {
      width: 0.5rem;
      height: 0.5rem;
      background-position: center center;
      background-size: 0.5rem 0.5rem;
      background-repeat: no-repeat;
      position: absolute;
      top: 0.3rem;
      left: 0.2rem;
      z-index: 2;
    }

    .top-avator_bg {
      position: absolute;
      top: 0;
      left: 0;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100% 100%;
      width: 100%;
      height: 100%;
      transform: scale(2);
      filter: blur(10px);
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
        height: 95%;
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
