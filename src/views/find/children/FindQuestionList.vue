<template>
  <div id="find-question_list">
        <question-item v-for="(item,i) in questionList" :key="i" :question-item="item"/>
  </div>
</template>

<script>
import QuestionItem from 'views/find/children/QuestionItem'
export default {
  name: 'FindQuestionList',
  components: {
    QuestionItem
  },
  props: {
    questionList: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped lang="less">
#find-question_list{
  margin-top: 0.2rem;
}
</style>
