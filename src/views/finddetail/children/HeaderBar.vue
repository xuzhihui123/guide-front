<template>
  <div id="find-head-search_bar">
    <img src="~assets/search-icon.svg" alt="" class="icon">
    <span class="back-go" :style="{'background-image':'url('+require('assets/arrow-left.svg')+')'}" @click="goBack"></span>
    <input type="text" class="inner" placeholder="搜索感兴趣的话题">
    <div class="submit" @click="goPostRequestion">
      <img src="~assets/find-tw.svg" alt="">
      <span>提问</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HeaderBar",
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      goPostRequestion(){
        this.$router.push('/postRequestions')
      }
    }
  }
</script>

<style scoped lang="less">
  #find-head-search_bar{
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding-top: 0.4rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    padding-bottom: 0.3rem;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 999;
    border-bottom: 0.005rem solid #ccc;
    img.icon{
      position: absolute;
      width: 0.35rem;
      height: 0.35rem;
      top: .55rem;
      left: 1.5rem;
    }
    .inner{
      width: 70%;
      height: 0.65rem;
      border: none;
      background-color: #eeeeee;
      border-radius: 0.05rem;
      font-size: 0.28rem;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      color: #666;
      text-align: center;
    }
    span.back-go{
      width: 0.65rem;
      height: 0.65rem;
      background-repeat: no-repeat;
      background-size: 0.65rem 0.65rem;
      background-position: center center;
    }
    .submit{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      img{
        width: 0.3rem;
        height: 0.3rem;
      }
      span{
        font-size: 0.3rem;
        color: var(--main-color);
        font-weight: 700;
        margin-left: 0.1rem;
      }
    }
  }
</style>