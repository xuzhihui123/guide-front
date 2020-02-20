<template>
  <div class="bottom-control_bar">
    <div class="go-comment" @click="editCommentClick">
      <span>写评论</span>
      <img src="~assets/pen-icon.svg" alt="">
    </div>

    <div class="like-comment_control">
      <div class="dz" @click="inseQuestionDz">
        <img :src="dzImage.inactive" alt="">
        <span>点赞&nbsp;{{likeAndCommentCount.likeCount}}</span>
      </div>
      <div>
        <img src="~assets/comment-icon.svg" alt="">
        <span>评论&nbsp;{{likeAndCommentCount.commentCount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {insertQuestionDz} from 'network/find'

  export default {
    name: "BottomControlBar",
    props: {
      likeAndCommentCount: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        dzImage: {
          inactive: require('assets/like-icon.svg'),
        }
      }
    },
    methods: {
      editCommentClick() {
        this.$parent.isShowCommentEdit(true)
      },


      //点赞
      async inseQuestionDz() {
        let isGuide = JSON.parse(localStorage.getItem('userInfo')).is_guide
        if(isGuide){
          return this.$toast({
            type: "fail",
            message: "导游论坛暂时未开放哦！",
            icon: "cross",
            duration: 1500
          });
        }
        let d = await insertQuestionDz(this.$route.params.id)
        if (d.code === '200') {
          this.dzImage.inactive = require('assets/like-icon-two.svg')
          this.$parent.getQuestionById()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .bottom-control_bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0.15rem 0.2rem;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .go-comment {
      display: flex;
      flex-direction: row;
      width: 1.8rem;
      height: 0.6rem;
      background-color: var(--main-color);
      border-radius: 0.3rem;
      color: #fff;
      font-size: 0.28rem;
      line-height: 0.6rem;
      align-items: center;
      justify-content: center;

      img {
        width: 0.28rem;
        height: 0.28rem;
        margin-left: 0.1rem;
      }
    }

    .like-comment_control {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      > div {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 0.4rem;
          height: 0.4rem;
        }

        span {
          font-size: 0.24rem;
          color: #666;
          font-weight: 700;
        }
      }

      > div.dz {
        margin-right: 0.2rem;
      }
    }
  }
</style>