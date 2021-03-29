<template>
      <div id="find-head-search_bar">
        <img src="~assets/search-icon.svg" alt="" class="icon" v-show="!goSearchShow">
        <input type="text" class="inner" placeholder="搜索一下~" v-model="searchText">
        <img src="~assets/search-icon.svg" alt="" class="icon-right" v-show="goSearchShow" @click="goSearch">

        <div class="submit" @click="goPostRequestion">
          <img src="~assets/tiwen-p.png" alt="">
          <span>提问</span>
        </div>
      </div>
</template>

<script>
import { selectQuestions } from 'network/find'
export default {
  name: 'HeadSearchBar',
  methods: {
    goPostRequestion () {
      this.$router.push('/postRequestions')
    },
    async goSearch () {
      const d = await selectQuestions({ msg: this.searchText })
      if (!d.length) {
        return this.$toast({
          type: 'warning',
          message: '暂未搜索到相关信息！',
          icon: 'cross',
          duration: 2000
        })
      }
      this.$emit('getQuestionSearch', d)
      this.searchText = ''
    }
  },
  data () {
    return {
      goSearchShow: false,
      searchText: ''
    }
  },
  watch: {
    searchText: {
      immediate: true,
      handler (newValue) {
        if (!newValue) {
          this.goSearchShow = false
        } else {
          this.goSearchShow = true
        }
      }
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
  img.icon{
    position: absolute;
    width: 0.35rem;
    height: 0.35rem;
    top: .55rem;
    left: 1.5rem;
  }
  img.icon-right{
    position: absolute;
    width: 0.35rem;
    height: 0.35rem;
    top: .55rem;
    left: 5.4rem;
  }
  .inner{
    width: 80%;
    height: 0.65rem;
    border: none;
    background-color: #eeeeee;
    border-radius: 0.05rem;
    font-size: 0.28rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    color: #666;
    text-align: center;
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
