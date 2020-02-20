<template>
     <div id="question-item" @click="goQuesDetail(questionItem.id)">
<!--       论坛标题-->
          <p class="title">{{questionItem.title}}</p>
<!--          头像名字标签-->
          <div class="userInfo">
            <img :src="questionItem.userModel.user_avatar" alt="">
            <span class="name">{{questionItem.userModel.user_nick}}</span>
<!--            <span class="tag">{{questionItem.tag || '推荐问答'}}</span>-->
            <span class="time">{{questionItem.gmtCreate | dateFormat()}}{{'  发表'}}</span>
          </div>
<!--       内容区域-->
         <div class="content">
           {{questionItem.description}}
         </div>
<!--        放置一张图片区域-->
          <img :src="getImage(questionItem.imgList)" alt="" v-show="questionItem.imgList.length!==0" @load="imageLoad">
<!--       描述-->
         <div class="detail-question">
            {{questionItem.likeCount}}&nbsp;点赞&nbsp;·&nbsp;{{questionItem.commentCount}}&nbsp;评论&nbsp;·&nbsp;{{questionItem.viewCount}}&nbsp;预览
         </div>
     </div>
</template>

<script>
  export default {
    name: "QuestionItem",
    props:{
      questionItem:{
        type:Object,
        default(){
          return {

          }
        }
      }
    },
    methods:{
      goQuesDetail(id){
          this.$router.push(`/finddetail/${id}`)
      },
      getImage(d){
       if(d.length!==0){
         return d[0].img
       }else{
         return ''
       }
      },

      //图片加载
      imageLoad(){
        this.$bus.$emit('imgLoad')
      }
    }
  }
</script>

<style scoped lang="less">
#question-item{
  width: 100%;
  padding: 0.2rem;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  margin-bottom: 0.2rem;
  >img{
    width: 2rem;
    margin: 0.2rem 0;
  }
  p.title{
    font-size: 0.32rem;
    font-weight: 700;
    display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
    overflow: hidden;
  }
  .userInfo{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0.2rem;
    img{
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
    }
    span.name{
      width: 40%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.24rem;
      color: #666;
      font-weight: 700;
      margin-left: 0.1rem;
    }
    span.tag{
      font-size: 0.24rem;
      color: #bbb;
      margin-left: 0.1rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    span.time{
      color: #bbb;
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
  .content{
    margin-top: 0.15rem;
    width: 100%;
    font-size: 0.26rem;
    color: #666;
    display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 0.4rem;
    margin-bottom: 0.2rem;
  }
  .detail-question{
    font-size: 0.25rem;
    color: #bbb;
  }
}
</style>