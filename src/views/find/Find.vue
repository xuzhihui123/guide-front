<template>
  <div class="find-lt">
<!--     头部搜索-->
      <head-search-bar/>
<!--    问题内容列表-->
      <b-scroll class="wrapper" :myprobe-type="myProbeT" ref="bscroll">
        <find-question-list :question-list="questionList"/>
      </b-scroll>
  </div>
</template>

<script>
import HeadSearchBar from 'views/find/children/HeadSearchBar'
import FindQuestionList from 'views/find/children/FindQuestionList'
import BScroll from 'common/bscroll/BScroll'

// 导入network
import { getAllRequesitons } from 'network/find'

// 导入防抖
import { debounce } from 'commonjs/utils'

export default {
  name: 'Find',
  components: {
    HeadSearchBar,
    FindQuestionList,
    BScroll
  },
  data () {
    return {
      myProbeT: 3,
      questionList: []
    }
  },
  methods: {
    // 获取所有问题
    async getAllQues () {
      const data = await getAllRequesitons()
      this.questionList = data
    }
  },
  mounted () {
    const refresh = debounce(this.$refs.bscroll.refresh, 300)
    this.$bus.$on('imgLoad', () => {
      refresh()
    })
  },
  created () {
    this.getAllQues()
  },
  activated () {
    this.getAllQues()
  }
}
</script>

<style scoped lang="less">
.find-lt{
  height: 100vh;
  background-color: #eee;
  position: relative;
}
  .wrapper{
    position: absolute;
    left: 0;
    right: 0;
    top: 1.55rem;
    bottom: 140px;
  }
</style>
