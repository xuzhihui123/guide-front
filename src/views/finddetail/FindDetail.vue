<template>
  <div id="find-detail">
    <!--     头部搜索-->
    <header-bar/>

    <b-scroll ref="bscroll" class="wrapper">
      <!--       头部问题开始-->
      <div class="body">
        <p class="title-name">{{questionData.title}}</p>
        <div class="avatar-tag">
          <img :src="userInfo.user_avatar" alt="">
          <div class="right-inner">
            <span class="title">{{userInfo.user_nick}}</span>
            <span class="tag">{{questionData.tag || '推荐问答'}}</span>
          </div>
        </div>
        <div class="body-content">
          {{questionData.description}}
        </div>
        <img :src="item.img" alt="" v-for="item in imgList" :key="item.img_id" @load="imgLoad">
      </div>

      <!--      评论开始-->
      <div class="comment-content">
        <span class="title">评论</span>
        <div class="comment-content_con" v-for="item in comments" :key="item.id" v-show="showCommentDiv">
          <img :src="item.user.user_avatar" alt="">
          <div class="right">
            <p class="name"><span>{{item.user.user_nick}}</span><span
                    class="time">{{item.gmt_create | dateFormat}}</span>
            </p>
            <p class="content">{{item.content}}</p>
          </div>
        </div>
        <div class="flag" v-show="!showCommentDiv">
          暂无评论哦~
        </div>
      </div>
    </b-scroll>

    <!--    评论弹出层-->
    <van-popup v-model="showCommentEdit" position="bottom" closeable>
      <div class="edit-comment_content">
        <div class="head">
          <span class="flag">评论给</span>
          <span class="name">{{userInfo.user_nick}}</span>
        </div>
        <van-field
                v-model="commentValue"
                rows="1"
                autosize
                autofocus
                type="textarea"
                placeholder="一起畅快交流吧~"
        />
        <div class="submit-editComment">
                 <span @click="submitComment">
                   发表
                 </span>
        </div>
      </div>
    </van-popup>

    <!--    /底部操作-->
    <bottom-control-bar :like-and-comment-count="questionData"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import HeaderBar from 'views/finddetail/children/HeaderBar'
import BottomControlBar from 'views/finddetail/children/BottomControlBar'

// 导入network
import { getQuestionById, postComment } from 'network/find'
import BScroll from 'common/bscroll/BScroll'

export default {
  name: 'FindDetail',
  components: {
    HeaderBar,
    BottomControlBar,
    BScroll
  },
  data () {
    return {
      questionData: {},
      userInfo: {},
      comments: [],
      showCommentEdit: false,
      commentValue: '',
      showCommentDiv: true,
      imgList: []
    }
  },
  methods: {
    ...mapMutations(['changeTabBarShow']),
    // 根据问题id获取该问题的所有信息
    async getQuestionById () {
      const d = await getQuestionById(this.$route.params.id)
      this.questionData = d.question
      this.userInfo = d.creator
      this.comments = d.comments
      this.imgList = d.img
    },

    // 图片加载
    imgLoad () {
      this.$refs.bscroll.refresh()
    },

    // 显示和隐藏评论表单
    isShowCommentEdit (isShow) {
      this.showCommentEdit = isShow
    },

    // 发表评论
    async submitComment () {
      const data = JSON.parse(localStorage.getItem('userInfo'))
      if (data.is_guide) {
        return this.$toast({
          type: 'fail',
          message: '导游论坛暂时未开放！',
          icon: 'cross',
          duration: 1500
        })
      }
      if (data.user_id) {
        const d = await postComment({
          commenter: data.user_id,
          text: this.commentValue,
          questionId: this.questionData.id
        })
        if (d.status.code === '200') {
          this.$toast({
            type: 'success',
            message: '发表成功！'
          })
          this.getQuestionById()
          this.$refs.bscroll.refresh()
          this.showCommentEdit = false
          this.commentValue = ''
        } else {
          this.$toast({
            type: 'fail',
            message: '账号或密码错误！',
            icon: 'cross',
            duration: 1500
          })
        }
      } else {
        this.$toast({
          message: '请先登录！'
        })
        this.$router.push('/login')
      }
    }
  },
  watch: {
    comments (newvalue) {
      if (newvalue.length > 0) {
        this.showCommentDiv = true
      } else {
        this.showCommentDiv = false
      }
    }
  },
  created () {
    this.changeTabBarShow(false)

    this.getQuestionById()
  },
  destroyed () {
    this.changeTabBarShow(true)
  }
}
</script>

<style scoped lang="less">
  #find-detail {
    background-color: #eee;
    height: 100vh;

    > .wrapper {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0.9rem;
      top: 1.35rem;
    }

    .body {
      background-color: #fff;
      padding: 0.2rem;
      display: flex;
      flex-direction: column;

      > img {
        width: 100%;
        margin-bottom: 0.2rem;
      }

      p.title-name {
        width: 100%;
        font-size: 0.32rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-weight: 700;
      }

      .avatar-tag {
        margin-top: 0.2rem;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;

        > img {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
        }

        .right-inner {
          margin-left: 0.2rem;
          display: flex;
          flex-direction: column;

          span.title {
            font-size: 0.28rem;
            font-weight: 700;
          }

          span.tag {
            font-size: 0.24rem;
            color: #bbb;
          }
        }
      }

      .body-content {
        margin-top: 0.2rem;
        font-size: 0.28rem;
        margin-bottom: 0.2rem;
        color: #333;
        font-family: 'Microsoft YaHei';
      }
    }

    .comment-content {
      width: 100%;
      border-top: 0.01rem solid #ccc;
      padding: 0.2rem;
      display: flex;
      flex-direction: column;
      background-color: #fff;

      > span.title {
        margin-top: 0.1rem;
        font-size: 0.3rem;
        font-weight: 700;
      }

      .comment-content_con {
        padding: 0.2rem 0;
        display: flex;
        flex-direction: row;

        > img {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
        }

        > div.right {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 0.2rem;

          p.name {
            width: 100%;
            display: flex;
            flex-direction: row;
            font-size: 0.24rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            color: #444;

            span.time {
              margin-left: 0.4rem;
              font-size: 0.24rem;
              color: #666;
            }
          }

          p.content {
            width: 100%;
            font-size: 0.26rem;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      > div.flag {
        padding: 0.2rem 0;
        font-size: 0.28rem;
        color: #444;
      }
    }

    .edit-comment_content {
      display: flex;
      flex-direction: column;

      .head {
        padding-top: 0.2rem;
        padding-left: 0.2rem;
        display: flex;
        flex-direction: row;

        span.flag {
          font-size: 0.24rem;
          color: #666;
        }

        span.name {
          font-size: 0.26rem;
          color: #444;
          font-weight: 700;
          margin-left: 0.15rem;
        }
      }

      .submit-editComment {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding-bottom: 0.2rem;

        span {
          width: 1.2rem;
          height: 0.5rem;
          font-size: 0.26rem;
          color: #fff;
          background-color: var(--main-color);
          text-align: center;
          border-radius: 0.2rem;
          line-height: 0.5rem;
          margin-left: 0.2rem;
        }
      }
    }
  }

  /deep/ .van-popup__close-icon--top-right {
    font-size: 0.3rem;
    top: 0.2rem;
    right: 0.2rem;
  }

  /deep/ .van-cell {
    padding: 0.2rem;
    font-size: 0.26rem;
    line-height: 0.35rem;
  }
</style>
